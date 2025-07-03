window.alert(diff);
const title = document.getElementById('title');  // タイトルを表示するh1タグ
const yojijukugo = document.getElementById('yojijukugo');  // 四字熟語と読み仮名を表示するh2タグ
const kanji = document.querySelectorAll('.kanji');  // 四字熟語の各漢字を表示するrubyタグのリスト
const yojijukugo_meaning = document.getElementById('yojijukugo_meaning');  // 四字熟語の意味を表示するpタグ
const next_btn = document.getElementById('next_btn');  // 次の四字熟語を表示するボタン
let url;  // 四字熟語が書かれたJSONファイルのurl(相対パス)
if (diff == "やさしい")
{
    url = 'yojijukugo_easy.json';  // 四字熟語が書かれたJSONファイルのurl(相対パス)
}
else if (diff == "ふつう") {
    url = 'yojijukugo_normal.json';  // 四字熟語が書かれたJSONファイルのurl(相対パス)
} 
else if (diff == "むずかしい") {
    url = 'yojijukugo_hard.json';  // 四字熟語が書かれたJSONファイルのurl(相対パス)
}

let counter = 0;  // 四字熟語のカウンタ
let yojijukugo_json;  // 四字熟語のJSONデータ

// JSONファイルのデータの取得
fetch(url)
.then((response) => {  // データが取得できたら
    return response.json();  // データをJSON形式のオブジェクトに変換
})
.then((result) => {  // JSON形式のオブジェクトに変数できたら
    title.textContent = '四字熟語漢字パズル';
    yojijukugo_json = result;  // 四字熟語のJSONデータをグローバル変数に保存
    yojijukugo_display(counter);  // 最初の四字熟語の表示
})
.catch((e) => {  // 上記の処理中にエラーが発生したら
    window.alert(e);  //エラーをキャッチし表示
})

// 四字熟語を表示する関数
const yojijukugo_display = (counter) => {
    // 四字熟語の表示
    yojijukugo.innerHTML = `${yojijukugo_json[counter].熟語}<rt>${yojijukugo_json[counter].読み方}</rt>`;
    // 四字熟語の各漢字を表示するループ
    for (let i = 0; i < kanji.length; i++)
    {
        kanji[i].innerHTML = `${yojijukugo_json[counter].構成漢字[i].漢字[0][0]}`;
    }
    // 四字熟語の意味の表示
    yojijukugo_meaning.textContent = yojijukugo_json[counter].意味;
}

// ボタンのクリックイベント
next_btn.addEventListener('click', () => {
    counter += 1;  // 四字熟語のカウンタをカウントアップ
    if (counter >= yojijukugo_json.length)  // カウンタが四字熟語の個数を超えたら
    {
        counter = 0;  // 最初の四字熟語に戻る
    }
    yojijukugo_display(counter);  // 四字熟語の表示
})