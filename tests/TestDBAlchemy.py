#!/usr/bin/env python
# ユニットテスト用ライブラリ
import unittest
import os

# SQLAlchemyを使う、テーブルの構成は自動モードにする
from sqlalchemy.ext.automap import automap_base

# 環境変数 MYSQL_USER の値を DBUSER 変数に代入
DBUSER = os.getenv('MYSQL_USER')
# 同様にMYSQL_PASSWORDとMYSQL_DATABASEを取得
DBPASS = os.getenv('MYSQL_PASSWORD')
DBHOST = "db"
DBNAME = os.getenv('MYSQL_DATABASE')
# 接続文字列を作成し、dburlとする
dburl = f"mysql+mysqlconnector://{DBUSER}:{DBPASS}@{DBHOST}/{DBNAME}"

# DB接続用のエンジンを作成
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# ユニットテスト用のクラスを作成
class TestDBAlchemy(unittest.TestCase):
    # テストケース実行前に呼ばれるメソッド
    def setUp(self):
        # DBに接続
        self.engine = create_engine(dburl)
        # automap_base()を使ってテーブル構成を自動取得
        self.Base = automap_base()
        self.Base.prepare(autoload_with=self.engine)
        # セッションを取得
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

    def tearDown(self) -> None:
        self.session.close()

    def test_find_FUGAdb(self):
        # テーブル構成を取得
        self.Fuga = self.Base.classes.fuga
        # テーブル fuga があるか確認
        self.assertTrue(self.Fuga is not None)

    def test_2data_FUGAdb(self):
        # テーブル構成を取得
        self.Fuga = self.Base.classes.fuga
        # テーブル fuga にデータが2つ以上あるか確認
        data = self.session.query(self.Fuga).all()
        self.assertTrue(len(data) >= 2)

    def test_text_FUGA_in_FUGA(self):
        """fugaテーブル内のデータ中、どれかの行のカラム名nameに「ふが」が含まれているかを確認"""
        # テーブル構成を取得
        self.Fuga = self.Base.classes.fuga
        data = self.session.query(self.Fuga).filter(self.Fuga.name.like('%ふが%')).all()
        # 取得した行が1つ以上あるか確認
        self.assertTrue(len(data) >= 1)

if __name__ == '__main__':
    unittest.main()
