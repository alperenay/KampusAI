import asyncio, time, base64
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--force-device-scale-factor=2", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
        pg = await ctx.new_page(); await pg.goto("http://localhost:8765/"); await pg.wait_for_timeout(2500)
        cdp = await ctx.new_cdp_session(pg)
        t=time.time()
        for i in range(10): await pg.screenshot(type="jpeg", quality=90)
        print("pw", (time.time()-t)/10)
        t=time.time()
        for i in range(10): r=await cdp.send("Page.captureScreenshot", {"format":"jpeg","quality":90})
        print("cdp", (time.time()-t)/10, len(base64.b64decode(r["data"])))
        open("/tmp/claude-0/-home-claude/6404c6cd-770e-5990-9580-59780d6fba0b/scratchpad/v2/ss.jpg","wb").write(base64.b64decode(r["data"]))
        t=time.time()
        for i in range(10): r=await cdp.send("Page.captureScreenshot", {"format":"jpeg","quality":90,"clip":{"x":0,"y":0,"width":390,"height":844,"scale":1}})
        print("cdpclip", (time.time()-t)/10)
        open("/tmp/claude-0/-home-claude/6404c6cd-770e-5990-9580-59780d6fba0b/scratchpad/v2/ss2.jpg","wb").write(base64.b64decode(r["data"]))
asyncio.run(main())
