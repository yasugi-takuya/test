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
    if (!(isset($_POST['Diff']) && $_POST['Diff'] != '')) {  // 難易度の値を受け取れていなければ
        header("Location:title.html");  // タイトルページに移動
        exit();  // 処理を終了
    }

    $diff = $_POST['Diff'];  // 難易度の値を変数に保存
    ?>
    <!--タイトル-->
    <h1 id="title">読み込み中</h1>
    <!--四字熟語と読み方-->
    <h2><ruby id="yojijukugo"></ruby></h2>
    <!--四字熟語の各漢字を表示するテーブルを表示するコンテナ-->
    <div class="kanji-table_grid">
        <!--四字熟語の各漢字を表示するテーブルと読み仮名-->
        <span class="kanji-table-container">
            <p class="kanji-yomi"></p>
            <div class="kanji-table" data-index="0"></div>
        </span>
        <span class="kanji-table-container">
            <p class="kanji-yomi"></p>
            <div class="kanji-table" data-index="1"></div>
        </span>
        <span class="kanji-table-container">
            <p class="kanji-yomi"></p>
            <div class="kanji-table" data-index="2"></div>
        </span>
        <span class="kanji-table-container">
            <p class="kanji-yomi"></p>
            <div class="kanji-table" data-index="3"></div>
        </span>
    </div>
    <!--四字熟語の意味-->
    <p id="yojijukugo_meaning"></p>

    <!--ヒントを表示するボタン-->
    <button id="hint_btn">ヒント</button>
    <!--次の問題を表示するボタン-->
    <button id="pass_btn">パス</button>
    <!--ギブアップするボタン-->
    <button id="give_up_btn">ギブアップ</button>

    <!-- 漢字を構成する各パーツを表示するコンテナ -->
    <div id="kanjiPartsContainer"></div>

    <!-- 問題に正解したときに表示される背景 -->
    <div id="message-bg">
        <!-- 問題に正解したときに表示される〇 -->
        <div id="message">〇</div>
    </div>

    <!-- スコア送信用フォーム -->
    <form method="post" action="score.php" id="score_form">
        <!-- スコア送信用hidden -->
        <input type="hidden" name="score" id="score_hidden">
        <!-- 問題数送信用hidden -->
        <input type="hidden" name="questions_length" id="questions_length_hidden">
        <!-- 難易度送信用hidden -->
        <input type="hidden" name="Diff" id="diff_hidden">
    </form>

    <!--javascriptの変数にphpの変数の値を代入-->
    <script type="text/javascript">
        const diff = "<?php echo $diff?>";
    </script>
    <!--外部javascriptファイルの読み込み-->
    <script src="game.js"></script>
</body>
</html>