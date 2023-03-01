const question = localStorage.getItem("selectQuestion");
const nextBtn = document.querySelector(".next");
const submitBtn = document.querySelector(".submit");
console.log(question);
let currentQuestionIndex = 0;
let questions;
let totalQuestions;
let score = 0
let wrongAnswerCount = 0
function getQuestions() {
  fetch(`../questions/${question}.json`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      questions = result;
      totalQuestions = result.length
      generateTemplate(questions[currentQuestionIndex]);
    });
}

function generateQuestion() {
  let question = questions[currentQuestionIndex];
  console.log(question);
}
nextBtn.addEventListener("click", () => {
  checkAnswer(questions[currentQuestionIndex])
  if (currentQuestionIndex >= questions.length - 1) return;
  currentQuestionIndex += 1;
  if(currentQuestionIndex === totalQuestions -1){
    nextBtn.classList.add('hidden')
    submitBtn.classList.remove('hidden')
  }
  generateQuestion();
  generateTemplate(questions[currentQuestionIndex]);
});

submitBtn.addEventListener('click', ()=> {
  checkAnswer(questions[currentQuestionIndex])
  localStorage.setItem('result', JSON.stringify({score,wrongAnswerCount}))
  location.href = '../pages/result.html'
})

function checkAnswer(question){
  const selectedOption = document.querySelector('input[name="option"]:checked').value
  console.log(selectedOption)
  if (selectedOption === question.answer){
    score++
  }else {
    wrongAnswerCount++
  }
}


function generateTemplate(question) {
  const template = `
       <p class="question">${question.question}</p>

       ${question.options.map((option) => {
         return `
               <label for=${option}>
                <input type="radio" name="option" id=${option} value=${option}>${option}
               </label>
               
           `;
       }).join('')}`;
  document.querySelector(".questionContainer").innerHTML = template;
}

getQuestions();
generateQuestion();
