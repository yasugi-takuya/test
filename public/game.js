//window.alert(diff);
const title = document.getElementById('title');  // タイトルを表示するh1タグ
const yojijukugo = document.getElementById('yojijukugo');  // 四字熟語と読み仮名を表示するrubyタグ
const kanji_yomi = document.querySelectorAll('.kanji-yomi');  // 四字熟語の各漢字の読み仮名を表示するpタグのリスト
const kanji_tables = document.querySelectorAll('.kanji-table');  // 四字熟語の各漢字を表示するテーブルの親要素のリスト
const yojijukugo_meaning = document.getElementById('yojijukugo_meaning');  // 四字熟語の意味を表示するpタグ
const answer_btn = document.getElementById('answer_btn');  // 回答するボタン
const next_btn = document.getElementById('next_btn');  // 次の四字熟語を表示するボタン(テスト用)
const kanjiPartsContainer = document.getElementById('kanjiPartsContainer');  // 各漢字を構成するパーツを表示するコンテナ
// 漢字のパーツをドロップするテーブルのリスト
const kanji_table_list = [
    '<table class="t1"><tr><td><div class="drop-target Left"></div></td><td><div class="drop-target Right"></div></td></tr></table>',
    '<table class="t2"><tr><td><div class="drop-target Top"></div></td></tr><tr><td><div class="drop-target Bottom"></div></td></tr></table>',
    '<table class="t3"><tr><td><div class="drop-target VerticalLeft"></div></td><td><div class="drop-target VerticalCenter"></div></td><td><div class="drop-target VerticalRight"></div></td></tr></table>',
    '<table class="t4"><tr><td><div class="drop-target ParallelTop"></div></td></tr><tr><td><div class="drop-target ParallelCenter"></div></td></tr><tr><td><div class="drop-target ParallelBottom"></div></td></tr></table>',
    '<div class="t5 drop-target Outside"><div class="drop-target Inside"></div></div>',
    '<div class="t6 drop-target TopOutside"><div class="drop-target BottomInside"></div></div>',
    '<div class="t7 drop-target BottomOutside"><div class="drop-target TopInside"></div></div>',
    '<div class="t8 drop-target LeftOutside"><div class="drop-target RightInside"></div></div>',
    '<div class="t9 drop-target TopLeftOutside"><div class="drop-target BottomRightInside"></div></div>',
    '<div class="t10 drop-target TopRightOutside"><div class="drop-target BottomLeftInside"></div></div>',
    '<div class="t11 drop-target BottomLeftOutside"><div class="drop-target TopRightInside"></div></div>',
    '<div class="t12 drop-target Center"></div>',
    '<div class="t13 drop-target Single"></div>',
    '<table class="t14"><tr><td colspan="2"><div class="drop-target Top"></div></td></tr><tr><td><div class="drop-target Left"></div></td><td><div class="drop-target Right"></div></td></tr></table>',
    '<table class="t15"><tr><td rowspan="2"><div class="drop-target Left"></div></td><td><div class="drop-target Top"></div></td></tr><tr><td><div class="drop-target Bottom"></div></td></tr></table>',
    '<table class="t16"><tr><td><div class="drop-target Left"></div></td><td><div class="drop-target Right"></div></td></tr><tr><td colspan="2"><div class="drop-target Bottom"></div></td></tr></table>',
    '<table class="t17"><tr><td><div class="drop-target Top"></div></td><td rowspan="2"><div class="drop-target Right"></div></td></tr><tr><td><div class="drop-target Bottom"></div></td></tr></table>',
    '<table class="t18"><tr><td><div class="drop-target Top"></div></td></tr><tr><td><div class="drop-target ParallelTop"></div></td></tr><tr><td><div class="drop-target ParallelCenter"></div></td></tr><tr><td><div class="drop-target ParallelBottom"></div></td></tr></table>',
    '<table class="t19"><tr><td><div class="drop-target Top"></div></td></tr><tr><td><div class="drop-target Center"></div></td></tr></table>',
    '<div class="t20 drop-target TopLeftOutside"><div class="drop-target Top"></div><div class="drop-target Bottom"></div></div>',
    '<div class="t21 drop-target BottomLeftOutside"><div class="drop-target Top"></div><div class="drop-target Bottom"></div></div>',
    '<table class="t22"><tr><td><div class="drop-target Top"></div></td></tr><tr><td><div class="drop-target BottomLeftOutside"><div class="drop-target TopRightInside"></div></div></td></tr></table>',
    '<table class="t23"><tr><td><div class="drop-target Left"></div></td><td><div class="drop-target Center"></div></td></tr></table>',
    '<table class="t24"><tr><td><div class="drop-target Top"></div></td></tr><tr><td><div class="drop-target TopOutside"><div class="drop-target BottomInside"></div></div></td></tr></table>',
    '<table class="t25"><tr><td><div class="drop-target Left"></div></td><td><div class="drop-target TopRightOutside"><div class="drop-target BottomLeftInside"></div></div></td></tr></table>'
];

