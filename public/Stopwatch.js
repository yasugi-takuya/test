const time = document.getElementById('time');  // 経過時間表示用div要素

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
    // 経過時間の時、分、秒を取得し、2桁0埋めにする。
    const h = String(currentTime.getHours()-9).padStart(2, '0');        // タイムゾーンの影響で9時（日本）から始まるので、補正のため -9
    const m = String(currentTime.getMinutes()).padStart(2, '0');
    const s = String(currentTime.getSeconds()).padStart(2, '0');
    // 経過時間のミリ秒を取得し、3桁0埋めにする。
    const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

    time.textContent = `${h}:${m}:${s}.${ms}`;  // 経過時間を表示
    timeoutID = setTimeout(displayTime, 10);    // 10ミリ秒ごとに再帰的に displayTime() を呼び出してリアルタイムに更新
}

// ストップウォッチ開始
function timestart(){
    if (startflag) return; // すでに開始していたら何もしない
    
    timereset();  // ストップウォッチリセット

    startflag = true;  // フラグを開始に設定
    startTime = Date.now(); // 時間計測開始
    displayTime();  // 時間を表示
}

// ストップウォッチ停止
function timestop(){
    clearTimeout(timeoutID);  // displayTimeの再帰呼び出しをストップ
    stopTime += (Date.now() - startTime);   // 現在の経過時間を stopTime に追加
}

// ストップウォッチリセット
function timereset(){
    time.textContent = '00:00:00.000';  // 表示時間を0に戻す
    startTime = null;  // 開始時刻を初期化
    stopTime = 0;

    startflag = false;  // フラグを開始前に設定
}

// 問題の制限時間カウント関数
function startQuestionTimer() {
    questionStartTime = Date.now(); // 問題の回答を開始した時間を取得
    let counter = 30;  // タイマーで測る時間(秒)
    const interval = 1000;  // カウントダウンのインターバル(ミリ秒)

    time.textContent = `残り時間:${String(counter).padStart(2, '0')}秒`;  // 残り秒数表示
    // 1秒ごとに残り秒数を表示し、30秒後にタイムアウト処理を実行
    questionTimeoutID = setInterval(() => {
        counter--;  // 残り秒数をカウントダウン
        time.textContent = `残り時間:${String(counter).padStart(2, '0')}秒`;  // 残り秒数表示

        // 残り秒数が0になったら
        if (counter <= 0) {
            clearInterval(questionTimeoutID);  // カウントダウン終了
            nextQuestion("×", 300, "red");  // 次の問題に進む
        }
    }, interval);
    /*
    questionStartTime = Date.now(); // 時間計測開始
    const seconds = 30;  // 問題の制限時間(秒)
    const interval = 10;  // カウントダウンのインターバル(ミリ秒)
    const endTime = questionStartTime + seconds * 1000;  // 計測終了時間を取得

    // 30秒後にタイムアウト処理を実行
    questionTimeoutID = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, endTime - now); // 残り時間(ms)
        const sec = (timeLeft / 1000).toFixed(3);   // 秒に変換、小数点以下3桁

        time.textContent = sec;

        if (timeLeft <= 0) {
            clearInterval(questionTimeoutID);
            time.textContent = "0.000";
            // タイムアウト処理（次の問題へ進む、正解不正解の処理など）
            nextQuestion("×");  // 次の問題に進む
        }
    }, interval);*/

    /*
    questionStartTime = Date.now(); // 時間計測開始
    // 30秒後にタイムアウト処理を実行
    questionTimeoutID = setTimeout(() => {
        //alert("時間切れです！");
        // タイムアウト処理（次の問題へ進む、正解不正解の処理など）
        nextQuestion("×");  // 次の問題に進む
    }, timelimit);
    */
}

// 回答時間からスコアを出す関数
function submitAnswer() {
    // タイムアウトをキャンセル
    clearInterval(questionTimeoutID);

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

    //alert(`あなたの回答時間は ${seconds} 秒 得点は ${ score } 点です`);

    return score;
}