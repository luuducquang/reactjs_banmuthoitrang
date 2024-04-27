if(!customerLocalStorage){
    window.location.href = './login.html'
}
  
function product(){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    var tbody = document.querySelector(".cart-shop table tbody")
    var content = ``
    listProduct.map(function(value,index){
        content += `<tr>
                        <td><input type="checkbox" ${value.state===true?'checked':''} data="${value.id}" class="item-checkbox" /></td>
                        <td style=" height:90px; display: flex; align-items: center;"><img style="width: 90px;padding: 10px;" src="${value.img}" alt="">
                        <span class="item">
                            <a style="text-decoration: none; " href="#!/product/${value.id}" style="font-size: 14px;" class="nameItem">${value.name}</a>
                            <div style="margin-top: 3px;text-align: left; display: flex; align-items: center;"><img style="width: 30px;" src="./assets/img/deal hot.jpg" alt=""><img style="width: 20px;" src="./assets/img/shipped.png" alt="">
                                <span style="margin-left: 10px;font-size: 12px;">Miễn phí đổi trả trong 7 ngày đầu tiên</span>
                            </div>
                        </span>
                    </span>
                        </td>
                        <td>${value.countryItem}</td>
                        <td style="font-size: 14px;">${value.size}</td>
                        <td>
                            <div style="display:flex;flex-direction: column; justify-content: center;">
                                <p><span style="font-size: 14px;color:#888888;text-decoration: line-through;" class="price-item">${value.priceOld.toLocaleString("DE-de")}</span><sup style="color:#888888;">đ</sup></p>
                                <p><span style="font-size: 14px; margin-left:5px;" class="price-item">${value.price.toLocaleString("DE-de")}</span><sup>đ</sup></p>
                            </div>
                        </td>
                        <td>
                            <div class="buy-amount" style="display: flex; justify-content: center;">
                                <span style="height: 30px; width: 30px;display: flex;justify-content: center;align-items: center; outline: none;border: 1px solid #ddd; cursor: pointer;" onclick="minus(${index})" class="ti-minus minus"></span>
                                <input style="width: 30px; height: 30px; text-align: center;border:none;    border: 1px solid #ddd; " type="text" value=${value.amount} min="1" onkeypress="input(${index})"  class="amount">
                                <span style="height: 30px; width: 30px;display: flex;justify-content: center;align-items: center; outline: none; border: 1px solid #ddd; cursor: pointer;" onclick="plus(${index})" class="ti-plus plus"></span>  
                            </div>
                        </td>
                        <td style="cursor: pointer;"><span style="font-size: 14px;" onclick="deleteCart(${index})" class="delete-cart">Xoá</span> </td>
                    </tr>`
    })
    tbody.innerHTML = content

    ItemBuy()
    totalcart()
}

product()

function ItemBuy(){
    var listProduct = JSON.parse(localStorage.getItem('productList'))
    var listCheckBox = document.querySelectorAll('.item-checkbox')
    var listProductBuy =  localStorage.getItem("listProductBuy") ? JSON.parse(localStorage.getItem("listProductBuy")) : []
    listCheckBox.forEach(function(e){
        e.addEventListener('click',function(event){
            const dataValue = event.target.getAttribute('data');
            var trElement = event.target.parentElement.parentElement
            var item = listProduct.filter(x=>x.id === Number(dataValue))
            var search = listProductBuy.find(x=>x.id === item[0].id)
            if(event.target.checked===true){
                if(!search){
                    listProductBuy.push({
                        id : item[0].id,
                        img : item[0].img,
                        name : item[0].name,
                        priceOld : item[0].priceOld,
                        price : item[0].price,
                        size : item[0].size,
                        amount : item[0].amount,
                        countryItem : item[0].countryItem
                    })
                }
                listProduct.map(function(value){
                    if(value.id === item[0].id){
                        value.state = true
                    }
                    return
                })
                localStorage.setItem("productList",JSON.stringify(listProduct))
                totalcart()  

            }
            else{
                var index = listProductBuy.findIndex(function(item) {
                    return item.id === Number(dataValue);
                });
                listProductBuy.splice(index,1)
                listProduct.map(function(value){
                    if(value.id === item[0].id){
                        value.state = false
                    }
                    return
                })
                localStorage.setItem("productList",JSON.stringify(listProduct))
                totalcart()
            }
            localStorage.setItem("listProductBuy",JSON.stringify(listProductBuy))
        })
    })

}

