//window.alert(diff);
const title = document.getElementById('title');  // タイトルを表示するh1タグ
const yojijukugo = document.getElementById('yojijukugo');  // 四字熟語と読み仮名を表示するrubyタグ
const kanji_yomi = document.querySelectorAll('.kanji-yomi');  // 四字熟語の各漢字の読み仮名を表示するpタグのリスト
const kanji_tables = document.querySelectorAll('.kanji-table');  // 四字熟語の各漢字を表示するテーブルを格納するdivタグのリスト
const yojijukugo_meaning = document.getElementById('yojijukugo_meaning');  // 四字熟語の意味を表示するpタグ
const hint_btn = document.getElementById('hint_btn');  // ヒント表示用ボタン
const pass_btn = document.getElementById('pass_btn');  // 次の四字熟語を表示するボタン
const give_up_btn = document.getElementById('give_up_btn');  // ギブアップボタン
const kanjiPartsContainer = document.getElementById('kanjiPartsContainer');  // 各漢字を構成するパーツを表示するコンテナ
const message_bg = document.getElementById('message-bg');  // 正解時に表示される背景
const message = document.getElementById('message');  // 正解時に表示されるメッセージ
const score_form = document.getElementById('score_form');  // スコア送信用フォーム
const score_hidden = document.getElementById('score_hidden');  // スコア送信用hidden要素
const question_length_hidden = document.getElementById('questions_length_hidden');  // 問題数送信用hidden要素
const diff_hidden = document.getElementById('diff_hidden');  // 難易度送信用hidden要素
// 漢字のパーツをドロップするテーブルのリスト
const kanji_table_list = [
    '<table class="t1"><tr><td><div data-position-id="Left" class="drop-target Left"></div></td><td><div data-position-id="Right" class="drop-target Right"></div></td></tr></table>',
    '<table class="t2"><tr><td><div data-position-id="Top" class="drop-target Top"></div></td></tr><tr><td><div data-position-id="Bottom" class="drop-target Bottom"></div></td></tr></table>',
    '<table class="t3"><tr><td><div data-position-id="VerticalLeft" class="drop-target VerticalLeft"></div></td><td><div data-position-id="VerticalCenter" class="drop-target VerticalCenter"></div></td><td><div data-position-id="VerticalRight" class="drop-target VerticalRight"></div></td></tr></table>',
    '<table class="t4"><tr><td><div data-position-id="ParallelTop" class="drop-target ParallelTop"></div></td></tr><tr><td><div data-position-id="ParallelCenter" class="drop-target ParallelCenter"></div></td></tr><tr><td><div data-position-id="ParallelBottom" class="drop-target ParallelBottom"></div></td></tr></table>',
    '<div data-position-id="Outside" class="t5 drop-target Outside"><div data-position-id="Inside" class="drop-target Inside"></div></div>',
    '<div data-position-id="TopOutside" class="t6 drop-target TopOutside"><div data-position-id="BottomInside" class="drop-target BottomInside"></div></div>',
    '<div data-position-id="BottomOutside" class="t7 drop-target BottomOutside"><div data-position-id="TopInside" class="drop-target TopInside"></div></div>',
    '<div data-position-id="LeftOutside" class="t8 drop-target LeftOutside"><div data-position-id="RightInside" class="drop-target RightInside"></div></div>',
    '<div data-position-id="TopLeftOutside" class="t9 drop-target TopLeftOutside"><div data-position-id="BottomRightInside" class="drop-target BottomRightInside"></div></div>',
    '<div data-position-id="TopRightOutside" class="t10 drop-target TopRightOutside"><div data-position-id="BottomLeftInside" class="drop-target BottomLeftInside"></div></div>',
    '<div data-position-id="BottomLeftOutside" class="t11 drop-target BottomLeftOutside"><div data-position-id="TopRightInside" class="drop-target TopRightInside"></div></div>',
    '<div data-position-id="Center" class="t12 drop-target Center"></div>',
    '<div data-position-id="Single" class="t13 drop-target Single"></div>',
    '<table class="t14"><tr><td colspan="2"><div data-position-id="Top" class="drop-target Top"></div></td></tr><tr><td><div data-position-id="Left" class="drop-target Left"></div></td><td><div data-position-id="Right" class="drop-target Right"></div></td></tr></table>',
    '<table class="t15"><tr><td rowspan="2"><div data-position-id="Left" class="drop-target Left"></div></td><td><div data-position-id="Top" class="drop-target Top"></div></td></tr><tr><td><div data-position-id="Bottom" class="drop-target Bottom"></div></td></tr></table>',
    '<table class="t16"><tr><td><div data-position-id="Left" class="drop-target Left"></div></td><td><div data-position-id="Right" class="drop-target Right"></div></td></tr><tr><td colspan="2"><div data-position-id="Bottom" class="drop-target Bottom"></div></td></tr></table>',
    '<table class="t17"><tr><td><div data-position-id="Top" class="drop-target Top"></div></td><td rowspan="2"><div data-position-id="Right" class="drop-target Right"></div></td></tr><tr><td><div data-position-id="Bottom" class="drop-target Bottom"></div></td></tr></table>',
    '<table class="t18"><tr><td><div data-position-id="Top" class="drop-target Top"></div></td></tr><tr><td><div data-position-id="ParallelTop" class="drop-target ParallelTop"></div></td></tr><tr><td><div data-position-id="ParallelCenter" class="drop-target ParallelCenter"></div></td></tr><tr><td><div data-position-id="ParallelBottom" class="drop-target ParallelBottom"></div></td></tr></table>',
    '<table class="t19"><tr><td><div data-position-id="Top" class="drop-target Top"></div></td></tr><tr><td><div data-position-id="Center" class="drop-target Center"></div></td></tr></table>',
    '<div data-position-id="TopLeftOutside" class="t20 drop-target TopLeftOutside"><div data-position-id="Top" class="drop-target Top"></div><div data-position-id="Bottom" class="drop-target Bottom"></div></div>',
    '<div data-position-id="BottomLeftOutside" class="t21 drop-target BottomLeftOutside"><div data-position-id="Top" class="drop-target Top"></div><div data-position-id="Bottom" class="drop-target Bottom"></div></div>',
    '<table class="t22"><tr><td><div data-position-id="Top" class="drop-target Top"></div></td></tr><tr><td><div data-position-id="BottomLeftOutside" class="drop-target BottomLeftOutside"><div data-position-id="TopRightInside" class="drop-target TopRightInside"></div></div></td></tr></table>',
    '<table class="t23"><tr><td><div data-position-id="Left" class="drop-target Left"></div></td><td><div data-position-id="Center" class="drop-target Center"></div></td></tr></table>',
    '<table class="t24"><tr><td><div data-position-id="Top" class="drop-target Top"></div></td></tr><tr><td><div data-position-id="TopOutside" class="drop-target TopOutside"><div data-position-id="BottomInside" class="drop-target BottomInside"></div></div></td></tr></table>',
    '<table class="t25"><tr><td><div data-position-id="Left" class="drop-target Left"></div></td><td><div data-position-id="TopRightOutside" class="drop-target TopRightOutside"><div data-position-id="BottomLeftInside" class="drop-target BottomLeftInside"></div></div></td></tr></table>'
];

