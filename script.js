const questions = [
    {
        question: "Which is the largest animal on earth?",
        answers:[
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Hippo", correct: false},
        ]
    },

    {
        question: "Which is the smallest country on the earth?",
        answers:[
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Sri Lanka", correct: false},
        ]
    },

    {
        question: "Which is the largest desert on the earth?",
        answers:[
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },

    {
        question: "Which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },

    {
        question: "Who is known as the father of computers?",
        answers:[
            {text: "Charles Babbage", correct: true},
            {text: "Alan Turing", correct: false},
            {text: "John von Neumann", correct: false},
            {text: "Bill Gate", correct: false},

        ]
    },

    {
        question: "What is the capital city of Japan?",
        answers:[
            {text: "Seoul", correct: false},
            {text: "Beijing", correct: false},
            {text: "Tokyo", correct: true},
            {text: "Bangkok", correct: false},

        ]
    },

    {
        question: "Which is the largest planet in our solar system?",
        answers:[
            {text: "Earth", correct: false},
            {text: "Mars", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Saturn", correct: false},

        ]
    },

    {
        question: "Which planet is known as the 'Red Planet'?",
        answers:[
            {text: "Earth", correct: false},
            {text: "Jupiter", correct: false},
            {text: "Mars", correct: true},
            {text: "Venus", correct: false},

        ]
    },

    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers:[
            {text: "William shakespeare", correct: true},
            {text: "Mark Twain", correct: false},
            {text: "J.k. Rowling", correct: false},
            {text: "Charles Dickens", correct: false},

        ]
    },

    {
        question: "Which animal is known as the King of the Jungle?",
        answers:[
            {text: "Tiger", correct: false},
            {text: "Elephant", correct: false},
            {text: "Lion", correct: true},
            {text: "Bear", correct: false},

        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    } else{
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})


startQuiz();