function ShopAmount(){
    var shopvalue = document.querySelector(".shopping .shop")
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    x = `<span class="value-cart">${listProduct.length}</span>` 
    shopvalue.innerHTML = x
    
}

ShopAmount()


function NullItem(){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []

    var nullProduct = document.querySelector(".null-product")
    if(listProduct.length ===0 ){
        nullProduct.style.display = 'block'
    }
    else{
        nullProduct.style.display = 'none'
    }
}

NullItem()

function deleteCart(index){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    var listProductBuy =  localStorage.getItem("listProductBuy") ? JSON.parse(localStorage.getItem("listProductBuy")) : []
    var idx = listProductBuy.findIndex(function(item){
        return item.id === listProduct[index].id
    })
    listProduct.splice(index,1)
    listProductBuy.splice(idx,1)
    localStorage.setItem("productList",JSON.stringify(listProduct))
    localStorage.setItem("listProductBuy",JSON.stringify(listProductBuy))
    product()
    ShopAmount()
    NullItem()

}


function totalcart(){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    var sum = 0;
    var listItemTrue = listProduct.filter(x=>x.state===true)
    
    listItemTrue.map((value,index)=>{
        var pri = value.price
        var amo = value.amount
        toltal = pri * amo
        sum+= toltal
        
    })
    var totalcartPrice = document.querySelector(".price-total-cart span")
    totalcartPrice.innerHTML = sum.toLocaleString("DE-de")
}

function plus(index){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    var listProductBuy =  localStorage.getItem("listProductBuy") ? JSON.parse(localStorage.getItem("listProductBuy")) : []
    var amount = listProduct[index].amount
    amount++
    listProduct[index].amount = amount
    listProductBuy.map(function(value){
        if(value.id === listProduct[index].id){
            value.amount = amount
        }
        return
    })
    localStorage.setItem("productList" , JSON.stringify(listProduct))
    localStorage.setItem("listProductBuy",JSON.stringify(listProductBuy))
    product()
    totalcart()
}

function minus(index){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    var listProductBuy =  localStorage.getItem("listProductBuy") ? JSON.parse(localStorage.getItem("listProductBuy")) : []
    var amount = listProduct[index].amount
    if(amount>1){
        amount--
        listProduct[index].amount = amount
        listProductBuy.map(function(value){
            if(value.id === listProduct[index].id){
                value.amount = amount
            }
            return
        })
        localStorage.setItem("productList" , JSON.stringify(listProduct))
        localStorage.setItem("listProductBuy",JSON.stringify(listProductBuy))
        product()
        totalcart()
    }
}
 

function input(index){
    var input = document.querySelectorAll(".amount")
    input.forEach(function(inp){
        inp.addEventListener("input",function(event){
            var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
            var listProductBuy =  localStorage.getItem("listProductBuy") ? JSON.parse(localStorage.getItem("listProductBuy")) : []
            inputValue = inp.value
            inputValue = parseInt(inputValue)
            if(isNaN(inputValue) || inputValue===0){
                inputValue = 1
                inp.value = inputValue
            }
            listProductBuy.map(function(value){
                if(value.id === listProduct[index].id){
                    value.amount = inputValue
                }
                return
            })
            listProduct[index].amount = inputValue
            localStorage.setItem("productList" , JSON.stringify(listProduct))
            localStorage.setItem("listProductBuy",JSON.stringify(listProductBuy))
            product()
            totalcart()
        })
    })

}


var goOrder = document.querySelector(".goOrder")
goOrder.addEventListener("click",()=>{
    var listProductBuy =  localStorage.getItem("listProductBuy") ? JSON.parse(localStorage.getItem("listProductBuy")) : []
    if(listProductBuy.length === 0){
        alert('Bạn chưa chọn sản phẩm để mua!')
        return
    }
    else{
        window.location = "#!/order"
    }
})
