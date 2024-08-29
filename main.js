const questions = [
    {
        question: "Which of the following is not a  primitive data type?",
        answers:[
            {text: "Boolean", correct: "false"},
            {text: "String", correct: "false"}, 
            {text: "Number", correct: "false"},
            {text: "Array", correct: "true"},
        ]
    },

    {
        question: "What is the purpose of the 'Array.prototype.reduce()'method? ",
        answers:[
            {text: "It creates a new object", correct: "false"},
            {text: "To sum all elements in an array", correct: "false"}, 
            {text: "To execute a reducer function on each element of the array", correct: "true"},
            {text: "To reduce the size of an array", correct: "false"},
        ]
    },

    {
        question: "What does the 'typeof' operator return for an array?",
        answers:[
            {text: "array", correct: "false"},
            {text: "object", correct: "true"}, 
            {text: "null", correct: "false"},
            {text: "undefined", correct: "false"},
        ]
    },

    {
        question: "Which method is used to remove the last elememnt from an array?",
        answers:[
            {text: "pop()", correct: "true"},
            {text: "push()", correct: "false"}, 
            {text: "shift()", correct: "false"},
            {text: "unshift()", correct: "false"},
        ]
    }
];

const questionElement = document.getElementById("Question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;   
let score = 0;

function startquiz(){   
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

  function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex  + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button); 
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
  }
  function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    } 
  }
  function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  function showScore(){
    resetState();
    questionElement.innerHTML = 
    `The score is ${score} out of ${questions.length};`
    nextButton.innerHTML = "Again";
    nextButton.style.display = 'block';
  }


  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
  }

  nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startquiz()
    }
  } )
  startquiz();