#!/usr/bin/env python3

# ユニットテスト用ライブラリ
import unittest
import os
# DB操作用にmysql-connector-pythonをインポート
import mysql.connector

# 環境変数 MYSQL_USER の値を DBUSER 変数に代入
DBUSER = os.getenv('MYSQL_USER')
# 同様にMYSQL_PASSWORDとMYSQL_DATABASEを取得
DBPASS = os.getenv('MYSQL_PASSWORD')
DBHOST = "db"
DBNAME = os.getenv('MYSQL_DATABASE')

# unittest.TestCaseを継承したクラスを作成、クラス名はTestDBAccess
class TestDBAccess(unittest.TestCase):
    # テストケース実行前に呼ばれるメソッド
    def setUp(self):
        # DBに接続
        self.conn = mysql.connector.connect(
            user=DBUSER,
            password=DBPASS,
            host=DBHOST,
            database=DBNAME
        )
        # カーソルを取得
        self.cur = self.conn.cursor()

    def tearDown(self) -> None:
        self.conn.close()

    def test_find_FUGAdb(self):
        # テーブル fuga があるか確認
        self.cur.execute('SHOW TABLES')
        tables = self.cur.fetchall()
        table_list = [table[0] for table in tables]
        self.assertTrue('fuga' in table_list)

    def test_2data_FUGAdb(self):
        # テーブル fuga にデータが2つ以上あるか確認
        self.cur.execute('SELECT * FROM fuga')
        data = self.cur.fetchall()
        self.assertTrue(len(data) >= 2)


if __name__ == '__main__':
    unittest.main()
