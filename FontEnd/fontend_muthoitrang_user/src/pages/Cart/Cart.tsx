import { Link } from "react-router-dom";
import { FaLongArrowAltRight, FaStar } from "react-icons/fa";
import classNames from "classnames/bind";

import styles from "./Cart.module.scss";
import { useEffect, useState } from "react";
import { getProductRecomend } from "../../services/cart.service";
import { apiImage } from "../../constant/api";
import { FaShop } from "react-icons/fa6";
import ItemCart from "../../layouts/components/ItemCart";
import { useRecoilValue } from "recoil";
import { totalPriceCartState } from "../../constant/recoil";

const cx = classNames.bind(styles);

function Cart() {
    const [dataRecomend, setDataRecomend] = useState([]);

    const totalPriceCart: number = useRecoilValue(totalPriceCartState);

    useEffect(() => {
        async function loadData() {
            let resRecomend = await getProductRecomend({
                page: 1,
                pageSize: 10,
            });
            setDataRecomend(resRecomend.data);
        }
        loadData();
    }, []);

    return (
        <div className={cx("content")}>
            <div className={cx("cart-shop")}>
                <div className={cx("type")}>
                    <Link to="/">Trang chủ</Link>
                    <FaLongArrowAltRight className={cx("arrow-item")} />
                    <Link to="/cart">Giỏ hàng</Link>
                </div>
                <form action="#">
                    <ItemCart />
                    <div className={cx("pay")}>
                        <div
                            style={{ textAlign: "right" }}
                            className={cx("price-total-cart")}
                        >
                            <p style={{ fontWeight: "normal", fontSize: 16 }}>
                                Tiền tạm tính:{" "}
                                <span
                                    style={{ color: "#ee4d2d" }}
                                    className={cx("totalPriceCart")}
                                >
                                    {totalPriceCart.toLocaleString("DE-de")}
                                </span>
                                <sup style={{ color: "#ee4d2d" }}>đ</sup>
                            </p>
                        </div>
                        {totalPriceCart === 0 ? (
                            ""
                        ) : (
                            <Link
                                to={"/order"}
                                className={cx("goOrder")}
                                style={{ cursor: "pointer" }}
                            >
                                Tiến hành đặt hàng
                            </Link>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cart;