let selectedKanjiPart = null;  // 選択されている漢字パーツ
let parent;  // 漢字パーツの親要素
let url;  // 四字熟語が書かれたJSONファイルのurl(相対パス)
let counter = 0;  // 四字熟語のカウンタ
let yojijukugo_json;  // 四字熟語のJSONデータ
let score = 0;  // 問題の正解数
let hintsRemaining = 3  // ヒントの残り回数

// ドロップ用関数
const drop = (element, kanjiPart) => {
    kanjiPart.style.position = "static";  // 漢字パーツの位置指定を通常の配置に戻す

    if (element !== null) {  // ドロップ先に要素があれば
        if (element.classList.contains("drop-target")) {  // ドロップターゲットなら
            if (element.classList.contains("Center")) {  // パーツを重ねて設置できるドロップターゲットなら
                centerDrop(element, kanjiPart);  // 重ねてドロップ
            }
            else {  // 通常のドロップターゲットなら
                element.append(kanjiPart);  // 要素の子要素に漢字パーツを追加
                kanjiPart.className = "dragged-item-to-drop";  // 漢字パーツにドロップ後のCSS適用
                const table = element.closest(".kanji-table");  // 漢字をドロップするテーブルの親となるdiv要素を取得
                check(table);  // 漢字が完成しているか判定
            }
            return;  // 関数から抜ける
        }
        else if (element.id === "kanjiPartsContainer") {  // 漢字パーツを並べるコンテナの中なら
            kanjiPart.className = "dragged-item";  // 漢字パーツにドロップ前のCSS適用
            element.append(kanjiPart);  // コンテナに漢字パーツを追加
            return;  // 関数から抜ける
        }
        else {  // それ以外の要素なら
            // 要素の親要素にドロップターゲットがあれば取得
            const dropCell = element.closest('.drop-target');
            // ドロップターゲットが存在し、そのドロップターゲットが複数のパーツをドロップできるドロップターゲットなら
            if (dropCell !== null && dropCell.classList.contains("Center")) {
                centerDrop(dropCell, kanjiPart);  // 重ねてドロップ
                return;  // 関数から抜ける
            }
        }
    }
    // ドロップ先にドロップターゲットがなければ
    drop(parent, kanjiPart);  // ドロップ前の親要素にドロップし直す
};

