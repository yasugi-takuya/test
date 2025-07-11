//window.alert(diff);
const title = document.getElementById('title');  // タイトルを表示するh1タグ
const yojijukugo = document.getElementById('yojijukugo');  // 四字熟語と読み仮名を表示するrubyタグ
const kanji_yomi = document.querySelectorAll('.kanji-yomi');  // 四字熟語の各漢字の読み仮名を表示するpタグのリスト
const kanji_tables = document.querySelectorAll('.kanji-table');  // 四字熟語の各漢字を表示するテーブルの親要素のリスト
const yojijukugo_meaning = document.getElementById('yojijukugo_meaning');  // 四字熟語の意味を表示するpタグ
const pass_btn = document.getElementById('pass_btn');  // 次の四字熟語を表示するボタン(テスト用)
const kanjiPartsContainer = document.getElementById('kanjiPartsContainer');  // 各漢字を構成するパーツを表示するコンテナ
const message_bg = document.getElementById('message-bg');  // 正解時に表示されるメッセージのコンテナ
const message = document.getElementById('message');  // 正解時に表示されるメッセージのアイテム
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

let kanjiPart = null;  // 選択されている漢字パーツ
let parent;  // 漢字パーツの親要素
let url;  // 四字熟語が書かれたJSONファイルのurl(相対パス)
let counter = 0;  // 四字熟語のカウンタ
let yojijukugo_json;  // 四字熟語のJSONデータ
let score = 0;  // 問題の正解数

// ドロップ用関数
const drop = (element, kanjiPart) => {
    if (element !== null) {  // ドロップ先に要素があれば
        if (element.classList.contains("drop-target")) {  // 漢字パーツをドロップするテーブルのセルなら
            if (element.classList.contains("Center")) {  // パーツを重ねて設置できるセルなら
                centerDrop(element, kanjiPart);  // 重ねてドロップ
            }
            else {  // 通常のセルなら
                element.append(kanjiPart);  // 要素の子要素に漢字パーツを追加
                kanjiPart.className = "dragged-item-to-drop";  // 漢字パーツにドロップ後のCSS適用
                const table = element.closest(".kanji-table");  // 漢字をドロップするテーブルの親となる要素を取得
                check(table);  // 正誤判定
            }
            return;  // 関数から抜ける
        }
        else if (element.id === "kanjiPartsContainer") {  // 漢字パーツを並べるコンテナの中なら
            kanjiPart.className = "dragged-item";  // 漢字パーツにドロップ前のCSS適用
            element.append(kanjiPart);  // 要素の子要素に漢字パーツを追加
            return;  // 関数から抜ける
        }
        else {  // それ以外の要素なら
            // 要素の親要素に漢字パーツをドロップできるセル(正確にはセル内のdiv)があれば取得
            const dropCell = element.closest('.drop-target');
            // ドロップできるセルが存在し、そのセルが複数のパーツをドロップできるセルなら
            if (dropCell !== null && dropCell.classList.contains("Center")) {
                centerDrop(dropCell, kanjiPart);  // 重ねてドロップ
                return;  // 関数から抜ける
            }
        }
    }
    drop(parent, kanjiPart);  // ドロップ前の親要素にドロップし直す
};

// 漢字パーツを重ねることができるセルにドロップするための関数
const centerDrop = (element, kanjiPart) => {
    kanjiPart.style.position = "absolute"  // 漢字パーツの位置指定を親要素(この場合はdropCell)を基準にした絶対位置指定に変更
    kanjiPart.style.left = 0 + "px";
    kanjiPart.style.top = 0 + "px";  // dropCellを基準にして位置指定
    element.append(kanjiPart);  // 要素の子要素に漢字パーツを追加
    kanjiPart.className = "dragged-item-to-drop";  // 漢字パーツにドロップ後のCSS適用
    const table = element.closest(".kanji-table");  // 漢字をドロップするテーブルの親となる要素を取得
    check(table);  // 正誤判定
}

