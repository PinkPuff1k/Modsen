const data = {
    questions: [
        {
            question: 'How many planets are in the solar system?',
            answers: [
                '8', '9', '10', '11',
            ],
            validAnswer: '8'
        },
        {
            question: 'What is the freezing point of water?',
            answers: [
                '-6', '-5', '0', '1',
            ],
            validAnswer: '0'
        },
        {
            question: 'What is the longest river in the world?',
            answers: [
                'Nile', 'Amazon', 'Yangtze', 'Thames'
            ],
            validAnswer: 'Nile'
        },
        {
            question: 'How many chromosomes are in the human genome?',
            answers: [
                '42', '44', '46', '47'
            ],
            validAnswer: '46'
        },
        {
            question: 'What is the capital of Canada?',
            answers: [
                'Toronto', 'Ottawa', 'Vancouver', 'Calgary'
            ],
            validAnswer: 'Ottawa'
        },
    ]
}

const dom = {
    progress: {
        questionNumber: document.getElementById('question-number'),
        totalQuestions: document.getElementById('total-questions'),
    },
    question: document.getElementById('question'),
    title: document.getElementById('title'),
    answers: document.getElementById('answers'),
    next: document.getElementById('next'),
    result: {
        resultBlock: document.getElementById('result'),
        validAnswers: document.getElementById('valid-answers'),
        count: document.getElementById('result-total-questions'),
    }
}

let questionsCount = data.questions.length;
let step = 0;
let validAnswersCount = 0;

dom.next.onclick = () => {
    step = step < questionsCount ? step + 1 : step;
    renderQuiz(questionsCount, step);

}

function renderQuiz(total, step) {
    render(total, step);
    if (step + 1 == total) {
        changeButtonOnResult()
    }
    if (step < total) {
        const answers = data.questions[step].answers;
        const answersHtml = buildAnswers(answers);
        renderQuestion();
        renderAnswers(answersHtml)
        isDisableButton(true)
    } else if (step == total) {
        renderResults();
    }

}
renderQuiz(questionsCount, step)

function render(total, step) {
    dom.progress.questionNumber.innerHTML = step + 1;
    dom.progress.totalQuestions.innerHTML = total;
}

function renderQuestion() {
    dom.question.innerHTML = data.questions[step].question
}

function buildAnswers(answers) {
    const answersHTML = [];
    answers.forEach((answer, idx) => {
        const html = `<div class="quiz__answer" data-id ${idx + 1}>${answer}</div>`;
        answersHTML.push(html);
    });
    return answersHTML.join('');
}
const answersHTML = buildAnswers(data.questions[0].answers);

function renderAnswers(htmlString) {
    dom.answers.innerHTML = htmlString;
}

dom.answers.onclick = (event) => {
    const target = event.target
    if (target.classList.contains("quiz__answer")) {
        const answerNumber = target.textContent;
        const isValid = checkAnswer(step, answerNumber);
        const answerClass = isValid
            ? 'quiz__answer_valid'
            : 'quiz__answer_invalid'
        target.classList.add(answerClass)
        isDisableButton(false)
        validAnswersCount = isValid ? validAnswersCount + 1 : validAnswersCount
    }
}

function checkAnswer(step, answer) {
    const validAnswer = data.questions[step].validAnswer;
    return validAnswer == answer
}



function isDisableButton(isDisable) {
    if (isDisable) {
        dom.next.classList.add('quiz__btn_disable')
    } else {
        dom.next.classList.remove('quiz__btn_disable')
    }
}


function changeButtonOnResult() {
    dom.next.innerText = 'Result'
    dom.next.dataset.result = 'result'
}

function renderResults() {
    dom.answers.style.display = 'none'
    dom.question.style.display = 'none'
    dom.title.style.display = 'none'
    dom.next.innerText = 'Again'
    dom.result.resultBlock.style.display = 'block'
    dom.result.validAnswers.innerHTML = validAnswersCount
    dom.result.count.innerHTML = questionsCount
    
}
