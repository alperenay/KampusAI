import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location("sync_meb", Path(__file__).with_name("sync-meb-curriculum.py"))
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)


def page(body):
    return '<div class="row"><div class="title">Öğrenme Çıktıları ve Süreç Bileşenleri</div><div class="content">' + body + '</div></div>'


class ParserTests(unittest.TestCase):
    def test_punctuation_unicode_and_separate_markup(self):
        result = sync.parse_unit(page('<p><b>BİY.12.2.7.</b> İlk açıklama.</p><p><strong>BİY.12.2.8.</strong> İkinci açıklama.</p>'))
        self.assertEqual(result['codes'], ['BİY.12.2.7', 'BİY.12.2.8'])

    def test_references_outside_outcome_section_are_excluded(self):
        text = page('MAT.11.1.1. Açıklama') + '<div class="row"><div class="title">Öğrenme Uygulamaları</div><div class="content">MAT.9.1.1</div></div>'
        self.assertEqual(sync.parse_unit(text)['codes'], ['MAT.11.1.1'])

    def test_code_variants_and_repeat(self):
        text = '<p>TDE1.1. a</p><p>TDE1.1. b</p><p>ENG.9.1.L1. c</p><p>MAT.U.1.4.1. d</p><p>T.MAT.11.2.1. e</p><p>SBÇ.III.3.1. f</p><p>TKMT 1.1. g</p>'
        self.assertEqual(sync.parse_unit(page(text))['codes'], ['TDE1.1', 'ENG.9.1.L1', 'MAT.U.1.4.1', 'T.MAT.11.2.1', 'SBÇ.III.3.1', 'TKMT 1.1'])

    def test_missing_section_never_counts_as_complete(self):
        result = sync.parse_unit('<p>MAT.11.1.1. Only a reference</p>')
        self.assertEqual(result['codes'], [])
        self.assertFalse(result['outcomeSectionFound'])

    def test_inline_and_broken_paragraph_prefixes(self):
        html = page('<p><strong>E</strong><strong>NG.9.7.S1.</strong> a</p><p>E</p><p><strong>NG.10.1.W1.</strong> b</p><p>SOS. 11.3.1. c</p>')
        result = sync.parse_unit(html)
        self.assertEqual(result['codes'], ['ENG.9.7.S1', 'ENG.10.1.W1', 'SOS.11.3.1'])
        self.assertEqual(result['normalizations'], ['split-ENG-prefix', 'space-after-code-prefix'])

    def test_remote_hosts_rejected_before_network(self):
        client = sync.Client(Path(__file__).resolve().parents[1] / 'tmp/meb-parser-test')
        with self.assertRaises(ValueError):
            client.get('https://example.com/private')
        with self.assertRaises(ValueError):
            client.get('file:///private')


if __name__ == '__main__':
    unittest.main()
