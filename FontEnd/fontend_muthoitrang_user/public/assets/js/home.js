function ShopAmount(){
    var shopvalue = document.querySelector(".shopping .shop")
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    x = `<span class="value-cart">${listProduct.length}</span>` 
    shopvalue.innerHTML = x
    
}

ShopAmount()

document.title = 'Trang chủ'



