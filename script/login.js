const loginForm = document.querySelector(".login_form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  if (!username || !password) {
    return showMessage('error', 'All Fields Required');
  }

  loginUser(username, password);
});

function loginUser(username, password) {
  const users = getUsersFromLocalStorage();

  const currentUser = users.find((user) => {
    return user.username === username && user.password === password;
  });

  if (currentUser === undefined) {
    return showMessage('error', 'Invalid Account Details');
  }
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.setItem("token", currentUser.username);
  showMessage('success', `Welcome ${currentUser.username}`)
  setTimeout(() =>{
    location.href = "./quiz.html";
  }, 3000);
}
