<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>四字熟語漢字パズル</title>
    <link rel="stylesheet" href="Style.css">
</head>
<body>
    <?php
    if (isset($_POST['Diff']) && $_POST['Diff'] != '') {  // 難易度の値を受け取れていれば
        $diff = $_POST['Diff'];  // 難易度の値を変数に保存
    }
    ?>
    <!--タイトル-->
    <h1 id="title">読み込み中</h1>
    <!--四字熟語と読み方-->
    <h2><ruby id="yojijukugo"></ruby></h2>
    <!--四字熟語の各漢字を表示するテーブル-->
    <table>
        <tr>
            <td><ruby class="kanji"></ruby></td>
            <td><ruby class="kanji"></ruby></td>
            <td><ruby class="kanji"></ruby></td>
            <td><ruby class="kanji"></ruby></td>
        </tr>
    </table>
    <!--四字熟語の意味-->
    <p id="yojijukugo_meaning"></p>

    <!--次の四字熟語を表示するボタン-->
    <button id="next_btn">次の四字熟語</button>

    <!--javascriptの変数にphpの変数の値を代入-->
    <script type="text/javascript">
        const diff = "<?php echo $diff?>";
    </script>
    <!--外部javascriptファイルの読み込み-->
    <script src="game.js"></script>
</body>
</html>