// 正誤判定用関数
// table 正しい位置に漢字パーツをドロップできているかチェックするテーブルの親要素
const check = (table) => {
    const dropTargets = table.querySelectorAll(".drop-target");  // 漢字パーツをドロップできるセルを取得
    
    // 漢字が完成しているかを判定するループ
    for (dropTarget of dropTargets) {
        // ドロップ先セル内の漢字パーツの文字を取得
        const kanjiParts = Array.from(dropTarget.children)
            .filter(element => element.classList.contains("dragged-item-to-drop"))
            .map(element => element.textContent);

        const positionId = dropTarget.dataset.positionId;  // ドロップ先セルの位置情報を変数に保存
        // 正解の漢字パーツの文字を全て取得
        const CorrectParts = Array.from(document.querySelectorAll(`[data-position-id="${positionId}"].dragged-item, [data-position-id="${positionId}"].dragged-item-to-drop`))
            .map(element => element.textContent);
        
        if (kanjiParts !== null && kanjiParts.length > 0) {  // 漢字パーツがドロップされていれば
            if (kanjiParts.length === CorrectParts.length) {  // 漢字パーツが必要な数ドロップされていれば
                // ドロップされた漢字パーツのループ
                for (kanjiPart of kanjiParts) {
                    if (!CorrectParts.includes(kanjiPart)) {  // 漢字パーツの文字が正解の文字のどれとも一致しなければ
                        return;  // 関数を終了
                    }
                    else {  // 漢字パーツの文字が正解の文字のどれかと一致したら
                        const index = CorrectParts.indexOf(kanjiPart);  // 配列内で一番前にある一致した文字の添え字を取得
                        CorrectParts.splice(index, 1);  // インデックス位置から1つ削除(正解のパーツを削除)
                    }
                }
            }
            else {
                return;  // 関数を終了
            }
        }
        else {
            return;  // 関数を終了
        }
    }

    // 正しくドロップできていれば、漢字パーツをドロップするテーブルとその子要素を全て非表示にする
    table.querySelectorAll('*').forEach(element => element.style.display = 'none');
    // 正解の文字を表示する
    table.insertAdjacentHTML("beforeend", `<div class="correctKanji">${yojijukugo_json[counter].構成漢字[table.dataset.index].漢字}</div>`);

    // 他のテーブルも正解しているかチェックするループ
    for (kanji_table of kanji_tables) {  // テーブルを取得
        // テーブル内に正解の漢字を表示したdiv要素がなければ関数を終了
        if (kanji_table.querySelector(".correctKanji") === null) return;
    }

    // 全てのテーブルが正解していれば
    message_bg.style.display = "block";  /* 正解メッセージの背景を表示 */
    message_bg.style.height = document.documentElement.scrollHeight + 'px';  // 正解メッセージの背景の縦幅を画面に合わせる
    message.style.display = "block";  /* 正解メッセージを表示 */
    const correct_sound = new Audio('ta_ge_quiz_yes01.mp3');  // 正解の音を生成
    correct_sound.play();  // 正解の音を再生

    // 0.1秒待ってから、次の問題へ
    setTimeout(() => {
        message_bg.style.display = "none";  /* 正解メッセージの背景を非表示 */
        message.style.display = "none";  /* 正解メッセージを非表示 */
        counter += 1;  // 四字熟語のカウンタをカウントアップ
        score += 1;  // 正解数のカウンタをカウントアップ
        if (counter >= yojijukugo_json.length)  // カウンタが四字熟語の個数を超えたら
        {
            window.alert("正解数は" + score + "問！");
            return;
        }
        yojijukugo_display(counter);  // 四字熟語の表示
    }, 100);
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
                if (kanjiPart !== null) return;  // 漢字パーツが選択されていれば処理を終了

                console.log("pointerdownイベント");
                kanjiPart = event.target;  // pointerdownされた漢字パーツ
                event.preventDefault();  // ブラウザのデフォルト動作を抑制
                kanjiPart.className = "dragged-item";  // 漢字パーツにドロップ前のCSS適用
                kanjiPart.style.opacity = 0.5;  // 漢字パーツを半透明にする
                parent = kanjiPart.parentElement;  // 漢字パーツの親要素をグローバル変数に保存
                document.body.append(kanjiPart);  // 漢字パーツの親要素をbodyにする(ドロップ可能エリアのrelativeに影響されないようにする)
                kanjiPart.style.position = "absolute";  // 漢字パーツの位置指定を親要素(この場合はbody)を基準にした絶対位置指定に変更
                // 漢字パーツを移動させる
                kanjiPart.style.left = (event.pageX - kanjiPart.clientWidth / 2) + "px";
                kanjiPart.style.top = (event.pageY - kanjiPart.clientHeight / 2) + "px";
            });

            // 漢字パーツにpointermove(移動)イベントを設定
            parts.addEventListener("pointermove", (event) => {
                // イベントが発生したのが選択されている漢字パーツでなければ処理を終了
                if (kanjiPart === null || kanjiPart !== event.target) return;

                console.log("pointermoveイベント");
                event.preventDefault();  // ブラウザのデフォルト動作を抑制
                // 漢字パーツを移動させる
                kanjiPart.style.left = (event.pageX - kanjiPart.clientWidth / 2) + "px";
                kanjiPart.style.top = (event.pageY - kanjiPart.clientHeight / 2) + "px";
                kanjiPart.setPointerCapture(event.pointerId);
            });

            // pointerupイベントを設定
            parts.addEventListener("pointerup", (event) => {
                // イベントが発生したのが選択されている漢字パーツでなければ処理を終了
                if (kanjiPart === null || kanjiPart !== event.target) return;

                console.log("pointerupイベント");
                event.preventDefault();  // ブラウザのデフォルト動作を抑制
                event.stopPropagation();  // 親要素へのバブリングの停止
                kanjiPart.style.position = "static";  // 漢字パーツの位置指定を通常の配置に戻す
                kanjiPart.style.opacity = 1;  // 漢字パーツを不透明にする

                kanjiPart.style.pointerEvents = 'none';  // 最前面にある漢字パーツを取得しないようにする
                // 漢字パーツの下にある要素取得
                const element = document.elementFromPoint(event.clientX, event.clientY);
                kanjiPart.style.pointerEvents = 'auto';  // 漢字パーツを取得できる設定に戻す

                drop(element, kanjiPart);  // ドロップする
                kanjiPart = null;  // 漢字パーツの選択を解除
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
            console.log("aaaaaaa");
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

    const kanjiParts = Array.from(kanjiPartsContainer.children);  // コンテナ内の漢字パーツを配列に変換
    // コンテナ内の漢字パーツをFisher–Yatesシャッフルする
    for (let i = kanjiParts.length - 1; i > 0; i--) {  // 要素を末尾からシャッフルしていく
        const j = Math.floor(Math.random() * (i + 1));  // 0からシャッフル対象要素の添え字までの乱数を生成し、小数点以下切り捨て
        [kanjiParts[i], kanjiParts[j]] = [kanjiParts[j], kanjiParts[i]];  // 生成された乱数番目の要素とシャッフル対象要素を交換
    }
    // シャッフルした順番に並べ直す
    kanjiParts.forEach(kanjiPart => kanjiPartsContainer.appendChild(kanjiPart));

    // 四字熟語の意味の表示
    yojijukugo_meaning.textContent = yojijukugo_json[counter].意味;
}

// パスボタンのクリックイベント
pass_btn.addEventListener('click', () => {
    counter += 1;  // 四字熟語のカウンタをカウントアップ
    if (counter >= yojijukugo_json.length)  // カウンタが四字熟語の個数を超えたら
    {
        window.alert("正解数は" + score + "問！");
        return;
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
url = 'test.json';
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