let kanjiParts = null;  // 選択されている漢字パーツ
let parent;  // 漢字パーツの親要素
let url;  // 四字熟語が書かれたJSONファイルのurl(相対パス)
let counter = 0;  // 四字熟語のカウンタ
let yojijukugo_json;  // 四字熟語のJSONデータ
let bool;  // 問題の回答結果

// ドロップ用関数
const drop = (element, kanjiParts) => {
    if (element !== null) {  // ドロップ先に要素があれば
        if (element.classList.contains("drop-target")) {  // 漢字パーツをドロップするテーブルのセルなら
            if (element.classList.contains("Center")) {  // パーツを重ねて設置できるセルなら
                centerDrop(element, kanjiParts);  // 重ねてドロップ
            }
            else {  // 通常のセルなら
                element.append(kanjiParts);  // 要素の子要素に漢字パーツを追加
                kanjiParts.className = "dragged-item-to-drop";  // 漢字パーツにドロップ後のCSS適用
                const table = element.closest(".kanji-table");  // 漢字をドロップするテーブルの親となる要素を取得
                check(table);  // 正誤判定
            }
            return;  // 関数から抜ける
        }
        else if (element.id === "kanjiPartsContainer") {  // 漢字パーツを並べるコンテナの中なら
            kanjiParts.className = "dragged-item";  // 漢字パーツにドロップ前のCSS適用
            element.append(kanjiParts);  // 要素の子要素に漢字パーツを追加
            return;  // 関数から抜ける
        }
        else {  // それ以外の要素なら
            // 要素の親要素に漢字パーツをドロップできるセル(正確にはセル内のdiv)があれば取得
            const dropCell = element.closest('.drop-target');
            // ドロップできるセルが存在し、そのセルが複数のパーツをドロップできるセルなら
            if (dropCell !== null && dropCell.classList.contains("Center")) {
                centerDrop(dropCell, kanjiParts);  // 重ねてドロップ
                return;  // 関数から抜ける
            }
        }
    }
    drop(parent, kanjiParts);  // ドロップ前の親要素にドロップし直す
};

// 漢字パーツを重ねることができるセルにドロップするための関数
const centerDrop = (element, kanjiParts) => {
    kanjiParts.style.position = "absolute"  // 漢字パーツの位置指定を親要素(この場合はdropCell)を基準にした絶対位置指定に変更
    kanjiParts.style.left = 0 + "px";
    kanjiParts.style.top = 0 + "px";  // dropCellを基準にして位置指定
    element.append(kanjiParts);  // 要素の子要素に漢字パーツを追加
    kanjiParts.className = "dragged-item-to-drop";  // 漢字パーツにドロップ後のCSS適用
    const table = element.closest(".kanji-table");  // 漢字をドロップするテーブルの親となる要素を取得
    check(table);  // 正誤判定
}

