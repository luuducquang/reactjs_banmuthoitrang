import { useSetRecoilState } from "recoil";



interface Product {
    id: number;
    img: string;
    name: string;
    priceOld: number;
    price: number;
    color: string;
    amount: number;
    countryItem: string;
    state:boolean;
}

export function HandlerTotalCart(listProduct:any){
    if (listProduct && listProduct.length > 0) {
        var sum = 0;
        
        listProduct.forEach((value: any) => {
            var pri = value.price;
            var amo = value.amount;
            let total = pri * amo;
            sum += total;
        });
        return Number(sum);
    }
}

export function handlerdeleteCart(index:number,id:any, callback: (totalPrice: number) => void){
    let productListString = localStorage.getItem("productList");
    let dataCart = productListString
                ? JSON.parse(productListString)
                : [];

    let productBuyString = localStorage.getItem("listProductBuy");
    let dataBuy = productBuyString
                ? JSON.parse(productBuyString)
                : [];
    var idx = dataCart.findIndex(function (item:any) {
        return item.id === Number(id);
    });

    var idx2 = dataBuy.findIndex(function (item:any) {
        return item.id === Number(id);
    });
    dataCart.splice(idx, 1);
    dataBuy.splice(idx2, 1);
    localStorage.setItem("productList", JSON.stringify(dataCart));
    localStorage.setItem("listProductBuy", JSON.stringify(dataBuy));

    const trToDelete = document.querySelectorAll(`.item${index}`);
    if (trToDelete.length > 0) {
        trToDelete.forEach((element) => {
            element.remove();
        });
    }
    const totalPrice:any = HandlerTotalCart(dataCart);
    callback(totalPrice);
}

export function handlerInputCart(index:number,dataCart:any,dataBuy:any, callback: (totalPrice: number) => void){
    const inputs = document.querySelectorAll(
        ".amount"
    ) as NodeListOf<HTMLInputElement>;

    inputs.forEach((inp) => {
        inp.addEventListener("input", (event:any) => {
            let inputValue = parseInt(inp.value);

            if (isNaN(inputValue) || inputValue === 0) {
                inputValue = 1;
                inp.value = inputValue.toString();
            }

            dataBuy.forEach((value:any) => {
                if (value.id === dataCart[index].id) {
                    value.amount = inputValue;
                }
                localStorage.setItem(
                    "listProductBuy",
                    JSON.stringify(dataBuy)
                );
            });

            dataCart[index].amount = inputValue;

            localStorage.setItem("productList", JSON.stringify(dataCart));
            const totalPrice:any = HandlerTotalCart(dataCart);
                callback(totalPrice);
        });
    });
}


export function handlerMinusCart(index:number,dataCart:any,dataBuy:any, callback: (totalPrice: number) => void){
    const inputs = document.querySelectorAll(
        ".amount"
    ) as NodeListOf<HTMLInputElement>;

    var amount = dataCart[index].amount;
        if (amount > 1) {
            amount--;
            dataCart[index].amount = amount;
            dataBuy.map(function (value: Product) {
                if (value.id === dataCart[index].id) {
                    value.amount = amount;
                    localStorage.setItem(
                        "listProductBuy",
                        JSON.stringify(dataBuy)
                    );
                }
                return value;
            });
            localStorage.setItem("productList", JSON.stringify(dataCart));

            inputs[index].value = amount.toString();
            const totalPrice:any = HandlerTotalCart(dataCart);
                callback(totalPrice);
        }
}

export function handlerPlusCart(index:number,dataCart:any,dataBuy:any, callback: (totalPrice: number) => void){
        const inputs = document.querySelectorAll(
            ".amount"
        ) as NodeListOf<HTMLInputElement>;
    
        var amount = dataCart[index].amount;
            amount++;
            dataCart[index].amount = amount;
            dataBuy.map(function (value:any) {
                if (value.id === dataCart[index].id) {
                    value.amount = amount;
                    localStorage.setItem("listProductBuy", JSON.stringify(dataBuy));
                }
                return;
            });
            localStorage.setItem("productList", JSON.stringify(dataCart));
    
            inputs[index].value = amount.toString();
            const totalPrice:any = HandlerTotalCart(dataCart);
                callback(totalPrice);
}
