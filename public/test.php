<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>データベースアクセスのサンプル</title>
</head>
<body>
    <?php
    # env.txtを参考にして、データベースへの接続情報を設定してください
    $dbhost = "db"; # データベースのホスト名(本環境では固定)
    $dbname = "SAMPLE"; # データベース名
    $dbuser = "sampleuser"; # データベース接続ユーザ名
    $dbpassword = "samplepass"; # データベース接続パスワード
    # 以上からDSN文字列を生成
    $dsn = "mysql:host={$dbhost};dbname={$dbname}";
    # データベースハンドルを取得
    try {
        $handle = new PDO($dsn, $dbuser, $dbpassword);
    } catch (PDOException $e) {
        echo "DB接続に失敗しました。<br>";
        echo $e->getMessage();
        exit;
    }

    # データベースハンドルを使って、内包するテーブル一覧を取得
    $sql = "SHOW TABLES";
    try {
        $result = $handle->query($sql);
    } catch (PDOException $e) {
        echo "テーブル一覧の取得に失敗しました。<br>";
        echo $e->getMessage();
        exit;
    }
    # テーブル数を表示
    $num_tables = $result->rowCount();
    echo "<p>データベースには {$num_tables} 個のテーブルがあります。</p>";
    if ($num_tables > 0) {
        # テーブル一覧を箇条書きで表示
        echo "<ul>";
        foreach ($result as $row) {
            echo "<li>{$row[0]}</li>";
        }
    }
    # 接続を閉じる
    $handle = null;
    ?>
</body>
</html>
