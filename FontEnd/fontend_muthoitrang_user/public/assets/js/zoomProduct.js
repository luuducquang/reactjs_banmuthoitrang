
var miror = document.querySelector(".miror")
var img = document.querySelector(".product-item-img img")
miror.style.display='none'


img.addEventListener("mouseleave",function(e){
    miror.style.display='none'

})



img.addEventListener("mousemove",function(e){
    img.style.cursor = 'none'
    miror.style.display='block' 
    
    miror.style.top =  e.clientY +'px'
    miror.style.left = e.clientX +'px'
    
    let w = e.target.offsetWidth;
    let h = e.target.offsetHeight;
    
    let mouseWidthImg = e.pageX - e.target.offsetLeft
    let mouseHeightImg = e.pageY - e.target.offsetTop
    
    let percentX = (mouseWidthImg / w)*100
    let percentY = (mouseHeightImg / h)*100
    
    miror.style.backgroundPositionX = percentX - 30 +'%'
    miror.style.backgroundPositionY = percentY -42 +'%'
    
    miror.style.backgroundImage = `url(${img.src})`
    console.log('a');   
})



