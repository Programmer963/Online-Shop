function registerUser(email, password){
    const users= JSON.parse(localStorage.getItem("users")) || []

    const existingUser = users.find(user => user.email === email)
    if(existingUser){
        alert("Пользователь с таким email-ом уже зарегистрирован")// TO DO
        return;
    }
        
    const newUsers = {email, password}
        
    users.push(newUsers)
        
    localStorage.setItem('users', JSON.stringify(users))
        
    alert("Регистрация успешно!")
    window.location.href = "login.html"
}

document.querySelector('.btnRegister').addEventListener('click', function(event){
    event.preventDefault()
    const email = document.getElementById('emailInput').value
    const password = document.getElementById('passwordInput').value        
    if(email.includes('@') && email != '' && password != ''){
        registerUser(email, password)
    }
    else{
        alert('Вы не праивльно ввели Логин или Пароль!')
    }
})