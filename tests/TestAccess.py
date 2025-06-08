from selenium import webdriver
from selenium.webdriver.common.by import By

from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time
import unittest
import sys

# リモートサーバーのアドレス
REMOTE_URL = 'http://selenium:4444/wd/hub'

class SampleTest(unittest.TestCase):
    def setUp(self):
            self.driver = webdriver.Remote(REMOTE_URL, options=webdriver.ChromeOptions())
            assert self.driver is not None

    def tearDown(self):
        self.driver.quit()

    def test_Hello(self):
        """pタグ取得のテスト
        最初のpタグの値を取得します。
        その値が"Hello, World!"ならテストが通ります。
        """
        self.driver.get('http://web/test.php')
        time.sleep(2)
        # pタグの最初のものを取得
        element = self.driver.find_element(By.TAG_NAME, 'p')
        self.assertEqual('Hello, World!', element.text)

    def test_JapaneseText(self):
        """日本語文字取得のテスト
        指定のページにアクセスし、2つめのpタグの値を取得します。
        その値が"テスト"ならテストが通ります。
        """
        self.driver.get('http://web/test.php')
        time.sleep(2)
        # pタグの最初のものを取得
        element = self.driver.find_elements(By.TAG_NAME, 'p')[1]
        self.assertTrue('テスト' in element.text)


if __name__ == '__main__':
    unittest.main()
