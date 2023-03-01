const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const fullname = form.fullname.value
    const username = form.username.value
    const password = form.password.value

    if (!fullname || !username || !password) {
        return alert('All Field Required')
    }
    if (!isUserExists(username)) {
        saveUserToLocalStorage({fullname, username, password})
        alert(`Welcome ${fullname}`)
        setTimeout(()=>{
            location.href = './login.html'
        },2000)
    } else {
        alert('username already exist')
    }

})
function isUserExists(username) {
    const users = getUsersFromLocalStorage()
    const user = users.find(user => {
        return user.username === username
    })
    return user ? true : false
}

 function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users')
    if (!users) {
        return []
    }
    return JSON.parse(users)
    
 }

 function saveUserToLocalStorage(user) {
    let users = getUsersFromLocalStorage()
    users = [...users, user]
    localStorage.setItem('users', JSON.stringify(users))
 }
