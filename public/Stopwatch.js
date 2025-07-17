const time = document.getElementById('time');

// 開始時間
let startTime;
// 停止時間
let stopTime = 0;
// タイムアウトID
let timeoutID;

var startflag = false;  // ゲーム開始フラグ

let questionStartTime = null;     // この問題の開始時刻
let questionTimeoutID = null;     // 30秒制限用のタイマー

let timelimit = 30000;  // 制限時間(30秒)

// 時間を表示する関数
function displayTime() {
    const currentTime = new Date(Date.now() - startTime + stopTime);    // 今の時刻から開始時刻を引いて経過時間を計算、stopTime加えて累積時間
    const h = String(currentTime.getHours()-9).padStart(2, '0');        // タイムゾーンの影響で9時（日本）から始まるので、補正のため -9
    const m = String(currentTime.getMinutes()).padStart(2, '0');
    const s = String(currentTime.getSeconds()).padStart(2, '0');
    const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

    time.textContent = `${h}:${m}:${s}.${ms}`;
    timeoutID = setTimeout(displayTime, 10);    // 10ミリ秒ごとに再帰的に displayTime() を呼び出してリアルタイムに更新
}

// ストップウォッチ開始
function timestart(){
    if (startflag) return; // すでに開始していたら何もしない
    
    timereset();

    startflag = true;
    startTime = Date.now(); // 時間計測開始
    displayTime();
}

// ストップウォッチ停止
function timestop(){
    clearTimeout(timeoutID);
    stopTime += (Date.now() - startTime);   // 現在の経過時間を stopTime に追加
}

// ストップウォッチリセット
function timereset(){
    time.textContent = '00:00:00.000';
    startTime = null;
    stopTime = 0;

    startflag = false;
}

// 問題の制限時間カウント関数
function startQuestionTimer() {
    questionStartTime = Date.now(); // 時間計測開始

    // 30秒後にタイムアウト処理を実行
    questionTimeoutID = setTimeout(() => {
        alert("時間切れです！");
        // タイムアウト処理（次の問題へ進む、正解不正解の処理など）

    }, timelimit);
}

// 回答時間からスコアを出す関数
function submitAnswer() {
    // タイムアウトをキャンセル
    clearTimeout(questionTimeoutID);

    // 経過時間を計算
    const answerTime = Date.now() - questionStartTime;
    const seconds = (answerTime / 1000).toFixed(2);

    var score = 0;  // 得点
    
    // 経過時間からスコアを設定
    if (seconds <= 10) {
        score = 3;
    }
    else if(seconds <= 20) {
        score = 2;
    }
    else {
        score = 1;
    }

    alert(`あなたの回答時間は ${seconds} 秒 得点は ${ score } 点です`);

    return score;
}