// 正誤判定用関数
// table 正しい位置に漢字パーツをドロップできているかチェックするテーブルの親要素
const check = (table) => {
    dropTargets = table.querySelectorAll(".drop-target");  // 漢字パーツをドロップできるセルを取得
    // 漢字が完成しているかを判定するループ
    for (dropTarget of dropTargets) {
        const children = dropTarget.children;  // ドロップ先セル内の子要素(漢字パーツ)を取得
        if (children !== null && children.length > 0) {  // 子要素があれば
            console.log("親" + dropTarget.dataset.positionId);
            // ドロップ先セルと子要素のpositionIdを比較(正しいパーツをドロップできているか判定)するループ
            for (child of children) {
                if (child.classList.contains("dragged-item-to-drop")) {  // 子要素がドロップ後の漢字パーツであれば
                    console.log("子" + child.dataset.positionId);
                    if (dropTarget.dataset.positionId !== child.dataset.positionId) {  // 正しいパーツをドロップできていなければ
                        return;  // 関数を終了
                    }
                }
            }
        }
        else {  // 子要素がなければ
            return;  // 関数を終了
        }
    }

    // 正しくドロップできていれば、テーブルを削除し正解の文字を表示する
    table.innerHTML = `<p>${yojijukugo_json[counter].構成漢字[table.dataset.index].漢字}</p>`;

    // 他のテーブルも正解しているかチェックするループ
    for (kanji_table of kanji_tables) {  // テーブルを取得
        const Quantity = kanji_table.querySelectorAll(".drop-target");  // テーブル内のドロップ可能セルを取得
        console.log(Quantity);
        if (Quantity.length > 0) return;  // ドロップ可能セルがまだあれば(正解していない漢字があれば)関数を終了
    }

    window.alert("正解！");
    counter += 1;  // 四字熟語のカウンタをカウントアップ
    if (counter >= yojijukugo_json.length)  // カウンタが四字熟語の個数を超えたら
    {
        counter = 0;  // 最初の四字熟語に戻る
    }
    yojijukugo_display(counter);  // 四字熟語の表示
}

