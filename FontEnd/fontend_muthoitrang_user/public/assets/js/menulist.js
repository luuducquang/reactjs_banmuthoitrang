var body = document.querySelector("body")
var btnList = document.querySelector(".list")
var menuleft = document.querySelector(".menu-left")
var search = document.querySelector(".wrap")
var user = document.querySelector(".imgUser img")
var OptionMenu = menu.style.display = 'none'
btnList.addEventListener("click",function(){
    if(OptionMenu == 'none'){
        menuleft.style.animation = ''
        setTimeout(function(){
            menuleft.style.animation = 'upslide .3s linear'
            OptionMenu = menu.style.display = 'block'
        },100)
        return
    }
    else{
        OptionMenu = menu.style.display = 'none'
    }
})

body.addEventListener("click",function(){
    OptionMenu = menu.style.display = 'none'
})

search.addEventListener("click",function(){
    OptionMenu = menu.style.display = 'none'
})

user.addEventListener("click",function(){
    OptionMenu = menu.style.display = 'none'
})

menuleft.addEventListener("click",function(event){
    event.stopPropagation()
})

btnList.addEventListener("click",function(event){
    event.stopPropagation()
})

function hide(){
    OptionMenu = menu.style.display = 'none'
}