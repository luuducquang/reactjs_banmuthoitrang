
// --------------------GO TO TOP---------------------------


var goToTop = document.querySelector(".go-to-top")

window.addEventListener("scroll",function(){
    var x = window.pageYOffset
    if(x>568){
        goToTop.style.display='block'
    }
    else{
        
        goToTop.style.display='none'

    }

    // console.log(x);
})

goToTop.addEventListener("click",function(){
    document.documentElement.scrollTop = 0
})
