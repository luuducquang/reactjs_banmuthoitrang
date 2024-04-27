function checkname(){
    var name = document.querySelector(".name").value
    var warning = document.querySelector(".warning-name")
    var check = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u
    if(check.test(name)===false || name ===""){
        warning.style.display = "block"
    }
    else{
        warning.style.display = "none"
    }
}

function checktel() {
    var phoneNumber = document.querySelector(".tel").value;
    var warning = document.querySelector(".warning-tel");
    var check = /^[0-9]{10,}$/;
    if (check.test(phoneNumber) === false || phoneNumber === "") {
        warning.style.display = "block";
    } else {
        warning.style.display = "none";
    }
}


function checkemail(){
    var email = document.querySelector(".email").value
    var warning = document.querySelector(".warning-email")
    var check = /^[a-z]+[a-zA-Z0-9_]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}$/
    if(check.test(email)===false || email ===""){
        warning.style.display = "block"
    }
    else{
        warning.style.display = "none"
    }
}


function checkinputuser(){
    var warning = document.querySelector(".warning-user")
    var inputUser = document.querySelector(".user").value
    var check = /^[a-zA-Z]+[a-zA-Z0-9]+$/
    if(inputUser=="" || check.test(inputUser)===false){
        warning.style.display= 'block'
    }
    else{
        warning.style.display= 'none'
    }
}


function checkinputpass(){
    var warningPass = document.querySelector(".warning-pass")
    var warningRePass = document.querySelector(".warning-repass")
    var inputPass = document.querySelector(".input-pass").value
    var inputRePass = document.querySelector(".input-repass").value
    var check = /^[a-zA-Z0-9]+[a-zA-Z0-9@_]+$/
    if(inputPass=="" || check.test(inputPass)===false){
        warningPass.style.display= 'block'
    }
    else{
        warningPass.style.display= 'none'
    }

    if(inputRePass=="" || check.test(inputRePass)===false){
        warningRePass.style.display= 'block'
    }
    else{
        warningRePass.style.display= 'none'
    }
    if(inputRePass!=inputPass){
        warningRePass.style.display= 'block'
    }
}

document.title = 'Đăng ký tài khoản'