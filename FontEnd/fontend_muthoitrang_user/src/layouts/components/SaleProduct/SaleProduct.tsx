import { useEffect, useState } from "react";
import { FaShop } from "react-icons/fa6";
import { FaEye, FaShippingFast, FaStar } from "react-icons/fa";
import classNames from "classnames/bind";

import styles from "./SaleProduct.module.scss";
import { getProductHome } from "../../../services/home.services";
import { apiImage } from "../../../constant/api";

const cx = classNames.bind(styles);

function SaleProduct() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadProductSale() {
            let response = await getProductHome({
                page: 1,
                pageSize: 40,
            });

            setData(response.data);
        }
        loadProductSale();
    }, []);
    return (
        <div className={cx("sale")}>
            <h2 className={cx("type")}>TRANG CHỦ</h2>
            {data.map(function (value: any, index: any) {
                return (
                    <div key={index} className={cx("home-product-item")}>
                        <a
                            className={cx("linkproduct")}
                            href={"/detail/" + value.maSanPham}
                        >
                            <div className={cx("home-product-item_img")}>
                                <img
                                    style={{ minHeight: 200, minWidth: 100 }}
                                    src={apiImage + value.anhDaiDien}
                                    alt=""
                                />
                            </div>
                            <h4 className={cx("home-product-item_name")}>
                                {value.tenSanPham}
                            </h4>
                            <span className={cx("decrip-item")}>
                                {value.moTa}
                            </span>
                        </a>
                        <span className={cx("sale-up")}>
                            {(100 - (value.giaGiam / value.gia) * 100).toFixed(
                                0
                            )}{" "}
                            <sup>%</sup>
                            <div>Giảm</div>
                        </span>
                        <div className={cx("home-product-item_price")}>
                            <span
                                className={cx(
                                    "home-product-item_price_current"
                                )}
                            >
                                {value.giaGiam.toLocaleString("DE-de")}
                                <sup>đ</sup>
                            </span>
                            <span className={cx("home-product-item_price_old")}>
                                {value.gia.toLocaleString("DE-de")}
                                <sup>đ</sup>
                            </span>
                        </div>
                        <div className={cx("home-icon-recommend")}>
                            {value.danhGia > 0 ? (
                                <>
                                    <span>
                                        {value.danhGia > 0
                                            ? value.danhGia.toFixed(1)
                                            : ""}
                                    </span>
                                    <FaStar className={cx("star-gold")} />

                                    <span className={cx("m03")}>|</span>
                                </>
                            ) : (
                                ""
                            )}
                            <span title="Đã bán">
                                <FaShop className={cx("mtop3")} />
                            </span>
                            <span
                                title="Đã bán"
                                className={cx("amount-product")}
                            >
                                {value.luotBan}
                            </span>
                            <span
                                className={cx(
                                    "fa-solid fa-truck-fast free-ship"
                                )}
                            />
                            <FaShippingFast className={cx("free-ship")} />
                        </div>
                        <div className={cx("view")}>
                            <FaEye className={cx("mr3")} />
                            {value.luotXem.toLocaleString("DE-de")}
                        </div>
                        <div className={cx("country")}>{value.xuatXu}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default SaleProduct;
