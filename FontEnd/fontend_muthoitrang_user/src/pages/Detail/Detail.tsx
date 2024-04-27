import { Link, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { FaLongArrowAltRight, FaStar } from "react-icons/fa";
import {
    FaPhoneVolume,
    FaRotate,
    FaShieldHalved,
    FaShop,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";
import { PiGearSixFill } from "react-icons/pi";
import { Image } from "antd";

import styles from "./Detail.module.scss";
import {
    getProductById,
    getProductRecomend,
} from "../../services/detail.service";
import { apiImage } from "../../constant/api";
import MessageProduct from "../../components/MessageProduct";
import { addToCart } from "../../utils/detail";
import { useSetRecoilState } from "recoil";
import { cartState } from "../../constant/recoil";

const cx = classNames.bind(styles);

type DataParam = {
    id: string;
};

type DataProduct = {
    tenDanhMuc: string;
    tenSanPham: string;
    anhDaiDien: string;
    gia: number;
    giaGiam: number;
    soLuong: number;
    luotXem: number;
    luotBan: number;
    xuatXu: string;
    mauSac: string;
    chiTiet: string;
    danhGia: number;
};

function Detail() {
    let { id } = useParams<DataParam>();

    const [data, setData] = useState<DataProduct>({
        tenDanhMuc: "",
        tenSanPham: "",
        anhDaiDien: "",
        gia: 0,
        giaGiam: 0,
        soLuong: 0,
        luotXem: 0,
        luotBan: 0,
        xuatXu: "",
        mauSac: "",
        chiTiet: "",
        danhGia: 0,
    });

    const [dataRecomend, setDataRecomend] = useState([]);

    const [showMessage, setShowMessage] = useState(false);

    const [typeMessage, setTypeMessage] = useState(Boolean);

    const [amountAdd, setAmountAdd] = useState(1);

    const setCartValue = useSetRecoilState(cartState);

    const handleAddProductToCart = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2500);

        const mes = addToCart(data, amountAdd);
        setTypeMessage(mes);

        let productListString = localStorage.getItem("productList");
        let listProduct = productListString
            ? JSON.parse(productListString)
            : [];
        setCartValue(listProduct);
    };

    const handleAmountProductMinus = () => {
        if (amountAdd > 1) {
            setAmountAdd(amountAdd - 1);
        }
    };
    const handleAmountProductPlus = () => {
        setAmountAdd(amountAdd + 1);
    };

    async function loadData(id: any) {
        let res = await getProductById(id);
        setData(res);

        let resRecomend = await getProductRecomend({
            page: 1,
            pageSize: 10,
            TenDanhMuc: res.tenDanhMuc,
        });
        setDataRecomend(resRecomend.data);
    }

    useEffect(() => {
        loadData(id);
    }, [id]);

    return (
        <div className={cx("content")}>
            {showMessage &&
                (typeMessage === true ? (
                    <MessageProduct
                        title="Sản phẩm đã có trong giỏ hàng"
                        display={"block"}
                    />
                ) : (
                    <MessageProduct
                        title="Sản phẩm đã được thêm vào giỏ hàng"
                        display={"block"}
                    />
                ))}
            <div className={cx("product")}>
                <div className={cx("type")}>
                    <Link to="/">Trang chủ</Link>
                    <FaLongArrowAltRight className={cx("arrow-item")} />
                    <Link to={"/category/1/" + data.tenDanhMuc}>
                        {data.tenDanhMuc}
                    </Link>
                    <FaLongArrowAltRight className={cx("arrow-item")} />
                    <Link to={"/detail/" + id}>{data.tenSanPham}</Link>
                </div>
                <div className={cx("product-item")}>
                    <div className={cx("product-left")}>
                        <span className={cx("product-item-img")}>
                            <img src={apiImage + data.anhDaiDien} alt="" />
                        </span>
                        {/* <div className={cx("miror")} /> */}
                        {/* <div className={cx("but")}>
                            <span>
                                <i
                                    ng-click="Prev()"
                                    className={cx("fa-solid fa-angle-left")}
                                />
                            </span>
                            <span>
                                <i
                                    ng-click="Next()"
                                    className={cx("fa-solid fa-angle-right")}
                                />
                            </span>
                        </div> */}
                    </div>
                    <div className={cx("product-right")}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div
                                            className={cx("product-item-name")}
                                        >
                                            {data.tenSanPham}
                                        </div>
                                    </td>
                                </tr>
                                {/* <tr>
                  <td>
                      <div class="prouct-item-star-rating">
                          <span class="fa-solid fa-star star-gold"></span>
                          <span class="fa-solid fa-star star-gold"></span>
                          <span class="fa-solid fa-star star-gold"></span>
                          <span class="fa-solid fa-star star-gold"></span>
                          <span class="fa-solid fa-star "></span>
                          <a href="">99 đánh giá</a>
                      </div>
                  </td>
              </tr> */}
                                <tr>
                                    <td>
                                        <div
                                            className={cx("product-item_price")}
                                        >
                                            <span
                                                className={cx(
                                                    "product-item_price_old"
                                                )}
                                            >
                                                {data.gia
                                                    ? data.gia.toLocaleString(
                                                          "DE-de"
                                                      )
                                                    : ""}
                                            </span>
                                            <sup style={{ fontWeight: 600 }}>
                                                đ
                                            </sup>
                                            <span
                                                className={cx(
                                                    "product-item_price_current"
                                                )}
                                            >
                                                {data.giaGiam
                                                    ? data.giaGiam.toLocaleString(
                                                          "DE-de"
                                                      )
                                                    : ""}
                                            </span>
                                            <sup style={{ fontWeight: 600 }}>
                                                đ
                                            </sup>
                                            <span className={cx("VAT")}>
                                                (Đã bao gồm VAT)
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={cx("status")}>
                                            Tình trạng :{" "}
                                            <span
                                                style={{
                                                    color:
                                                        data.soLuong > 0
                                                            ? "#33CC00"
                                                            : "#FF3300",
                                                }}
                                            >
                                                {data.soLuong > 0
                                                    ? "Còn hàng"
                                                    : "Hết hàng"}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Lượt xem :{" "}
                                        {data.luotXem.toLocaleString("DE-de")}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Đã bán :{" "}
                                        {data.luotBan.toLocaleString("de-DE")}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className={cx("origin")}>
                                            Xuất xứ :{" "}
                                        </span>
                                        <span className={cx("country-origin")}>
                                            {data.xuatXu}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div
                                            className={cx(
                                                "product-item-capacity"
                                            )}
                                        >
                                            <span
                                                className={cx("capacity-name")}
                                            >
                                                Màu sắc : {"  "}
                                            </span>
                                            <span className={cx("size")}>
                                                {data.mauSac}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div
                                            className={cx(
                                                "product-amount-item"
                                            )}
                                        >
                                            Số lượng :
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div
                                            className={cx("buy-amount-product")}
                                            style={{ display: "flex" }}
                                        >
                                            <FiMinus
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    outline: "none",
                                                    backgroundColor: "#ddd",
                                                    border: "none",
                                                    cursor: "pointer",
                                                }}
                                                className={cx("minus")}
                                                onClick={
                                                    handleAmountProductMinus
                                                }
                                            />
                                            <input
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    textAlign: "center",
                                                    border: "none",
                                                }}
                                                type="text"
                                                min={1}
                                                className={cx("amount")}
                                                value={amountAdd.toString()}
                                                onChange={(e) => {
                                                    const value =
                                                        e.target.value;
                                                    if (/^\d*$/.test(value)) {
                                                        setAmountAdd(
                                                            parseInt(value)
                                                        );
                                                    } else {
                                                        setAmountAdd(1);
                                                    }
                                                }}
                                            />
                                            <GoPlus
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    outline: "none",
                                                    backgroundColor: "#ddd",
                                                    border: "none",
                                                    cursor: "pointer",
                                                }}
                                                className={cx("plus")}
                                                onClick={
                                                    handleAmountProductPlus
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button
                                            className={cx("add-item")}
                                            onClick={handleAddProductToCart}
                                        >
                                            THÊM VÀO GIỎ HÀNG
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={cx("call")}>
                                            <FaPhoneVolume />
                                            <span className={cx("Hotline")}>
                                                Hotline :{" "}
                                                <a
                                                    href="tel:012.3456.789"
                                                    title="tel:012.3456.789"
                                                >
                                                    <span
                                                        style={{
                                                            color: "blue",
                                                        }}
                                                    >
                                                        012.3456.789
                                                    </span>
                                                </a>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* ------------Information------------- */}
            <div className={cx("information")}>
                <div className={cx("information-left")}>
                    <div
                        className={cx("information-product")}
                        dangerouslySetInnerHTML={{ __html: data.chiTiet }}
                    />
                </div>
                <div className={cx("information-right")}>
                    <div className={cx("recommend")}>
                        <h2>Sản phẩm liên quan</h2>
                        {dataRecomend &&
                            dataRecomend.map(function (value: any, index: any) {
                                return (
                                    <div
                                        key={index}
                                        className={cx("product-recommend")}
                                    >
                                        <Link to={"/detail/" + value.maSanPham}>
                                            <div
                                                className={cx(
                                                    "product-recommend-img"
                                                )}
                                            >
                                                <img
                                                    src={
                                                        apiImage +
                                                        value.anhDaiDien
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <span
                                                className={cx(
                                                    "product-recommend-price"
                                                )}
                                            >
                                                {value.giaGiam.toLocaleString(
                                                    "de-DE"
                                                )}
                                                <sup>đ</sup>
                                            </span>
                                            <span
                                                className={cx(
                                                    "product-recommend-price-old"
                                                )}
                                            >
                                                {value.gia.toLocaleString(
                                                    "de-DE"
                                                )}
                                                <sup>đ</sup>
                                            </span>
                                            <div
                                                style={{ display: "block" }}
                                                className={cx("sale-off")}
                                            >
                                                {(
                                                    100 -
                                                    (value.giaGiam /
                                                        value.gia) *
                                                        100
                                                ).toFixed(0)}{" "}
                                                <sup>%</sup>
                                            </div>
                                            <div
                                                className={cx(
                                                    "product-recommend-name"
                                                )}
                                            >
                                                {value.tenSanPham}
                                            </div>
                                        </Link>
                                        <div className={cx("icon-recommend")}>
                                            {value.danhGia > 0 ? (
                                                <>
                                                    <span>
                                                        {value.danhGia > 0
                                                            ? value.danhGia.toFixed(
                                                                  1
                                                              )
                                                            : ""}
                                                    </span>
                                                    <FaStar
                                                        className={cx(
                                                            "star-gold"
                                                        )}
                                                    />

                                                    <span className={cx("m03")}>
                                                        |
                                                    </span>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                            <FaShop />
                                            <span
                                                className={cx("amount-product")}
                                            >
                                                {value.soLuong}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