// 四字熟語を表示する関数
const yojijukugo_display = (counter) => {
    kanjiPartsContainer.innerHTML = "";  // 漢字パーツの削除
    // 四字熟語の表示
    yojijukugo.innerHTML = `${yojijukugo_json[counter].熟語}<rt>${yojijukugo_json[counter].読み方}</rt>`;
    // 四字熟語の各漢字を表示するループ
    for (let i = 0; i < kanji_tables.length; i++)
    {
        const kousei_kanji = yojijukugo_json[counter].構成漢字[i];  // 四字熟語に含まれる漢字とその構造を変数に保存
        kanji_yomi[i].textContent = `${kousei_kanji.読み}`;  // 漢字の読みを表示
        let position = "";  // 漢字パーツの位置を保存する変数
        kanji_tables[i].innerHTML = "";  // 漢字パーツを設置するテーブルを削除
        // 漢字を構成するパーツを表示するループ
        for (let j = 0; j < kousei_kanji.構成.length; j++)
        {
            // パーツを表示(class="dragged-item"でドラッグ可能にし、data-position-id属性にパーツの位置を指定する)
            kanjiPartsContainer.insertAdjacentHTML("beforeend", `<div class="dragged-item" data-position-id="${i}${kousei_kanji.構成[j].位置}">${kousei_kanji.構成[j].部品}</div>`);
            position += kousei_kanji.構成[j].位置;  // パーツの位置を変数に追加
            const parts = kanjiPartsContainer.lastElementChild;  // 漢字パーツ

            // 漢字パーツにpointerdownイベントを設定
            parts.addEventListener("pointerdown", (event) => {
                if (kanjiParts !== null) return;  // 漢字パーツが選択されていれば処理を終了

                console.log("pointerdownイベント");
                kanjiParts = event.target;  // pointerdownされた漢字パーツ
                event.preventDefault();  // ブラウザのデフォルト動作を抑制
                kanjiParts.className = "dragged-item";  // 漢字パーツにドロップ前のCSS適用
                kanjiParts.style.opacity = 0.5;  // 漢字パーツを半透明にする
                parent = kanjiParts.parentElement;  // 漢字パーツの親要素をグローバル変数に保存
                document.body.append(kanjiParts);  // 漢字パーツの親要素をbodyにする(ドロップ可能エリアのrelativeに影響されないようにする)
                kanjiParts.style.position = "absolute";  // 漢字パーツの位置指定を親要素(この場合はbody)を基準にした絶対位置指定に変更
                // 漢字パーツを移動させる
                kanjiParts.style.left = (event.pageX - kanjiParts.clientWidth / 2) + "px";
                kanjiParts.style.top = (event.pageY - kanjiParts.clientHeight / 2) + "px";
            });

            // 漢字パーツにpointermove(移動)イベントを設定
            parts.addEventListener("pointermove", (event) => {
                // イベントが発生したのが選択されている漢字パーツでなければ処理を終了
                if (kanjiParts === null || kanjiParts !== event.target) return;

                console.log("pointermoveイベント");
                event.preventDefault();  // ブラウザのデフォルト動作を抑制
                // 漢字パーツを移動させる
                kanjiParts.style.left = (event.pageX - kanjiParts.clientWidth / 2) + "px";
                kanjiParts.style.top = (event.pageY - kanjiParts.clientHeight / 2) + "px";
                kanjiParts.setPointerCapture(event.pointerId);
            });

            // pointerupイベントを設定
            parts.addEventListener("pointerup", (event) => {
                // イベントが発生したのが選択されている漢字パーツでなければ処理を終了
                if (kanjiParts === null || kanjiParts !== event.target) return;

                console.log("pointerupイベント");
                event.preventDefault();  // ブラウザのデフォルト動作を抑制
                event.stopPropagation();  // 親要素へのバブリングの停止
                kanjiParts.style.position = "static";  // 漢字パーツの位置指定を通常の配置に戻す
                kanjiParts.style.opacity = 1;  // 漢字パーツを不透明にする

                kanjiParts.style.pointerEvents = 'none';  // 最前面にある漢字パーツを取得しないようにする
                // 指の下にある要素取得
                const element = document.elementFromPoint(event.clientX, event.clientY);
                kanjiParts.style.pointerEvents = 'auto';  // 漢字パーツを取得できる設定に戻す

                drop(element, kanjiParts);  // ドロップする
                kanjiParts = null;  // 漢字パーツの選択を解除
            });

            parts.addEventListener("pointercancel", (event) => {
                title.textContent += "pointercancelイベント発生";
            });
        }

        // 各パーツの位置によって、それを配置するテーブルを表示
        if (position === "LeftRight") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[0]);
        }
        else if (position === "TopBottom") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[1]);
        }
        else if (position === "VerticalLeftVerticalCenterVerticalRight") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[2]);
        }
        else if (position === "ParallelTopParallelCenterParallelBottom") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[3]);
        }
        else if (position === "OutsideInside") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[4]);
        }
        else if (position === "TopOutsideBottomInside") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[5]);
        }
        else if (position === "TopInsideBottomOutside") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[6]);
        }
        else if (position === "LeftOutsideRightInside") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[7]);
        }
        else if (position === "TopLeftOutsideBottomRightInside") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[8]);
        }
        else if (position === "TopRightOutsideBottomLeftInside") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[9]);
        }
        else if (position === "BottomLeftOutsideTopRightInside") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[10]);
        }
        else if (/^(Center)+$/.test(position)) {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[11]);
        }
        else if (position === "Single") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[12]);
        }
        else if (position === "TopLeftRight") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[13]);
        }
        else if (position === "LeftTopBottom") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[14]);
        }
        else if (position === "LeftRightBottom") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[15]);
        }
        else if (position === "TopBottomRight") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[16]);
        }
        else if (position === "TopParallelTopParallelCenterParallelBottom") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[17]);
        }
        else if (/^Top(Center)+$/.test(position)) {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[18]);
        }
        else if (position === "TopLeftOutsideTopBottom") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[19]);
        }
        else if (position === "BottomLeftOutsideTopBottom") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[20]);
        }
        else if (position === "TopBottomLeftOutsideTopRightInside") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[21]);
        }
        else if (/^Left(Center)+$/.test(position)) {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[22]);
        }
        else if (position === "TopTopOutsideBottomInside") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[23]);
        }
        else if (position === "LeftTopRightOutsideBottomLeftInside") {
            kanji_tables[i].insertAdjacentHTML("beforeend", kanji_table_list[24]);
        }

        // 漢字パーツを設置するテーブル内の漢字を設置するセルを取得
        kanji_tables[i].querySelectorAll(".drop-target").forEach((dropTarget) => {
            // セルのクラス名の末尾(セルの位置情報)を取得
            const PositionClassName =  dropTarget.classList[dropTarget.classList.length - 1];
            // data-position-id属性にパーツの位置を指定する
            dropTarget.setAttribute("data-position-id", i + PositionClassName);

            // パーツを重ねられるセルの場合
            if (PositionClassName === "Center") {
                dropTarget.textContent = "⿻";  // 重ねられることを記号で表示
            }
        });
    }
    // 四字熟語の意味の表示
    yojijukugo_meaning.textContent = yojijukugo_json[counter].意味;
}

