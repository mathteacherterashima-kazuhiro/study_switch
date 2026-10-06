// ========================================
// 勉強スイッチ
// JavaScript 完成版
// ========================================


// ========================================
// 状態
// ========================================

let selectedCategory = "";

let currentReason = "";

let timerSeconds = 300;

let timerInterval = null;

let totalStudySeconds = 0;


// ========================================
// カテゴリごとのデータ
// ========================================

const categoryData = {

    school: {

        name: "🏫 学校・クラス",

        opinions: [
            "学校で疲れているなら、勉強まで完璧にやろうとしなくても大丈夫。",
            "クラスのことが気になっていると、集中できないのは自然なこと。",
            "全部やろうとせず、「今日これだけ」というところまで小さくすると始めやすい。"
        ],

        solutions: [
            "まず机の上を30秒だけ片付ける",
            "一番簡単な問題を1問だけ解く",
            "学校で気になったことを紙に書いて、いったん頭から離す",
            "今日は最低限やることを1つだけ決める"
        ],

        action:
            "教科書かノートを開いて、今日やるページを1ページだけ決めよう。"
    },


    friend: {

        name: "👭 友達",

        opinions: [
            "友達とのことが気になっていると、勉強に集中しにくいのは普通。",
            "すぐに答えを出さなくても、一度距離を置いて考える時間があっていい。",
            "悩みながらでも少し勉強できたら、それだけで十分前進している。"
        ],

        solutions: [
            "気になっていることをメモに全部書き出す",
            "SNSやLINEを5分だけ閉じる",
            "簡単な暗記から始める",
            "勉強が終わってから友達のことを考える時間を作る"
        ],

        action:
            "スマホを伏せて、好きな教科の問題を1問だけやってみよう。"
    },


    love: {

        name: "❤️ 恋愛",

        opinions: [
            "好きな人のことが頭から離れないのは、それだけ大切に思っているということ。",
            "恋愛と勉強を完全に切り離す必要はないよ。少しずつ切り替えればOK。",
            "「勉強が終わったら考える」と時間を分けると集中しやすくなることもある。"
        ],

        solutions: [
            "好きな曲を1曲だけ聴いて気持ちを切り替える",
            "スマホを5分だけ別の場所に置く",
            "まず数学や英単語など短時間で終わるものをやる",
            "勉強後に恋愛について考える時間を作る"
        ],

        action:
            "今は5分だけ自分のための時間。英単語を5個だけ覚えてみよう。"
    },


    study: {

        name: "📚 勉強",

        opinions: [
            "やる気が出てから勉強するより、少し始めてからやる気が出てくることも多い。",
            "全部終わらせようとすると重く感じるから、最初の5分だけを目標にしてみよう。",
            "分からない問題があっても、今すぐ全部理解しなくて大丈夫。"
        ],

        solutions: [
            "問題を1問だけ解く",
            "英単語を5個だけ覚える",
            "教科書を1ページだけ読む",
            "分からない問題に印をつけて次へ進む",
            "25分ではなく、まず5分だけ集中する"
        ],

        action:
            "一番簡単そうな問題を1問選んで、タイマーをスタートしよう。"
    },


    family: {

        name: "👪 家族",

        opinions: [
            "家で嫌なことがあると、勉強する気持ちになれないのも無理はない。",
            "今すぐ家族との問題を解決しなくても大丈夫。",
            "自分でコントロールできる「次の5分」に集中してみよう。"
        ],

        solutions: [
            "イヤホンなどで少し環境を変える",
            "図書館や自習室など別の場所で勉強する",
            "家族のことを一度メモに書いて頭を整理する",
            "まず簡単な勉強から始める"
        ],

        action:
            "今いる場所でできる勉強を1つだけ選んで、5分だけやってみよう。"
    },


    club: {

        name: "🥲 部活",

        opinions: [
            "部活の後に疲れているのは当然。長時間やることだけが勉強じゃないよ。",
            "疲れている日は、暗記や復習など負担の少ない勉強でも十分。",
            "毎日100点を目指すより、少しでも続けることが大切。"
        ],

        solutions: [
            "英単語を5個だけ覚える",
            "今日学校で習ったことを3分だけ復習する",
            "宿題の一番簡単なところから始める",
            "眠い日は無理せず早めに休む",
            "明日の準備だけ先に終わらせる"
        ],

        action:
            "部活で疲れている日は、英単語5個だけ覚えて終了でもOK。"
    },


    sns: {

        name: "📱 SNS",

        opinions: [
            "SNSを見てしまうのは、意志が弱いからというより、つい気になる仕組みになっているから。",
            "スマホを完全に禁止するより、短い時間だけ距離を置く方がやりやすいこともある。",
            "「5分だけ見ない」と決めるだけでもスタートになる。"
        ],

        solutions: [
            "スマホを裏返して机から少し離す",
            "通知を5分だけオフにする",
            "タイマーをセットしてからスマホを置く",
            "勉強が終わったらSNSを見る時間を決める"
        ],

        action:
            "スマホを手の届かない場所に置いて、まず5分だけ勉強しよう。"
    },


    life: {

        name: "😴 生活・睡眠",

        opinions: [
            "睡眠不足のときに集中できないのは自然なこと。",
            "眠すぎる日は、無理に長時間勉強するより休むことも大切。",
            "生活リズムを少しずつ整えるだけでも勉強しやすくなる。"
        ],

        solutions: [
            "まず水を飲んで少し休憩する",
            "スマホを置いて早めに寝る",
            "朝に10分だけ勉強する",
            "寝る前は暗記系だけにする",
            "机に座る時間を短くして続ける"
        ],

        action:
            "今日は無理をしすぎず、できるなら英単語を5個だけ確認しよう。"
    },


    money: {

        name: "💰 お金",

        opinions: [
            "お金のことが気になると、他のことに集中しにくくなることもある。",
            "高校生なら、自分だけで全部解決しようとしなくてもいい。",
            "まずは今できることと、後で考えることを分けてみよう。"
        ],

        solutions: [
            "今月のお金の使い道をメモする",
            "欲しいものと必要なものを分ける",
            "お小遣いやバイト代の目標を決める",
            "家族など信頼できる人に相談する",
            "お金のことを整理したら勉強に戻る"
        ],

        action:
            "気になっているお金のことを1つだけメモして、今日は勉強を5分だけ進めよう。"
    },


    future: {

        name: "🤔 進路",

        opinions: [
            "将来のことが決まっていない高校生は珍しくないよ。",
            "今すぐ人生の答えを決める必要はない。",
            "進路を考えることと、今日の勉強を少し進めることは両立できる。"
        ],

        solutions: [
            "気になる学校を1校だけ調べる",
            "興味のある仕事を3つ書いてみる",
            "得意・苦手な教科を書き出す",
            "先生や家族に相談してみる",
            "今日は目の前の勉強を5分だけ進める"
        ],

        action:
            "将来の答えを出す必要はなし。今日は目の前の問題を1問だけ解こう。"
    }

};


