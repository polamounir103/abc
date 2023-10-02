let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
let submitBtn = document.getElementById('submitBtn');
let errorMessageContainer = document.querySelector(".errorMessageContainer");
let errorMessageList = document.querySelector(".errorMessageList");
let closeErrorBtn = document.querySelector(".closeErrorBtn");


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let error = false;
    if (firstName.value === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please enter your First Name</li>";
    }
    if (lastName.value === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please enter your Last Name</li>";
    }
    if (username.value === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please enter a Username</li>";
    }
    if (email.value === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please enter your Email</li>";
    }
    if (password.value === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please enter a Password</li>";
    }
    if (confirmPassword.value === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please confirm your Password</li>";
    }
    if (password.value !== confirmPassword.value) {
        error = true;
        errorMessageList.innerHTML += "<li>Passwords do not match</li>";
    }

    if (error === false) {
        localStorage.setItem('firstName', firstName.value);
        localStorage.setItem('lastName', lastName.value);
        localStorage.setItem('username', username.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('password', password.value);
        window.location ="signin.html"
    } else {
        errorMessageContainer.style.display = 'flex';
    }
});

closeErrorBtn.addEventListener("click", () => {
    errorMessageContainer.style.display = 'none';
    errorMessageList.innerHTML = "";
});
