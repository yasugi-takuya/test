<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="score.css">
    <title>スコア表示画面</title>
</head>
<body>
    <?php
    // 正解数、問題数、難易度を受け取れていなければ
    if (!(isset($_POST['score']) && $_POST['score'] != '' ||  // 正解数
        isset($_POST['questions_length']) && $_POST['questions_length'] != '' ||  // 問題数
        isset($_POST['Diff']) && $_POST['Diff'] != '')) {  // 難易度

        header('Location:title.html');  // タイトルページに移動
        exit();  // 処理を終了
    }
    $score = $_POST['score'];  // 正解数取得
    $question_length = $_POST['questions_length'];  // 問題数取得
    $diff = $_POST['Diff'];  // 難易度取得
    ?>
    <h1>あなたのスコアは…</h1>
    <p><?= $question_length ?>点中<?= $score ?>点！</p>
    <dic class="button_container">
        <form method="post" action="game.php">
            <input type="hidden" name="Diff" value="<?= $_POST['Diff'] ?>">
            <input class="transition_Button" type="submit" value="再挑戦">
        </form>
        <a href="title.html"><button class="transition_Button">タイトル画面へ</button></a>
    </dic>