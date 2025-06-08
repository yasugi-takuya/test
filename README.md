# これはなんですか?

とある授業で使うためのテンプレートのようなものです。
このファイル自体も書き換えて使う必要があります。

# 使い方

こちらのドキュメントを参照してください。

* [アプリケーション開発 学習用コンテナについて](https://densuke.github.io/xampp-devenv-doc/index.html)

ざっくりとした使い方は以下の通りです。

1. このリポジトリをテンプレートとしてリポジトリを作り、教材開発用にcloneしてください
2. `public` 以下の内容を書き換えてください。既存のデータは消してかまいません
3. テストを作成してください、Pythonベースであればseleniumが利用可能になっています、テストは`tests`以下に作成してください

これ以上はお好みの所をいじってください。

# DevContainerでの使い方

このリポジトリに対してDevContainerを有効にすると、2つの環境を選択できます。

- PHP実習環境
  - 開発環境のみ展開されます、学生にはこちらを使わせて下さい
- テスト環境
  - テストのためのselenium(seleniarm) gridを横に立ててアクセスできるようにします
- Python環境
  - 直接的には使いませんが、テストなどで利用します
  - Pythonの環境はuvで構築しています(適切なパス上にインストール済み)
    - `uv sync`で必要なモジュールが組み込まれます
    - Pythonを使うときは`uv venv`で仮想環境を作るか`uv run`コマンドで実行させてください

# phpMyAdminコンテナ

PHP実習環境のDevContainerでは、phpMyAdminが稼働しており、DB操作についてはGUIベースで操作できて少し楽ができると思います。
ただし実習環境に切り替えただけでは見えないので、以下の操作を行ってください。

1. 『リモート』の一覧を出します ![](/images/vscode-remote-icon.png)
2. リモート一覧にあるコンテナ一覧において、現在動いている開発コンテナ(緑のチェックがついている)とベース名が同じになっている"phpmyadmin"のコンテナを見つけてください、言葉だとわかりにくいので、添付画像を参考にしてください ![](/images/find-phpmyadmin-container.png)
3. コンテナを見つけたら、 `+` マーク付きアイコンをクリックしてください(マウスカーソルをホバーさせると出ます) ![](/images/connect-with-new-window.png)
4. vscodeの新規ウィンドウ(phpMyAdminコンテナ用)が起動するので、準備ができるまで少し待ちます
5. phpMyAdminコンテナ用ウィンドウ側で、同様にポート転送のビューに切り替えると同様にポート転送が立ちますので、ブラウザを開いてください ![](/images/open-phpmyadmin-in-browser.png)

# テストについて

* テストを書くときは、DevContainerのテスト環境で起動してください
* テストはtestsディレクトリ以下に置きましょう
* Pythonのモジュールが足りない場合は、 `pipenv install` で必要なものを入れてください
* `make test FILE=tests/XXXXXX.py` でテストを実行できます
  * `make test_in_docker` とすると、`tests/*.py` をテストします

コンテナ外でテストだけ走らせるときは、以下の操作でコンテナ群を起動してテストできます。

* `make test_in_docker FILE=tests/XXXXXX.py`
* `make testall_in_docker`

テスト終了後は `make down` でコンテナ群を落としてください。