// 回答ボタンのクリックイベント
answer_btn.addEventListener('click', () => {
    bool = true;  // 問題の回答結果(初期値は正解)

    // 漢字パーツをドロップできるセルを取得するループ
    document.querySelectorAll(".drop-target").forEach((dropTarget) => {
        const children = dropTarget.children;  // ドロップ先セル内の子要素(漢字パーツ)を取得
        if (children !== null && children.length > 0) {  // 子要素があれば
            console.log("親" + dropTarget.dataset.positionId);
            // ドロップ先セルと子要素のidを比較(正しいパーツをドロップできているか判定)するループ
            for (child of children) {
                if (child.classList.contains("dragged-item-to-drop")) {  // 子要素がドロップ後の漢字パーツであれば
                    console.log("子" + child.dataset.positionId);
                    if (dropTarget.dataset.positionId !== child.dataset.positionId) {  // 正しいパーツをドロップできていなければ
                        bool = false;  // 問題の回答結果を不正解にする
                    }
                }
            }
        }
        else {  // 子要素がなければ
            bool = false;  // 問題の回答結果を不正解にする
        }
    });

    // 漢字パーツを設置するコンテナ内に漢字パーツがあれば
    if (kanjiPartsContainer.children.length > 0) {
        bool = false;  // 問題の回答結果を不正解にする
    }

    if (bool) {  // 問題に正解していれば
        window.alert("正解！");
        counter += 1;  // 四字熟語のカウンタをカウントアップ
        if (counter >= yojijukugo_json.length)  // カウンタが四字熟語の個数を超えたら
        {
            counter = 0;  // 最初の四字熟語に戻る
        }
        yojijukugo_display(counter);  // 四字熟語の表示
    }
    else {  // 問題に正解していなければ
        window.alert("不正解！");
    }
});

next_btn.addEventListener('click', () => {
    counter += 1;  // 四字熟語のカウンタをカウントアップ
    if (counter >= yojijukugo_json.length)  // カウンタが四字熟語の個数を超えたら
    {
        counter = 0;  // 最初の四字熟語に戻る
    }
    yojijukugo_display(counter);  // 四字熟語の表示
});

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
});