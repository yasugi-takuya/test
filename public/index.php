<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>サンプルページ</title>
</head>
<body>
    <?php
    # unameでOS名とアーキテクチャ名を取得
    $os = php_uname('s');
    $arch = php_uname('m');
    ?>
    <p>
        このページは <?= $os ?> (<?= $arch ?>) で動作しています。
    </p>
    <ul>
        <li>現在の日本時間は <?php echo date('Y-m-d H:i:s'); ?> です。</li>
        <li><a href="test.php">test.php(DB接続テスト)</a></li>
        <li><a href="info.php">info.php(phpinfo)</a></li>
    </ul>
        
</body>
</html>