// ========================================
// カテゴリ選択
// ========================================

function selectCategory(button) {

    const buttons =
        document.querySelectorAll(".category-btn");

    buttons.forEach(btn => {

        btn.classList.remove("selected");

    });


    button.classList.add("selected");


    selectedCategory =
        button.dataset.category;


    // 入力欄のプレースホルダーも変更

    const input =
        document.getElementById(
            "reason-text-input"
        );


    const data =
        categoryData[selectedCategory];


    if (data && input) {

        input.placeholder =
            `${data.name}について、今の気持ちを書いてみよう！\n例：なんとなくやる気が出ない…`;
    }
}


// ========================================
// 悩みを送信
// ========================================

function submitReason() {

    const input =
        document.getElementById(
            "reason-text-input"
        );


    if (!input) {
        return;
    }


    currentReason =
        input.value.trim();


    // カテゴリ未選択でも使えるようにする

    if (!selectedCategory) {

        selectedCategory = "study";
    }


    if (currentReason === "") {

        input.focus();

        alert(
            "まずは今の気持ちを一言だけでも書いてみてね！"
        );

        return;
    }


    const data =
        categoryData[selectedCategory];


    if (!data) {
        return;
    }


    // 悩みを表示

    const problemDisplay =
        document.getElementById(
            "problem-display"
        );


    if (problemDisplay) {

        problemDisplay.textContent =
            currentReason;
    }


    // 意見を表示

    renderOpinions(
        data.opinions
    );


    // 解決方法を表示

    renderSolutions(
        data.solutions
    );


    // まずやること

    const actionText =
        document.getElementById(
            "action-text"
        );


    if (actionText) {

        actionText.textContent =
            data.action;
    }


    // タイマーをリセット

    resetTimerDisplay();


    // 画面切り替え

    showScreen("screen-2");
}


// ========================================
// 意見を表示
// ========================================

