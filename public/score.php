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
        // 正解数、ボーナス得点、問題数、難易度を受け取れていなければ
        if (!(isset($_POST['score']) && $_POST['score'] != '' ||  // 正解数
            isset($_POST['bonus_points']) && $_POST['bonus_points'] != '' ||  // ボーナス得点
            isset($_POST['questions_length']) && $_POST['questions_length'] != '' ||  // 問題数
            isset($_POST['Diff']) && $_POST['Diff'] != '')) {  // 難易度

            header('Location:title.html');  // タイトルページに移動
            exit();  // 処理を終了
        }
        $score = $_POST['score'];  // 正解数取得
        $bonus_points =  explode (",",$_POST['bonus_points']);  // ボーナス得点取得
        $question_length = $_POST['questions_length'];  // 問題数取得
        $diff = $_POST['Diff'];  // 難易度取得
        ?>
        <h1>あなたのスコアは…</h1>
        <!-- 問題数と得点表示 -->
        <h1><?= $question_length ?>問中 <?= $score ?> 問正解！</h1>
        <h2>得点</h2>
        <p>10秒以内に回答: <b><?= $bonus_points[2] ?></b> 回 × 3点 = <b><?= $bonus_points[2] * 3 ?></b> ポイント</p>
        <p>20秒以内に回答: <b><?= $bonus_points[1] ?></b> 回 × 2点 = <b><?= $bonus_points[1] * 2 ?></b> ポイント</p>
        <p>30秒以内に回答: <b><?= $bonus_points[0] ?></b> 回 × 1点 = <b><?= $bonus_points[0] * 1 ?></b> ポイント</p>
        <p>合計 <b><?= $bonus_points[2] * 3 + $bonus_points[1] * 2 + $bonus_points[0] * 1 ?>/<?= $question_length * 3 ?></b>ポイント</p>
        <div class="button_container">
        <!-- ゲーム画面に難易度を送信し、再挑戦するフォームとボタン -->
            <form method="post" action="game.php">
                <input type="hidden" name="Diff" value="<?= $_POST['Diff'] ?>">
                <input class="transition_Button" type="submit" value="再挑戦">
            </form>
            <!-- タイトル画面へ遷移するボタン -->
            <a href="title.html"><button class="transition_Button">タイトル画面へ</button></a>
        </div>
    </body>
</html>