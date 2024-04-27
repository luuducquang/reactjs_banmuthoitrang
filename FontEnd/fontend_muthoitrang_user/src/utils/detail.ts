interface Product {
    name: string;
}

export function addToCart(item: any,amount:any) {
    let productListString = localStorage.getItem("productList");
    let listProduct = productListString ? JSON.parse(productListString) : [];

    let search = listProduct.find((x: Product) => x.name === item.tenSanPham);
    
    if(search){
        search.amount = Number(search.amount) + Number(amount)
        localStorage.setItem("productList",JSON.stringify(listProduct))
        return true;
    }
    else{
        listProduct.push({  
            id : item.maSanPham,
            img : item.anhDaiDien,
            name : item.tenSanPham,
            priceOld : item.gia,
            price : item.giaGiam,
            color : item.mauSac,
            amount : amount,
            countryItem :item.xuatXu,
            state: false
        })
        localStorage.setItem("productList",JSON.stringify(listProduct))
        return false;
    }
}