function renderOpinions(opinions) {

    const container =
        document.getElementById(
            "opinions-container"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    opinions.forEach(
        (opinion, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "opinion-card";


            card.innerHTML = `
                <span class="opinion-number">
                    ${index + 1}
                </span>
                ${escapeHtml(opinion)}
            `;


            container.appendChild(card);
        }
    );
}


// ========================================
// 解決方法を表示
// ========================================

function renderSolutions(solutions) {

    const container =
        document.getElementById(
            "solutions-container"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    solutions.forEach(
        solution => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "solution-card";


            card.innerHTML = `
                <span class="solution-icon">
                    ✓
                </span>
                ${escapeHtml(solution)}
            `;


            container.appendChild(card);
        }
    );
}


// ========================================
// HTMLエスケープ
// ========================================

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ========================================
// タイマー開始
// ========================================

function startTimer() {

    if (timerInterval !== null) {
        return;
    }


    const startButton =
        document.getElementById(
            "start-btn"
        );


    const timerDisplay =
        document.getElementById(
            "timer"
        );


    if (timerSeconds <= 0) {

        timerSeconds = 300;
    }


    if (startButton) {

        startButton.disabled = true;

        startButton.textContent =
            "🔥 集中中…";
    }


    if (timerDisplay) {

        timerDisplay.classList.add(
            "running"
        );

        timerDisplay.classList.remove(
            "finished"
        );
    }


    timerInterval =
        setInterval(
            () => {

                timerSeconds--;

                updateTimerDisplay();


                if (timerSeconds <= 0) {

                    finishTimer();
                }

            },
            1000
        );
}


// ========================================
// タイマー終了
// ========================================

function finishTimer() {

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    totalStudySeconds += 300;


    timerSeconds = 0;


    updateTimerDisplay();


    const timerDisplay =
        document.getElementById(
            "timer"
        );


    if (timerDisplay) {

        timerDisplay.classList.remove(
            "running"
        );

        timerDisplay.classList.add(
            "finished"
        );
    }


    const startButton =
        document.getElementById(
            "start-btn"
        );


    if (startButton) {

        startButton.disabled = false;

        startButton.textContent =
            "🎉 5分達成！";
    }


    // 5分達成画面

    showScreen("screen-3");
}


// ========================================
// タイマー表示更新
// ========================================

function updateTimerDisplay() {

    const timer =
        document.getElementById(
            "timer"
        );


    if (!timer) {
        return;
    }


    const minutes =
        Math.floor(
            timerSeconds / 60
        );


    const seconds =
        timerSeconds % 60;


    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


// ========================================
// タイマーリセット
// ========================================

function resetTimerDisplay() {

    clearInterval(
        timerInterval
    );


    timerInterval = null;

    timerSeconds = 300;


    const timer =
        document.getElementById(
            "timer"
        );


    if (timer) {

        timer.textContent = "05:00";

        timer.classList.remove(
            "running"
        );

        timer.classList.remove(
            "finished"
        );
    }


    const startButton =
        document.getElementById(
            "start-btn"
        );


    if (startButton) {

        startButton.disabled = false;

        startButton.textContent =
            "🔥 5分だけやってみる！";
    }
}


// ========================================
// もう5分やる
// ========================================

function addMoreTime() {

    timerSeconds = 300;


    resetTimerDisplay();


    showScreen("screen-2");


    setTimeout(
        () => {

            startTimer();

        },
        150
    );
}


// ========================================
// やめる画面
// ========================================

function openAbortScreen() {

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    showScreen(
        "screen-abort"
    );
}


// ========================================
// タイマーに戻る
// ========================================

function resumeTimer() {

    showScreen(
        "screen-2"
    );


    setTimeout(
        () => {

            startTimer();

        },
        150
    );
}


// ========================================
// 記録して終了
// ========================================

function finishAndSave(completed) {

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    let studyMinutes = 0;


    if (completed) {

        studyMinutes = 5;

    } else {

        studyMinutes =
            Math.floor(
                totalStudySeconds / 60
            );
    }


    saveHistory(
        studyMinutes,
        completed
    );


    showRecordScreen(
        studyMinutes,
        completed
    );
}


// ========================================
// 履歴を保存
// ========================================

function saveHistory(
    minutes,
    completed
) {

    const history =
        getHistory();


    const data =
        categoryData[selectedCategory];


    const record = {

        date:
            new Date().toLocaleString(
                "ja-JP"
            ),

        category:
            data
                ? data.name
                : "📚 勉強",

        reason:
            currentReason,

        minutes:
            minutes,

        completed:
            completed
    };


    history.unshift(record);


    // 最大50件

    if (history.length > 50) {

        history.length = 50;
    }


    localStorage.setItem(
        "studySwitchHistory",
        JSON.stringify(history)
    );
}


// ========================================
// 履歴取得
// ========================================

function getHistory() {

    try {

        const saved =
            localStorage.getItem(
                "studySwitchHistory"
            );


        if (!saved) {

            return [];
        }


        return JSON.parse(saved);

    } catch (error) {

        return [];
    }
}


// ========================================
// 完了画面
// ========================================

function showRecordScreen(
    minutes,
    completed
) {

    const title =
        document.getElementById(
            "record-title"
        );


    const stamp =
        document.getElementById(
            "record-stamp"
        );


    const summary =
        document.getElementById(
            "record-summary"
        );


    const desc =
        document.getElementById(
            "record-desc"
        );


    if (completed) {

        if (title) {

            title.textContent =
                "5分やりきった！🎉";
        }


        if (stamp) {

            stamp.textContent =
                "🚀";
        }


        if (summary) {

            summary.textContent =
                "今日の自分、ちゃんと前に進んだよ。";
        }


        if (desc) {

            desc.textContent =
                "たった5分でも、始めたことがすごい。";
        }

    } else {

        if (title) {

            title.textContent =
                "おつかれさま！";
        }


       if (stamp) {
    stamp.textContent =
        "💡";
}


        if (summary) {

            summary.textContent =
                "今日はここまででも大丈夫。";
        }


        if (desc) {

            desc.textContent =
                "悩みを書いて、少しでも動けたことを記録できたよ。";
        }
    }


    showScreen(
        "screen-4"
    );
}


// ========================================
// 履歴画面
// ========================================

function openHistoryScreen() {

    renderHistory();

    showScreen(
        "screen-history"
    );
}


// ========================================
// 履歴を表示
// ========================================

function renderHistory() {

    const container =
        document.getElementById(
            "history-container"
        );


    if (!container) {
        return;
    }


    const history =
        getHistory();


    container.innerHTML = "";


    if (history.length === 0) {

        container.innerHTML = `
            <div class="history-empty">
                <span class="history-empty-icon">
                    💡
                </span>

                まだ記録がないよ。<br>
                最初の5分から始めてみよう！
            </div>
        `;

        return;
    }


    history.forEach(
        record => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "history-item";


            const status =
                record.completed
                    ? "🎉 5分達成"
                    : "💡 チャレンジ";


            item.innerHTML = `
                <div class="history-date">
                    ${escapeHtml(record.date)}
                </div>

                <div class="history-content">
                    ${escapeHtml(record.category)}
                    ・${status}
                </div>

                <div class="history-sub">
                    ${escapeHtml(record.reason)}
                </div>

                <div class="history-sub">
                    ⏱️ ${record.minutes}分取り組みました
                </div>
            `;


            container.appendChild(item);
        }
    );
}


// ========================================
// 画面切り替え
// ========================================

function showScreen(
    screenId
) {

    const screens =
        document.querySelectorAll(
            ".screen"
        );


    screens.forEach(
        screen => {

            screen.classList.remove(
                "active"
            );
        }
    );


    const target =
        document.getElementById(
            screenId
        );


    if (target) {

        target.classList.add(
            "active"
        );
    }


    // 上に戻す

    const content =
        document.querySelector(
            ".content"
        );


    if (content) {

        content.scrollTop = 0;
    }
}


// ========================================
// ホームに戻る
// ========================================

function resetApp() {

    clearInterval(
        timerInterval
    );


    timerInterval = null;


    selectedCategory = "";

    currentReason = "";

    timerSeconds = 300;

    totalStudySeconds = 0;


    const input =
        document.getElementById(
            "reason-text-input"
        );


    if (input) {

        input.value = "";

        input.placeholder =
            "例：テスト範囲が広すぎてやる気出ない\n英語の長文がめんどくさい\n部活で疲れて勉強する気になれない…";
    }


    const buttons =
        document.querySelectorAll(
            ".category-btn"
        );


    buttons.forEach(
        button => {

            button.classList.remove(
                "selected"
            );
        }
    );


    resetTimerDisplay();


    showScreen(
        "screen-1"
    );
}


// ========================================
// ページを開いたとき
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        resetTimerDisplay();

    }
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('ServiceWorker registered!', reg))
            .catch(err => console.log('ServiceWorker error:', err));
    });
}