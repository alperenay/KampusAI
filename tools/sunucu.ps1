# =========================================================
#  Ders Asistani - yerel sunucu (Windows PowerShell 5.1+)
#
#  Siteyi http://localhost:8765 adresinde acar ve Ollama'ya
#  aracilik eder:  http://localhost:8765/ollama/...  ->  http://localhost:11434/...
#  Boylece site yapay zekayla kendi adresi uzerinden konusur; tarayicilarin
#  farkli adreslere yapilan isteklere koydugu kisitlamalara takilmaz.
#
#  - Disariya (internete) hicbir sey acmaz; yalnizca bu bilgisayardan
#    erisilebilir.
#  - Port sabittir: tarayici verileri (denemeler, notlar, sohbetler)
#    adrese bagli saklandigi icin port degisirse veriler gorunmez.
#  - Istekler paralel islenir: uzun bir yapay zeka yaniti yazilirken
#    site donmaz.
#  - Kapatmak icin bu pencereyi kapatin.
# =========================================================
param([int]$Port = 8765)

$ErrorActionPreference = 'Stop'
$Root      = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$RootFull  = [System.IO.Path]::GetFullPath($Root).TrimEnd('\') + '\'
$Url       = "http://localhost:$Port/"
$OllamaUrl = 'http://127.0.0.1:11434'
$Models    = @('qwen2.5:14b', 'bge-m3', 'qwen2.5vl:7b')

# .NET varsayilani ayni adrese en fazla 2 baglanti; akisli yanit + durum sorgusu icin artir
[System.Net.ServicePointManager]::DefaultConnectionLimit = 32
[System.Net.ServicePointManager]::Expect100Continue = $false

function Say([string]$Text, [string]$Color = 'Gray') { Write-Host $Text -ForegroundColor $Color }

Say ''
Say '  Ders Asistani baslatiliyor...' 'Cyan'
Say ''

# --- 1) Site zaten aciksa sadece tarayiciyi ac -------------------------
try {
    $probe = Invoke-WebRequest -UseBasicParsing -Uri ($Url + 'index.html') -Method Head -TimeoutSec 2
    if ($probe.StatusCode -eq 200) {
        Say '  Site zaten calisiyor; tarayici aciliyor.' 'Green'
        Start-Process $Url
        Start-Sleep -Seconds 2
        exit 0
    }
} catch { }

# --- 2) Ollama ve modeller ------------------------------------------------
function Get-OllamaModels {
    try {
        $tags = Invoke-RestMethod -Uri ($OllamaUrl + '/api/tags') -TimeoutSec 3
        $names = @()
        foreach ($m in $tags.models) { $names += [string]$m.name }
        return ,$names
    } catch {
        return $null
    }
}

$installed = Get-OllamaModels
if ($null -eq $installed) {
    $ollamaCmd = Get-Command ollama -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($ollamaCmd) {
        Say '  Ollama kapali gorunuyor; arka planda baslatiliyor...' 'Yellow'
        Start-Process -FilePath $ollamaCmd.Path -ArgumentList 'serve' -WindowStyle Hidden
        for ($i = 0; ($i -lt 20) -and ($null -eq $installed); $i++) {
            Start-Sleep -Seconds 1
            $installed = Get-OllamaModels
        }
    }
}

if ($null -eq $installed) {
    Say '  [UYARI] Ollama calismiyor. Ollama uygulamasini acin.' 'Yellow'
    Say '          Site yine de acilacak; yapay zeka Ollama acilinca calisir.' 'Yellow'
} else {
    Say '  Ollama calisiyor. Modeller:' 'Green'
    foreach ($model in $Models) {
        $want = $model -replace ':latest$', ''
        $found = $false
        foreach ($name in $installed) {
            if (($name -replace ':latest$', '') -ieq $want) { $found = $true }
        }
        if ($found) {
            Say ('    [OK]    ' + $model) 'Green'
        } else {
            Say ('    [EKSIK] ' + $model + '   ->  komut istemine yazin:  ollama pull ' + $model) 'Yellow'
        }
    }
}
Say ''

# --- 3) Istek isleyici (her istek ayri bir is parcaciginda calisir) -------
$Handler = {
    param($ctx, $RootFull, $OllamaUrl, $Mime)
    $req = $ctx.Request
    $res = $ctx.Response
    $upstream = $null
    $finished = $false
    try {
        $path = $req.Url.AbsolutePath

        if ($path -eq '/ollama' -or $path.StartsWith('/ollama/')) {
            # ---- Ollama'ya aracilik (akisli yanitlar parca parca iletilir) ----
            $upstream = [System.Net.HttpWebRequest]::Create($OllamaUrl + $path.Substring(7) + $req.Url.Query)
            $upstream.Method = $req.HttpMethod
            $upstream.Proxy = $null
            $upstream.KeepAlive = $false
            $upstream.Timeout = [System.Threading.Timeout]::Infinite
            $upstream.ReadWriteTimeout = [System.Threading.Timeout]::Infinite
            if ($req.HasEntityBody) {
                $ms = [System.IO.MemoryStream]::new()
                $req.InputStream.CopyTo($ms)
                $body = $ms.ToArray()
                $upstream.ContentType = 'application/json'
                $upstream.ContentLength = $body.Length
                $rs = $upstream.GetRequestStream()
                $rs.Write($body, 0, $body.Length)
                $rs.Close()
            }

            $resp = $null
            try {
                $resp = $upstream.GetResponse()
            } catch {
                $ex = $_.Exception
                while (($null -ne $ex) -and -not ($ex -is [System.Net.WebException])) { $ex = $ex.InnerException }
                if (($null -ne $ex) -and ($null -ne $ex.Response)) {
                    $resp = $ex.Response                 # Ollama hata dondurdu (or. 404 model yok)
                } else {
                    $msg = [System.Text.Encoding]::UTF8.GetBytes('{"error":"ollama unreachable"}')
                    $res.StatusCode = 502
                    $res.ContentType = 'application/json'
                    $res.ContentLength64 = $msg.Length
                    $res.OutputStream.Write($msg, 0, $msg.Length)
                    $finished = $true
                    return
                }
            }

            $res.StatusCode = [int]$resp.StatusCode
            if ($resp.ContentType) { $res.ContentType = $resp.ContentType }
            $res.AddHeader('Cache-Control', 'no-cache')
            $res.SendChunked = $true
            $stream = $resp.GetResponseStream()
            $buf = [byte[]]::new(16384)
            while (($n = $stream.Read($buf, 0, $buf.Length)) -gt 0) {
                $res.OutputStream.Write($buf, 0, $n)       # tarayici "Durdur" derse burada hata olur
                $res.OutputStream.Flush()
            }
            $stream.Close()
            $resp.Close()
            $finished = $true
            return
        }

        # ---- Site dosyalari ----
        $rel = [System.Uri]::UnescapeDataString($path).TrimStart('/')
        if ($rel -eq '') { $rel = 'index.html' }
        $full = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($RootFull, $rel))
        if (-not $full.StartsWith($RootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
            $res.StatusCode = 403                           # klasor disina cikma girisimi
        } elseif (-not [System.IO.File]::Exists($full)) {
            $res.StatusCode = 404
        } else {
            $ext  = [System.IO.Path]::GetExtension($full).ToLowerInvariant()
            $type = $Mime[$ext]
            if (-not $type) { $type = 'application/octet-stream' }
            $bytes = [System.IO.File]::ReadAllBytes($full)
            $res.ContentType = $type
            $res.AddHeader('Cache-Control', 'no-cache')
            $res.ContentLength64 = $bytes.Length
            if ($req.HttpMethod -ne 'HEAD') {
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        }
        $finished = $true
    } catch {
        try { $res.StatusCode = 500 } catch { }
    } finally {
        # Yanit yarida kaldiysa (or. Durdur) Ollama'ya giden istegi de iptal et
        if ((-not $finished) -and ($null -ne $upstream)) { try { $upstream.Abort() } catch { } }
        try { $res.Close() } catch { }
    }
}

# --- 4) Yerel sunucu ------------------------------------------------------
$mime = @{
    '.html'  = 'text/html; charset=utf-8'
    '.htm'   = 'text/html; charset=utf-8'
    '.js'    = 'text/javascript; charset=utf-8'
    '.css'   = 'text/css; charset=utf-8'
    '.json'  = 'application/json; charset=utf-8'
    '.md'    = 'text/plain; charset=utf-8'
    '.txt'   = 'text/plain; charset=utf-8'
    '.svg'   = 'image/svg+xml'
    '.png'   = 'image/png'
    '.jpg'   = 'image/jpeg'
    '.jpeg'  = 'image/jpeg'
    '.webp'  = 'image/webp'
    '.ico'   = 'image/x-icon'
    '.woff2' = 'font/woff2'
    '.woff'  = 'font/woff'
    '.ttf'   = 'font/ttf'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($Url)
try {
    $listener.Start()
} catch {
    Say ('  [HATA] ' + $Port + ' portu acilamadi: ' + $_.Exception.Message) 'Red'
    Say '         Baska bir program bu portu kullaniyor olabilir.' 'Red'
    Read-Host '  Kapatmak icin Enter tusuna basin'
    exit 1
}

$pool = [System.Management.Automation.Runspaces.RunspaceFactory]::CreateRunspacePool(1, 16)
$pool.Open()
$jobs = New-Object System.Collections.ArrayList

Say ('  Site acildi:  ' + $Url) 'Green'
Say '  Bu pencere acik kaldigi surece site calisir. Kapatmak icin pencereyi kapatin.'
Say ''
Start-Process $Url

while ($listener.IsListening) {
    try {
        $ctx = $listener.GetContext()
    } catch {
        break
    }
    $ps = [System.Management.Automation.PowerShell]::Create()
    $ps.RunspacePool = $pool
    [void]$ps.AddScript($Handler.ToString()).AddArgument($ctx).AddArgument($RootFull).AddArgument($OllamaUrl).AddArgument($mime)
    $handle = $ps.BeginInvoke()
    [void]$jobs.Add(@{ PS = $ps; Handle = $handle })

    # Biten isleri temizle
    for ($i = $jobs.Count - 1; $i -ge 0; $i--) {
        if ($jobs[$i].Handle.IsCompleted) {
            try { [void]$jobs[$i].PS.EndInvoke($jobs[$i].Handle) } catch { }
            $jobs[$i].PS.Dispose()
            $jobs.RemoveAt($i)
        }
    }
}
