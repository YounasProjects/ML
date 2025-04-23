let mcqs = [];
let currentScore = 0;
let totalAttempted = 0;
let totalCorrect = 0;

fetch('full_ml_mcqs.json')
    .then(response => response.json())
    .then(data => {
        mcqs = shuffleArray(data);
    });

function loadMode(mode) {
    currentScore = 0;
    totalAttempted = 0;
    totalCorrect = 0;

    const content = document.getElementById('content');
    content.innerHTML = '';
    updateScore();

    mcqs.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        const question = document.createElement('p');
        question.innerHTML = `<strong>Q${index + 1}:</strong> ${item.question}`;
        card.appendChild(question);

        const shuffledOptions = shuffleArray([...item.options]);
        shuffledOptions.forEach(option => {
            const opt = document.createElement('div');
            opt.innerText = option;
            opt.style.cursor = "pointer";
            opt.style.margin = "6px 0";
            opt.style.padding = "6px";
            opt.style.borderRadius = "4px";
            opt.onmouseover = () => opt.style.background = "#e0f2f1";
            opt.onmouseout = () => opt.style.background = "";

            if (mode === 'learn') {
                if (option === item.answer) {
                    opt.style.color = 'green';
                    opt.style.fontWeight = 'bold';
                }
            } else {
                opt.onclick = () => {
                    if (opt.style.color) return; // Prevent multiple clicks
                    totalAttempted++;
                    if (option === item.answer) {
                        opt.style.color = 'green';
                        opt.style.fontWeight = 'bold';
                        currentScore++;
                        totalCorrect++;
                    } else {
                        opt.style.color = 'red';
                    }
                    updateScore();
                };
            }
            card.appendChild(opt);
        });

        content.appendChild(card);
    });
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function updateScore() {
    let scoreBoard = document.getElementById('scoreBoard');
    if (!scoreBoard) {
        scoreBoard = document.createElement('div');
        scoreBoard.id = 'scoreBoard';
        scoreBoard.style.margin = '10px';
        scoreBoard.style.fontSize = '18px';
        scoreBoard.style.color = '#006064';
        document.getElementById('content').before(scoreBoard);
    }
    let percent = totalAttempted ? ((totalCorrect / totalAttempted) * 100).toFixed(1) : 0;
    scoreBoard.innerHTML = `Score: ${totalCorrect} / ${totalAttempted} (${percent}%)`;
}