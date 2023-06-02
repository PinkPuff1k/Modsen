const data = {
    questions: [
        {
            question: 'How many planets are in the solar system?',
            answers: [
                '8', '9', '10', '11',
            ],
            validAnswer: 1
        },
        {
            question: 'What is the freezing point of water?',
            answers: [
                '-6', '-5', '0', '1',
            ],
            validAnswer: 3
        },
        {
            question: 'What is the longest river in the world?',
            answers: [
                'Nile', 'Amazon', 'Yangtze', 'Thames'
            ],
            validAnswer: 1
        },
        {
            question: 'How many chromosomes are in the human genome?',
            answers: [
                '42', '44', '46', '47'
            ],
            validAnswer: 4
        },
        {
            question: 'What is the capital of Canada?',
            answers: [
                'Toronto', 'Ottawa', 'Vancouver', 'Calgary'
            ],
            validAnswer: 2
        },
    ]
}

const dom = {
    progress: {
        questionNumber: document.getElementById('question-number'),
        totalQuestions: document.getElementById('total-questions'),
    },
    question: document.getElementById('question'),
    answers: document.getElementById('answers'),
    next: document.getElementById('next'),
}

let questionsCount = data.questions.length;
let step = 0;

dom.next.onclick = () => {
    step = step < questionsCount ? step + 1 : step;
    renderQuiz(questionsCount, step);

}

function renderQuiz(total, step) {
    render(total, step);
    if (step < total) {
        const answers = data.questions[step].answers;
        const answersHtml = buildAnswers(answers);
        renderQuestion();
        renderAnswers(answersHtml)
    };
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
        const html = `<div class="quiz__answer" data-id ${idx+1}>${answer}</div>`;
        answersHTML.push(html);
    });
    return answersHTML.join('');
}
const answersHTML = buildAnswers(data.questions[0].answers);

function renderAnswers(htmlString) {
    dom.answers.innerHTML = htmlString;
}

dom.answers.onclick = (event) => {
    const target = event.target;
    if (target.classList.contains('quiz__answer')) {
        const answerNumber = target.id;
        console.log(answerNumber);
    }
}

function checkAnswer(step, answerId) {
    const validAnswerId = data.questions[step].validAnswer;
    return validAnswerId == answerId
}