const userToken = localStorage.getItem("userToken");
const currentUser = localStorage.getItem("currentUser");

function getUsersFromLocalStorage() {
  const users = localStorage.getItem("users");
  if (!users) {
    return [];
  }
  return JSON.parse(users);
}

function saveUserToLocalStorage(user) {
  let users = getUsersFromLocalStorage();
  users = [...users, user];
  localStorage.setItem("users", JSON.stringify(users));
}

const logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  location.reload();
});

if (userToken && currentUser) {
  document.querySelector(".register").style.display = none;
  document.querySelector(".login").style.display = none;
}

function showMessage(messageType, messageContent){
  const messageBox = document.querySelector('#message');
  messageBox.classList.add(messageType);
  messageBox.style.height = '50px';
  messageBox.innerText = messageContent;

  setTimeout(() =>{
    messageBox.innerText = '';
    messageBox.style.height = '';

    setTimeout(() =>{
      messageBox.classList.remove(messageType);
    }, 50)
  }, 2000);
}
let index = Math.floor(Math.random() * quiz.length);
let attempt = 0;
let question = quiz;

let timerBoxSpan = document.querySelector('.timerBoxSpan');
let questionBox = document.querySelector('.questionBox');
let optionBox = document.querySelectorAll('.optionBox span');



function timer(){
    let totalTime = 200;
    let min = 0;
    let sec = 0;
    let counter = 0;

    let timer = setInterval(function(){
        counter++;
        min = Math.floor((totalTime - counter) / 60);
        sec = totalTime - (min * 60) - counter
        timerBoxSpan.innerText = (min + ":" + sec);
        if(timer === totalTime){
            clearInterval(timer);
        }
        
    }, 1000);

    //Print Question
    printQuestion(index);

}
timer();

function printQuestion(i){
    questionBox.innerText = question[i].question;
    optionBox[0].innerText= question[i].option[0]
    optionBox[1].innerText= question[i].option[1]
    optionBox[2].innerText= question[i].option[2]
    optionBox[3].innerText= question[i].option[3]
    

}
