var fast = document.querySelector(".fast")
var fastColor = document.querySelectorAll(".fast-color")


window.addEventListener("scroll",function(){
    var x = window.pageYOffset
    if(x>568){
        fast.style.display='block'
    }
    else{
        fast.style.display='none'
    }
    for (let i = 0; i < fastColor.length; i++) {
        if(x>360 & x<1400){
            fastColor[0].style.color = '#ff7d2d'
        }
        if(x>1400 & x<2324){
            fastColor[1].style.color = "#ff7d2d"
        }
        if(x>2325 & x<2760){
            fastColor[2].style.color = "#ff7d2d"
        }
        if(x>2790){
            fastColor[3].style.color = "#ff7d2d"
        }
        else{
            fastColor[i].style.color = ""
        }
        
        
    }

})


var btnfast = document.querySelectorAll(".fast i")
btnfast.forEach(function(button){
    button.addEventListener("click",function(){
        document.documentElement.scrollTop = button.dataset.scroll
    })
})