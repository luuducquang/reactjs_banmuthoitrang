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

export function handlerCheckedCart(dataCart: any, dataBuy: any, callback: (totalPrice: number) => void) {
    const listCheckBox = document.querySelectorAll(".item-checkbox");

    listCheckBox.forEach((checkbox) => {
        checkbox.addEventListener("click", (event) => {
            const dataValue = checkbox.getAttribute("datatype");

            const item = dataCart.find(
                (x: Product) => x.id === Number(dataValue)
            );
            if (item) {
                const search = dataBuy.find(
                    (x: Product) => x.id === item.id
                );

                if (
                    event.target instanceof HTMLInputElement &&
                    event.target.checked
                ) {
                    if (!search) {
                        dataBuy.push({
                            id: item.id,
                            img: item.img,
                            name: item.name,
                            priceOld: item.priceOld,
                            price: item.price,
                            color : item.color,
                            amount: item.amount,
                            countryItem: item.countryItem,
                        });
                    }
                    dataCart.forEach((value: any) => {
                        if (value.id === item.id) {
                            value.state = true;
                        }
                    });
                } else {
                    const index = dataBuy.findIndex((item: any) => item && item.id === Number(dataValue));
                    if (index !== -1) {
                        dataBuy.splice(index, 1);
                        dataCart.forEach((value: any) => {
                            if (value.id === Number(dataValue)) {
                                value.state = false;
                            }
                        });
                    }
                }

                localStorage.setItem(
                    "productList",
                    JSON.stringify(dataCart)
                );
                localStorage.setItem(
                    "listProductBuy",
                    JSON.stringify(dataBuy)
                );

                const totalPrice:any = HandlerTotalCart(dataCart);
                callback(totalPrice);
            }
        });
    });
}

export function HandlerTotalCart(listProduct:any){
    if (listProduct && listProduct.length > 0) {
        var sum = 0;
        var listItemTrue = listProduct.filter((x: Product) => x.state === true);
        
        listItemTrue.forEach((value: any) => {
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
