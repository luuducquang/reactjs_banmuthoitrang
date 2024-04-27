var checkname = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u
var checktel = /^[0-9]{10}$/
var checkcity = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u
var checkprovince = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u
var checkcommune = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u
var checkaddress = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u

if(!customerLocalStorage){
    window.location.href = './login.html'
}

// console.log(checkprovince.test('Qooo'));
function paynow(){
    var nameDelivery = document.querySelector(".name-delivery").value
    var warname = document.querySelector('.war-name')
    if(nameDelivery=="" || !checkname.test(nameDelivery)){
        warname.style.display = 'inline-block'
    }
    else{
        warname.style.display = 'none'
    }


    var telDelivery = document.querySelector(".tel-delivery").value
    var wartel = document.querySelector('.war-tel')
    if(telDelivery=="" || !checktel.test(telDelivery)){
        wartel.style.display = 'inline-block'
    }
    else{
        wartel.style.display = 'none'
    }


    // var provinceDelivery = document.querySelector(".province-delivery").value
    // var warprovince = document.querySelector('.war-province')
    // if(provinceDelivery=="" || !checkprovince.test(provinceDelivery)){
    //     warprovince.style.display = 'inline-block'
    // }
    // else{
    //     warprovince.style.display = 'none'
    // }

    // // var cityDelivery = document.querySelector(".city-delivery").value
    // var warcity = document.querySelector('.war-city')
    // if(cityDelivery=="" || !checkcity.test(cityDelivery)){
    //     warcity.style.display = 'inline-block'
    // }
    // else{
    //     warcity.style.display = 'none'
    // }

    // // var communeDelivery = document.querySelector(".input-commune").value
    // var warcommune = document.querySelector('.war-commune')
    // if(communeDelivery=="" || !checkcommune.test(communeDelivery)){
    //     warcommune.style.display = 'inline-block'
    // }
    // else{
    //     warcommune.style.display = 'none'
    // }

    var addresDelivery = document.querySelector(".input-address").value
    var waraddress = document.querySelector('.war-address')
    if(addresDelivery=="" || !checkaddress.test(addresDelivery)){
        waraddress.style.display = 'inline-block'
    }
    else{
        waraddress.style.display = 'none'
    }

    return false
}

var back = document.querySelector('.back')
back.addEventListener('click',function(){
    window.location = '#!/'
})

function ShopAmount(){
    var shopvalue = document.querySelector(".shopping .shop")
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    x = `<span class="value-cart">${listProduct.length}</span>` 
    shopvalue.innerHTML = x
    
}

ShopAmount()

function product(){
    var buyNowProduct =  localStorage.getItem("buyNowProduct") ? JSON.parse(localStorage.getItem("buyNowProduct")) : []
    var tbody = document.querySelector(".order-cart-shop table tbody")
    var content = ``
    content += `<tr>
                        <td style=" display: flex; align-items: center;"><img style="width: 20%;padding: 10px;" src="${buyNowProduct.img}" alt=""><a style="text-decoration: none;" href="#!/product/${buyNowProduct.id}" style="font-size: 14px;" class="nameItem">${buyNowProduct.name}</a></td>
                        <td style="font-size: 14px;">${buyNowProduct.size}</td>
                        <td>
                            <div style="display:flex; justify-content: center;">
                                <p><span style="font-size: 14px;color:#888888;text-decoration: line-through;" class="price-item">${buyNowProduct.priceOld.toLocaleString("DE-de")}</span><sup style="color:#888888;">đ</sup></p>
                                <p><span style="font-size: 14px; margin-left:5px;" class="price-item">${buyNowProduct.price.toLocaleString("DE-de")}</span><sup>đ</sup></p>
                            </div>
                        </td>
                        <td>
                            <div class="buy-amount" style="display: flex; justify-content: center;">
                                <span style="height: 30px; width: 30px;display: flex;justify-content: center;align-items: center; outline: none;border: 1px solid #ddd; cursor: pointer;" onclick="minus()" class="ti-minus minus"></span>
                                <input style="width: 30px; height: 30px; text-align: center;    border: 1px solid #ddd; " type="text" value=${buyNowProduct.amount} min="1" onkeypress="input()"  class="amount">
                                <span style="height: 30px; width: 30px;display: flex;justify-content: center;align-items: center; outline: none;border: 1px solid #ddd; cursor: pointer;" onclick="plus()" class="ti-plus plus"></span>  
                            </div>
                        </td>
                    </tr>`
    
    tbody.innerHTML = content
    totalcart()
}

product()


var totalProduct

function totalcart(){
    var buyNowProduct =  localStorage.getItem("buyNowProduct") ? JSON.parse(localStorage.getItem("buyNowProduct")) : []
    var sum = 0;
    var pri = buyNowProduct.price
    var amo = buyNowProduct.amount
    toltal = pri * amo 
    sum+= toltal
    
    var totalcartPrice = document.querySelector(".totalPriceCart")
    totalcartPrice.innerHTML = sum.toLocaleString("DE-de")
    var transportOrder = document.querySelector('.transport_oder').innerHTML
    var totalAll = document.querySelector(".total_all")
    totalAll.innerHTML = (parseInt(transportOrder)*1000+sum).toLocaleString('DE-de')
    totalProduct = sum + transportOrder *1000
}

function plus(){
    var buyNowProduct =  localStorage.getItem("buyNowProduct") ? JSON.parse(localStorage.getItem("buyNowProduct")) : []
    var amount = buyNowProduct.amount
    amount++
    buyNowProduct.amount = amount
    localStorage.setItem("buyNowProduct" , JSON.stringify(buyNowProduct))
    product()
}

function minus(index){
    var buyNowProduct =  localStorage.getItem("buyNowProduct") ? JSON.parse(localStorage.getItem("buyNowProduct")) : []
    var amount = buyNowProduct.amount
    if(amount>1){
        amount--
        buyNowProduct.amount = amount
        localStorage.setItem("buyNowProduct" , JSON.stringify(buyNowProduct))
        product()
    }
}
 

function input(){
    var input = document.querySelector(".amount")
    
    input.addEventListener("input",function(event){
            var buyNowProduct =  localStorage.getItem("buyNowProduct") ? JSON.parse(localStorage.getItem("buyNowProduct")) : []
            inputValue = input.value
            inputValue = parseInt(inputValue)
            if(isNaN(inputValue) || inputValue===0){
                inputValue = 1
                input.value = inputValue
            }
            buyNowProduct.amount = inputValue
            localStorage.setItem("buyNowProduct" , JSON.stringify(buyNowProduct))
            product()
        })
    

}
