let username = document.getElementById("username")
let password = document.getElementById("password")
let submitBtn = document.getElementById("submitBtn")
const getUsername = localStorage.getItem("username")
const getPassword = localStorage.getItem("password")
const getEmail = localStorage.getItem("email")

let errorMessageContainer = document.querySelector(".errorMessageContainer");
let errorMessageList = document.querySelector(".errorMessageList");
let closeErrorBtn = document.querySelector(".closeErrorBtn");




// function inputLabel () {
//     let inputName = document.querySelectorAll(".inputName")

//     inputName.forEach (function (element){
//         element.setAttribute("class" , "inputName inputNameActive")
//     })

const inputNames = document.querySelectorAll(".inputName");
const inputFields = document.querySelectorAll(".inputContainer input");

inputFields.forEach((inputField, index) => {
    inputField.addEventListener("focus", () => {
        inputNames[index].classList.add("inputNameActive");
    });

    inputField.addEventListener("blur", () => {
        if (inputField.value.trim() === "") {
            inputNames[index].classList.remove("inputNameActive");
        }
    });
});


console.log(getEmail, getPassword, getUsername)
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (username.value === getUsername || username.value === getEmail ) {
        if (password.value === getPassword) {
            window.location ="index.html"
        }else {
            errorMessageContainer.style.display = 'flex';
            errorMessageList.innerHTML += "<li>Please Check inputs</li>";
        }
    }else {
        errorMessageContainer.style.display = 'flex';
        errorMessageList.innerHTML += "<li>Please Check inputs</li>";
    }
})

closeErrorBtn.addEventListener("click", () => {
    errorMessageContainer.style.display = 'none';
    errorMessageList.innerHTML = "";
});