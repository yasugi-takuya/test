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
       <h1><a href="title.html">title.htmlへ</a></h1>
</p>
        
</body>
</html>