// 漢字パーツを重ねることができるセルにドロップするための関数
const centerDrop = (element, kanjiPart) => {
    if (element.children.length > 0) {  // すでに他の漢字パーツがドロップされている場合
        kanjiPart.className = "dragged-item-to-drop-center";  // 漢字パーツに重ねてドロップ後のCSS適用
    } 
    else  // 他の漢字パーツがドロップされていない場合
    {
        kanjiPart.className = "dragged-item-to-drop";  // 漢字パーツにドロップ後のCSS適用
    }
    kanjiPart.style.position = "absolute"  // 漢字パーツの位置指定を親要素(この場合はドロップターゲット)を基準にした絶対位置指定に変更
    kanjiPart.style.left = 0 + "px";
    kanjiPart.style.top = 0 + "px";  // ドロップターゲットを基準にして位置指定
    element.append(kanjiPart);  // 要素の子要素に漢字パーツを追加
    const table = element.closest(".kanji-table");  // 漢字をドロップするテーブルの親となるdiv要素を取得
    check(table);  // 漢字が完成しているか判定
}

// 正誤判定用関数
// table 正しい位置に漢字パーツをドロップできているかチェックするテーブルの親となるdiv要素
const check = (table) => {
    const dropTargets = table.querySelectorAll(".drop-target");  // テーブル内のドロップターゲットを取得
    
    // 漢字が完成しているかを判定するループ
    for (dropTarget of dropTargets) {
        // ドロップターゲット内の漢字パーツの文字を取得
        const kanjiParts = Array.from(dropTarget.children)
            .filter(element => element.classList.contains("dragged-item-to-drop") ||
                    element.classList.contains("dragged-item-to-drop-center"))
            .map(element => element.textContent);

        const positionId = dropTarget.dataset.positionId;  // ドロップターゲットの位置情報を変数に保存
        // 正解の漢字パーツの文字を全て取得
        const CorrectParts = Array.from(document.querySelectorAll(`
            [data-position-id="${positionId}"].dragged-item,
            [data-position-id="${positionId}"].dragged-item-to-drop,
            [data-position-id="${positionId}"].dragged-item-to-drop-center`))
            .map(element => element.textContent);
        
        if (kanjiParts !== null && kanjiParts.length > 0) {  // 漢字パーツがドロップされていれば
            if (kanjiParts.length === CorrectParts.length) {  // 漢字パーツが必要な数ドロップされていれば
                // ドロップされた漢字パーツが正しいパーツか判定するループ
                for (kanjiPart of kanjiParts) {
                    if (!CorrectParts.includes(kanjiPart)) {  // 漢字パーツの文字が正解の文字のどれとも一致しなければ
                        return;  // 関数を終了
                    }
                    else {  // 漢字パーツの文字が正解の文字のどれかと一致したら
                        const index = CorrectParts.indexOf(kanjiPart);  // 正解の配列内で一番前にある一致した文字の添え字を取得
                        CorrectParts.splice(index, 1);  // インデックス位置から1つ削除(正解の文字を削除)
                    }
                }
            }
            else {  // 漢字パーツが必要な数ドロップされていなければ
                return;  // 関数を終了
            }
        }
        else {  // 漢字パーツがドロップされていなければ
            return;  // 関数を終了
        }
    }

    // 正しくドロップできていれば
    const correct_sound1 = new Audio('クイズ正解3.mp3');  // 正解の音を生成
    const correct_sound2 = new Audio('ta_ge_quiz_yes01.mp3');  // すべての漢字が完成している場合の正解の音を生成

    // 漢字パーツをドロップするテーブルとその子要素を全て非表示にする
    table.querySelectorAll('*').forEach(element => element.style.display = 'none');
    // 正解の文字を表示する
    table.insertAdjacentHTML("beforeend", `<div class="correctKanji">${yojijukugo_json[counter].構成漢字[table.dataset.index].漢字}</div>`);

    // 他のテーブルも正解しているかチェックするループ
    for (kanji_table of kanji_tables) {  // テーブルを取得
        // テーブルに正解の漢字が表示されていなければ関数を終了
        if (kanji_table.querySelector(".correctKanji") === null) {
            correct_sound1.play();  // 正解の音を再生
            return;  // 関数を終了
        }
    }

    // 全てのテーブルが正解していれば
    correct_sound2.play();  // すべての漢字が完成している場合の正解の音を再生
    message_bg.style.display = "block";  /* 正解メッセージの背景を表示 */
    message_bg.style.height = document.documentElement.scrollHeight + 'px';  // 正解メッセージの背景の縦幅を画面に合わせる
    message.style.display = "block";  /* 正解メッセージを表示 */

    submitAnswer(); // 回答(ストップウォッチ)

    // 0.1秒待ってから、次の問題へ
    setTimeout(() => {
        message_bg.style.display = "none";  /* 正解メッセージの背景を非表示 */
        message.style.display = "none";  /* 正解メッセージを非表示 */
        counter += 1;  // 四字熟語のカウンタをカウントアップ
        score += 1;  // 正解数のカウンタをカウントアップ
        if (counter >= yojijukugo_json.length)  // カウンタが四字熟語の個数を超えたら
        {
            gameEnd();  // ゲーム終了
            return;
        }
        yojijukugo_display(counter);  // 四字熟語の表示
    }, 100);
}

