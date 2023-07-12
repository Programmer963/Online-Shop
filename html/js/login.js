function loginUser(email, password){
    const users = JSON.parse(localStorage.getItem("users")) || []

    const authenticatedUser = users.find(user => user.email === email && user.password === password)

    if(authenticatedUser){
        alert('Вход выполнен успешно!')
        localStorage.setItem('login', JSON.stringify(users))
        window.location.href = "catalog.html"
    }
    else{
        alert('Неверный Логин или Пароль')
    }
}

document.querySelector('.btn').addEventListener('click', function(event){
    event.preventDefault()

    const email = document.getElementById('emailInput').value
    const password = document.getElementById('passwordInput').value
    
    loginUser(email, password)
})