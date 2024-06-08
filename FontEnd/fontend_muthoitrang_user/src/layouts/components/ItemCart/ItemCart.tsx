import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { apiImage } from "../../../constant/api";
import classNames from "classnames/bind";

import styles from "./ItemCart.module.scss";
import { Link } from "react-router-dom";
import {
    HandlerTotalCart,
    handlerInputCart,
    handlerMinusCart,
    handlerPlusCart,
    handlerdeleteCart,
} from "../../../utils/cart";
import { useSetRecoilState } from "recoil";
import { cartState, totalPriceCartState } from "../../../constant/recoil";

const cx = classNames.bind(styles);

interface Product {
    id: number;
    img: string;
    name: string;
    priceOld: number;
    price: number;
    size: string;
    amount: number;
    countryItem: string;
}

function ItemCart() {
    const [dataCart, setDataCart] = useState<Product[]>([]);

    const [dataBuy, setDataBuy] = useState<Product[]>([]);

    function minus(index: number) {
        handlerMinusCart(index, dataCart, dataBuy, (totalPrice) => {
            setTotalPriceCart(totalPrice);
        });
    }

    function plus(index: number) {
        handlerPlusCart(index, dataCart, dataBuy, (totalPrice) => {
            setTotalPriceCart(totalPrice);
        });
    }

    function input(index: number) {
        handlerInputCart(index, dataCart, dataBuy, (totalPrice) => {
            setTotalPriceCart(totalPrice);
        });
    }

    const setCartValue = useSetRecoilState(cartState);

    const setTotalPriceCart = useSetRecoilState(totalPriceCartState);

    function deleteCart(index: number, id: any) {
        handlerdeleteCart(index, id, (totalPrice) => {
            setTotalPriceCart(totalPrice);
        });

        let productListString = localStorage.getItem("productList");
        let listProduct = productListString
            ? JSON.parse(productListString)
            : [];
        setCartValue(listProduct);
    }

    useEffect(() => {
        function loadDataCart() {
            let productListString = localStorage.getItem("productList");
            let listProduct = productListString
                ? JSON.parse(productListString)
                : [];
            let productBuyString = localStorage.getItem("listProductBuy");
            let listProductBuy = productBuyString
                ? JSON.parse(productBuyString)
                : [];
            setDataCart(listProduct);
            HandlerTotalCart(listProduct);
            setDataBuy(listProductBuy);
            let price: any = HandlerTotalCart(listProduct);
            setTotalPriceCart(price);
        }
        loadDataCart();
    }, []);
    return (
        <div>
            {dataCart.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <td>Sản Phẩm</td>
                            <td>Xuất Xứ</td>
                            <td>Màu Sắc</td>
                            <td>Đơn Giá</td>
                            <td>Số Lượng</td>
                            <td>Chọn</td>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCart.map((value: any, index: any) => (
                            <tr key={index} className={`item${index}`}>
                                <td
                                    style={{
                                        height: "90px",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "90px",
                                            padding: "10px",
                                        }}
                                        src={apiImage + value.img}
                                        alt=""
                                    />
                                    <span className="item">
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                                fontSize: "14px",
                                            }}
                                            to={`/detail/${value.id}`}
                                            className={cx("nameItem")}
                                        >
                                            {value.name}
                                        </Link>
                                        <div
                                            style={{
                                                marginTop: "3px",
                                                textAlign: "left",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: "30px",
                                                }}
                                                src="./assets/img/deal hot.jpg"
                                                alt=""
                                            />
                                            <img
                                                style={{
                                                    width: "20px",
                                                }}
                                                src="./assets/img/shipped.png"
                                                alt=""
                                            />
                                            <span
                                                style={{
                                                    marginLeft: "10px",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                Miễn phí đổi trả trong 7 ngày
                                                đầu tiên
                                            </span>
                                        </div>
                                    </span>
                                </td>
                                <td>{value.countryItem}</td>
                                <td style={{ fontSize: "14px" }}>
                                    {value.color}
                                </td>
                                <td>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <p>
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#888888",
                                                    textDecoration:
                                                        "line-through",
                                                }}
                                                className="price-item"
                                            >
                                                {value.priceOld
                                                    ? value.priceOld.toLocaleString(
                                                          "DE-de"
                                                      )
                                                    : ""}
                                            </span>
                                            <sup
                                                style={{
                                                    color: "#888888",
                                                }}
                                            >
                                                đ
                                            </sup>
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    marginLeft: "5px",
                                                }}
                                                className="price-item"
                                            >
                                                {value.price
                                                    ? value.price.toLocaleString(
                                                          "DE-de"
                                                      )
                                                    : ""}
                                            </span>
                                            <sup>đ</sup>
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className="buy-amount"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <FiMinus
                                            style={{
                                                height: "30px",
                                                width: "30px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                outline: "none",
                                                border: "1px solid #ddd",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => minus(index)}
                                            className="ti-minus minus"
                                        />
                                        <input
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                            }}
                                            type="text"
                                            defaultValue={value.amount}
                                            min="1"
                                            onKeyPress={() => input(index)}
                                            className="amount"
                                        />
                                        <FiPlus
                                            style={{
                                                height: "30px",
                                                width: "30px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                outline: "none",
                                                border: "1px solid #ddd",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => plus(index)}
                                            className="ti-plus plus"
                                        />
                                    </div>
                                </td>
                                <td style={{ cursor: "pointer" }}>
                                    <span
                                        style={{ fontSize: "14px" }}
                                        onClick={() =>
                                            deleteCart(index, value.id)
                                        }
                                        className="delete-cart"
                                    >
                                        Xoá
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div
                    style={{
                        textAlign: "center",
                        padding: "20px 0 10px",
                    }}
                    className={cx("null-product")}
                >
                    Không có sản phẩm nào trong giỏ hàng
                </div>
            )}
        </div>
    );
}

export default ItemCart;
