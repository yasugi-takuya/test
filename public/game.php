<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Style.css">
    <title>漢字パズルゲーム</title>
</head>
<body>
    <h1>漢字パズル</h1>
    <?php
    require_once __DIR__ . '/yojijukugo.php';  // yojijukugoクラスの読み込み
    
    $yojijukugo_list = array();  // 四字熟語のデータを保存する配列

    $url = "yojijukugo (1).json";  // jsonファイルの相対パス
    $json = file_get_contents($url);  // jsonファイルの内容を文字列として読み込む
    // jsonデータの文字エンコーディングをASCII,JIS,UTF-8,EUC-JP,SJIS-WINのどれかから、UTF8に変換する
    $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
    $arr = json_decode($json,true);  // jsonファイルの内容を連想配列に変換(trueなら連想配列、falseならオブジェクト)
    
    $counter = 0;  // ループカウンタ
    foreach ($arr as $key => $value) {
        // 四字熟語データをYojijukugoクラスのインスタンスに保存する
        $Yojijukugo = new Yojijukugo($value['熟語'], $value['読み方'], $value['意味'], $value['構成漢字']);
        // 四字熟語データを表示
        echo '<h2><ruby>' . $Yojijukugo->yojijukugo . '<rt>' . $Yojijukugo->reading . '</rt></ruby></h2><p>' . $Yojijukugo->meaning . '</p>';
        // 四字熟語に含まれる漢字とその読み方を表示するループ
        echo '<table><tr>';
        foreach ($Yojijukugo->kanji_included as $key2 => $value2) {
            echo '<td>';
            // <ruby>文章<rt>読み仮名</rt></ruby>で文章に読みがなを表示できる
            echo '<ruby>' . $value2[0] . '<rt>' . $value2[1] . '</rt></ruby>';
            echo '</td>';
        }
        echo '</tr></table>';
        echo '<br>';
        array_push($yojijukugo_list,$Yojijukugo);  // リストに四字熟語を追加する
    }
    ?>
</body>
</html>