// ゲーム終了用関数
const gameEnd = () => {
    timestop(); // ストップウォッチ停止
    score_hidden.value = score;  // スコアをhidden要素にセット
    question_length_hidden.value = yojijukugo_json.length;  // 問題数をhidden要素にセット
    diff_hidden.value = diff;  // 難易度をhidden要素にセット
    score_form.submit();  // フォームを送信してスコア表示画面(score.php)に遷移
    timereset();    // ストップウォッチリセット
}

// 四字熟語を表示する関数
const yojijukugo_display = (counter) => {
    timestart();    // ストップウォッチ開始
    startQuestionTimer();   // 問題時間計測開始

    kanjiPartsContainer.innerHTML = "";  // コンテナ内の漢字パーツの削除
    // 四字熟語の表示
    yojijukugo.innerHTML = `${yojijukugo_json[counter].熟語}<rt>${yojijukugo_json[counter].読み方}</rt>`;
    // 四字熟語の各漢字を表示するループ
    for (let i = 0; i < kanji_tables.length; i++)
    {
        const kousei_kanji = yojijukugo_json[counter].構成漢字[i];  // 四字熟語に含まれる漢字とその構造を変数に保存
        kanji_yomi[i].textContent = `${kousei_kanji.読み}`;  // 漢字の読みを表示
        let position = "";  // 漢字パーツの位置を保存する変数
        kanji_tables[i].innerHTML = "";  // 表示されていた、漢字パーツを設置するテーブルを削除
        // 漢字を構成するパーツを表示するループ
        for (let j = 0; j < kousei_kanji.構成.length; j++)
        {
            // パーツを表示(class="dragged-item"でドラッグ可能にし、data-position-id属性にパーツの位置を指定する)
            kanjiPartsContainer.insertAdjacentHTML("beforeend", `<div data-id="dragged-item" class="dragged-item" data-position-id="${i}${kousei_kanji.構成[j].位置}">${kousei_kanji.構成[j].部品}</div>`);
            position += kousei_kanji.構成[j].位置;  // パーツの位置を変数に追加
            const parts = kanjiPartsContainer.lastElementChild;  // 作成した漢字パーツ

            // 漢字パーツにpointerdownイベントを設定
            parts.addEventListener("pointerdown", (event) => {
                if (selectedKanjiPart !== null) return;  // 漢字パーツがすでに選択されていればイベントを終了
                console.log("pointerdown");

                selectedKanjiPart = event.target;  // pointerdownされた漢字パーツをグローバル変数に保存
                event.preventDefault();  // ブラウザのデフォルト動作を抑制
                selectedKanjiPart.className = "dragged-item";  // 漢字パーツにドロップ前のCSS適用
                selectedKanjiPart.style.opacity = 0.5;  // 漢字パーツを半透明にする
                parent = selectedKanjiPart.parentElement;  // 漢字パーツの親要素をグローバル変数に保存
                document.body.append(selectedKanjiPart);  // 漢字パーツの親要素をbodyにする(ドロップ可能エリアのrelativeに影響されないようにする)
                selectedKanjiPart.style.position = "absolute";  // 漢字パーツの位置指定を親要素(この場合はbody)を基準にした絶対位置指定に変更
                // 漢字パーツの中央がpointerdownされた位置に来るように移動させる
                selectedKanjiPart.style.left = (event.pageX - selectedKanjiPart.clientWidth / 2) + "px";
                selectedKanjiPart.style.top = (event.pageY - selectedKanjiPart.clientHeight / 2) + "px";
            });

            // 漢字パーツにpointermove(移動)イベントを設定
            parts.addEventListener("pointermove", (event) => {
                // イベントが発生したのが選択されている漢字パーツでなければイベントを終了
                if (selectedKanjiPart === null || selectedKanjiPart !== event.target) return;
                console.log("pointermove");


                event.preventDefault();  // ブラウザのデフォルト動作を抑制
                // 漢字パーツを移動させる
                selectedKanjiPart.style.left = (event.pageX - selectedKanjiPart.clientWidth / 2) + "px";
                selectedKanjiPart.style.top = (event.pageY - selectedKanjiPart.clientHeight / 2) + "px";
                selectedKanjiPart.setPointerCapture(event.pointerId);  // ポインタが漢字パーツから外れても移動を続けるようにする
            });

            // pointerupイベントを設定
            parts.addEventListener("pointerup", (event) => {
                // イベントが発生したのが選択されている漢字パーツでなければ処理を終了
                if (selectedKanjiPart === null || selectedKanjiPart !== event.target) return;
                console.log("pointerup");

                event.preventDefault();  // ブラウザのデフォルト動作を抑制
                event.stopPropagation();  // 親要素へのバブリングの停止
                selectedKanjiPart.style.opacity = 1;  // 漢字パーツを不透明にする

                // 漢字パーツの下にある要素を取得する
                selectedKanjiPart.style.pointerEvents = 'none';  // 最前面にある漢字パーツを取得しないようにする
                // 漢字パーツの下にある要素取得
                const element = document.elementFromPoint(event.clientX, event.clientY);
                selectedKanjiPart.style.pointerEvents = 'auto';  // 漢字パーツを取得できる設定に戻す

                drop(element, selectedKanjiPart);  // ドロップする
                selectedKanjiPart = null;  // 漢字パーツの選択を解除
            });

            // pointercancelイベントチェック用
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

        // 漢字パーツを設置するテーブル内のドロップターゲットを取得
        kanji_tables[i].querySelectorAll(".drop-target").forEach((dropTarget) => {
            // パーツを重ねられるドロップターゲットの場合
            if (dropTarget.dataset.positionId === "Center") {
                dropTarget.textContent = "⿻";  // 重ねられることを記号で表示
            }

            // data-position-id属性にパーツの位置を指定する
            dropTarget.dataset.positionId = i + dropTarget.dataset.positionId;
        });
    }

    const kanjiParts = Array.from(kanjiPartsContainer.children);  // コンテナ内の漢字パーツを配列に変換
    // コンテナ内の漢字パーツをFisher–Yatesシャッフル法でシャッフルする
    for (let i = kanjiParts.length - 1; i > 0; i--) {  // 漢字パーツを末尾からシャッフルしていく
        const j = Math.floor(Math.random() * (i + 1));  // 0からシャッフル対象漢字パーツの添え字までの乱数を生成し、小数点以下切り捨て
        [kanjiParts[i], kanjiParts[j]] = [kanjiParts[j], kanjiParts[i]];  // 生成された乱数番目の漢字パーツとシャッフル対象漢字パーツを交換
    }
    // シャッフルした順番に並べ直す
    kanjiParts.forEach(kanjiPart => kanjiPartsContainer.appendChild(kanjiPart));

    // 四字熟語の意味の表示
    yojijukugo_meaning.textContent = yojijukugo_json[counter].意味;

    hintsRemaining = 3;  // ヒントの残り回数を初期値に戻す
    hint_btn.textContent = "ヒント(残り回数:3)";  // 残り回数をボタンに表示
    hint_btn.disabled = false;  // ヒントボタンを有効化する
}

// ヒントボタンのクリックイベント
hint_btn.addEventListener('click', () => {
    const incorrectDropTargets = [];  // 正解のパーツがドロップされていないドロップターゲットのリスト

    // まだ漢字が完成していないテーブルのドロップターゲットを取得
    const dropTargets = Array.from(document.querySelectorAll(".drop-target"))
        .filter(element => element.style.display != 'none');
    
    // 完成した漢字に使われていない漢字パーツを取得(この後、その中から正しい位置にドロップされているパーツを削除する)
    const incorrectkanjiParts = Array.from(document.querySelectorAll(`
        .dragged-item,
        .dragged-item-to-drop,
        .dragged-item-to-drop-center`))
    .filter(element => element.style.display != 'none');
    
    // 正解のパーツがドロップされていないドロップターゲットを取得するループ
    for (dropTarget of dropTargets) {
        // ドロップターゲット内の漢字パーツを取得
        const dropTargetInkanjiParts = Array.from(dropTarget.children)
            .filter(element => element.classList.contains("dragged-item-to-drop") ||
                    element.classList.contains("dragged-item-to-drop-center"));
        
        if (dropTargetInkanjiParts !== null && dropTargetInkanjiParts.length > 0) {  // 漢字パーツがドロップされていれば
            const positionId = dropTarget.dataset.positionId;  // ドロップターゲットの位置情報を変数に保存
            // 正解の漢字パーツを全て取得
            const CorrectParts = Array.from(document.querySelectorAll(`
                [data-position-id="${positionId}"].dragged-item,
                [data-position-id="${positionId}"].dragged-item-to-drop,
                [data-position-id="${positionId}"].dragged-item-to-drop-center`));

            // 漢字パーツが必要な数ドロップされていなければ
            if (dropTargetInkanjiParts.length !== CorrectParts.length) {
                incorrectDropTargets.push(dropTarget);  // 正解していないドロップターゲットをリストに追加
            }
            
            // ドロップされた漢字パーツのループ
            for (dropTargetInkanjiPart of dropTargetInkanjiParts) {
                // 漢字パーツの文字が正解の文字のどれとも一致しなければ
                if (!CorrectParts.some(CorrectPart => CorrectPart.textContent === dropTargetInkanjiPart.textContent)) {
                    // 正解していないドロップターゲットがまだリストに含まれていない場合のみ
                    if (!incorrectDropTargets.includes(dropTarget)) {
                        incorrectDropTargets.push(dropTarget);  // 正解していないドロップターゲットをリストに追加
                    }
                }
                else {  // 漢字パーツの文字が正解の文字のどれかと一致したら
                    // 正解の漢字パーツの配列内で一番前にある一致した文字の添え字を取得
                    let index = CorrectParts.findIndex(CorrectPart => CorrectPart.textContent === dropTargetInkanjiPart.textContent);
                    CorrectParts.splice(index, 1);  // 正解のパーツをリストから削除(インデックス位置から1つ削除)
                    // 完成した漢字に使われていない漢字パーツから、正しい位置にドロップされているパーツの添え字を取得
                    index = incorrectkanjiParts.indexOf(dropTargetInkanjiPart);
                    incorrectkanjiParts.splice(index, 1);  // 正解のパーツをリストから削除(インデックス位置から1つ削除)
                }
            }
        }
        else {
            incorrectDropTargets.push(dropTarget);  // 正解していないドロップターゲットをリストに追加
        }
    }

    // ランダムに正解していないドロップターゲットを1つ取得する
    const incorrectdropTarget = incorrectDropTargets[Math.floor(Math.random() * (incorrectDropTargets.length))];

    // ランダムに取得した正解していないドロップターゲット内の漢字パーツ取得
    const incorrectDropTargetInKanjiParts = Array.from(incorrectdropTarget.children)
        .filter(element => element.classList.contains("dragged-item-to-drop") ||
                element.classList.contains("dragged-item-to-drop-center"));

    // セルにすでに漢字パーツがあれば
    if (incorrectDropTargetInKanjiParts !== null && incorrectDropTargetInKanjiParts.length > 0) {
        // 漢字パーツを取得するループ
        incorrectDropTargetInKanjiParts.forEach((incorrectDropTargetInKanjiPart) => {
            if (incorrectkanjiParts.includes(incorrectDropTargetInKanjiPart)) {  // 正しい位置にドロップされていないパーツのみ
                drop(kanjiPartsContainer, incorrectDropTargetInKanjiPart);  // 漢字パーツのコンテナに移動
                console.log(incorrectDropTargetInKanjiPart.parentElement);
            }
        });
    }
    
    // ランダムに取得した正解していないドロップターゲットの位置情報を変数に保存
    const positionId = incorrectdropTarget.dataset.positionId;
    // 正しい位置にドロップされていない正解の漢字パーツを全て取得
    const incorrectCorrectParts = Array.from(document.querySelectorAll(`
        [data-position-id="${positionId}"].dragged-item,
        [data-position-id="${positionId}"].dragged-item-to-drop,
        [data-position-id="${positionId}"].dragged-item-to-drop-center`))
    .filter(incorrectCorrectPart => incorrectkanjiParts.includes(incorrectCorrectPart));
    
    // ランダムに正しい位置にドロップされていない正解の漢字パーツの添え字を1つ取得する
    const incorrectCorrectPart = incorrectCorrectParts[Math.floor(Math.random() * (incorrectCorrectParts.length))];

    // ドロップする漢字パーツの親要素
    const parent = incorrectCorrectPart.parentElement;
    // 正解の漢字パーツをドロップ
    drop(incorrectdropTarget, incorrectCorrectPart);
    
    // ドロップする漢字パーツのドロップ前の親要素が重ねてドロップできるドロップターゲットなら
    if (parent.classList.contains("Center")) {
        // ドロップする漢字パーツのドロップ前の親要素内の漢字パーツ
        const children = Array.from(parent.children).filter(
            element => element.classList.contains("dragged-item-to-drop") ||
            element.classList.contains("dragged-item-to-drop-center"));
        if (children.length > 0) {  // ドロップターゲット内に漢字パーツがあれば
            // ドロップターゲット内の1番先頭の漢字パーツの透過を解除
            parent.children[0].className = "dragged-item-to-drop";
        }
    }

    hintsRemaining--;  // ヒントの残り回数を減算
    hint_btn.textContent = `ヒント(残り回数:${hintsRemaining})`;  // 残り回数をボタンに表示

    if (hintsRemaining === 0) {  // 残り回数が0なら
        hint_btn.disabled = true;  // ヒントボタンを無効化する
    }
});

// パスボタンのクリックイベント
pass_btn.addEventListener('click', () => {
    counter += 1;  // 四字熟語のカウンタをカウントアップ
    if (counter >= yojijukugo_json.length)  // カウンタが四字熟語の個数を超えたら
    {
        gameEnd();  // ゲーム終了
        return;
    }
    yojijukugo_display(counter);  // 四字熟語の表示
});

// ギブアップボタンのクリックイベント
give_up_btn.addEventListener('click', () => {
    gameEnd();  // ゲーム終了
});

// 難易度ごとにjsonファイルのURL(相対パス)を変数に保存
if (diff == "やさしい")
{
    url = 'yojijukugo_easy.json';  // イージーモードの四字熟語が書かれたJSONファイルのurl(相対パス)
}
else if (diff == "ふつう") {
    url = 'yojijukugo_normal.json';  // ノーマルモードの四字熟語が書かれたJSONファイルのurl(相対パス)
} 
else if (diff == "むずかしい") {
    url = 'yojijukugo_hard.json';  // ハードモードの四字熟語が書かれたJSONファイルのurl(相対パス)
}
//url = "test.json";
fetch(url)  // 四字熟語データの取得
.then((response) => {  // データが取得できたら
    return response.json();  // データをJSON形式のオブジェクトに変換
})
.then((result) => {  // JSON形式のオブジェクトに変数できたら
    title.textContent = '四字熟語漢字パズル';  // タイトルを表示
    yojijukugo_json = result;  // 四字熟語のJSONデータをグローバル変数に保存
    yojijukugo_display(counter);  // 最初の四字熟語の表示
})
.catch((e) => {  // 上記の処理中にエラーが発生したら
    window.alert(e);  //エラーをキャッチし表示
});