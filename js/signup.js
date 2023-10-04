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

function checkEmail(email) {

    const emailChrs = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailChrs.test(email);
}


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let firstNameValue = firstName.value
    let lastNameValue = lastName.value
    let usernameValue = username.value
    let emailValue = email.value
    let passwordValue = password.value
    let confirmPasswordValue = confirmPassword.value
    let error = false;

    if (firstNameValue === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please enter your First Name</li>";
    }else {
        if (firstNameValue.length < 4 ) {
            error = true;
            errorMessageList.innerHTML += "<li>The First name Must be more than 3 letters</li>";
        }
    }
    // ---------------------------------

    if (lastNameValue === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please enter your Last Name</li>";
    }else {
        if (lastNameValue.length < 4 ) {
            error = true;
            errorMessageList.innerHTML += "<li>The Last name Must be more than 3 letters</li>";
            
        }
    }
    // ---------------------------------
    if (usernameValue === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please enter a Username</li>";
    }else {
        if (usernameValue.length < 4 ) {       
            error = true;
            errorMessageList.innerHTML += "<li>The Username Must be more than 4 letters</li>";
        }
    }
    // ---------------------------------
    if (emailValue === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please enter your Email</li>";
    }else {
        if (checkEmail(emailValue) === true) {
            localStorage.setItem('email', email.value);
        } else {
            error = true;
            errorMessageList.innerHTML += "<li>Please enter a valid Email</li>";
        }
    }
    // --------------------------------
    if (passwordValue === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please enter a Password</li>";
    }else {
        if (passwordValue.length < 5 ) {
            error = true;
            errorMessageList.innerHTML += "<li>The Password Must be more than 6 letters</li>";
            console.log(passwordValue + passwordValue.length);
        }
    }

    if (passwordValue !== confirmPasswordValue) {
    if (confirmPasswordValue === "") {
        error = true;
        errorMessageList.innerHTML += "<li>Please confirm your Password</li>";
    }
        error = true;
        errorMessageList.innerHTML += "<li>Passwords do not match</li>";
    }

     // ---------------------------------

    if (error === false) {
        localStorage.setItem('firstName', firstNameValue);
        localStorage.setItem('lastName', lastNameValue);
        localStorage.setItem('username', usernameValue);
        localStorage.setItem('password', passwordValue);
        window.location ="signin.html"
    } else {
        errorMessageContainer.style.display = 'flex';
    }
});

closeErrorBtn.addEventListener("click", () => {
    errorMessageContainer.style.display = 'none';
    errorMessageList.innerHTML = "";
});



// ***********  PassWord Showing  *****************

function showPassWord() {
    let password = document.getElementById("password")
    let passwordEye = document.querySelector(".passwordEye")
    if  (password.type === "password") {
        password.type = "text"
        passwordEye.innerHTML = `<i class="fa-solid fa-eye-slash"></i> `
    }else {
        password.type = "password"
        passwordEye.innerHTML = `<i class="fa-solid fa-eye"></i> `
    }

}
function showConfirmPassWord() {
    let password = document.getElementById("confirmPassword")
    let passwordEye = document.querySelector(".confirmPasswordEye")
    if  (password.type === "password") {
        password.type = "text"
        passwordEye.innerHTML = `<i class="fa-solid fa-eye-slash"></i> `
    }else {
        password.type = "password"
        passwordEye.innerHTML = `<i class="fa-solid fa-eye"></i> `
    }

}