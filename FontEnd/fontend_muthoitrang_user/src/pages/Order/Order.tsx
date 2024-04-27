import classNames from "classnames/bind";

import styles from "./Order.module.scss";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiImage } from "../../constant/api";
import { Button, Form, Input, Select, notification } from "antd";
import { getInformationOrder, sendOrder } from "../../services/order.service";

const cx = classNames.bind(styles);

const { Option } = Select;
type NotificationType = "success" | "info" | "warning" | "error";

function Order() {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [dataCartNew, setDataCartNew] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const naigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (
        type: NotificationType,
        content: string
    ) => {
        api[type]({
            message: "Thông báo",
            description: content,
        });
    };

    const listJsonBuy = data.map(function (value: any) {
        return {
            MaSanPham: value.id,
            SoLuong: value.amount,
            DonGia: value.price,
            TongGia: Number(value.price) * Number(value.amount),
        };
    });
    const currentDate = new Date();
    const gmt7ISODate = currentDate.toISOString();

    const handlerOrder = async () => {
        form.validateFields()
            .then(async (values: any) => {
                await sendOrder({
                    TrangThai: "Đang xử lý",
                    NgayTao: gmt7ISODate,
                    TongGia: totalPrice,
                    TenKH: values.hoTen,
                    DiaChi: values.diaChi,
                    Email: values.email,
                    SDT: values.soDienThoai,
                    DiaChiGiaoHang: values.diaChi,
                    MaTaiKhoan: user.mataikhoan,
                    list_json_chitiet_hoadon: listJsonBuy,
                });
                await openNotificationWithIcon(
                    "success",
                    "Đặt hàng thành công"
                );

                setTimeout(() => {
                    naigate("/");
                }, 1500);
                localStorage.setItem("listProductBuy", JSON.stringify([]));
                localStorage.setItem(
                    "productList",
                    JSON.stringify(dataCartNew)
                );
            })
            .catch(async (e: any) => {
                openNotificationWithIcon(
                    "warning",
                    "Đặt hàng không thành công"
                );
            });
    };

    const user = JSON.parse(localStorage.getItem("customer") || "{}");

    useEffect(() => {
        let productBuyString = localStorage.getItem("listProductBuy");
        let dataBuy = productBuyString ? JSON.parse(productBuyString) : [];
        setData(dataBuy);
        if (dataBuy.length === 0) {
            naigate("/");
        }
        let totalPrice = 0;
        const total = dataBuy.forEach((product: any) => {
            totalPrice += product.amount * product.price;
        });
        setTotalPrice(totalPrice);

        var productListString = localStorage.getItem("productList");
        var listProduct = productListString
            ? JSON.parse(productListString)
            : [];

        var ids = dataBuy.map(function (item: any) {
            return item.id;
        });

        var newlistCart = listProduct.filter(function (item: any) {
            return ids.indexOf(item.id) === -1;
        });
        setDataCartNew(newlistCart);
    }, []);

    useEffect(() => {
        async function getData(mataikhoan: any) {
            const resInf = await getInformationOrder(mataikhoan);
            form.setFieldsValue({
                hoTen: resInf[0].hoTen,
                soDienThoai: resInf[0].soDienThoai,
                email: resInf[0].email,
                diaChi: resInf[0].diaChi,
            });
        }
        getData(user.mataikhoan);
    }, []);
    return (
        <>
            {contextHolder}
            <div className={cx("content")}>
                <div className={cx("order-cart-shop")}>
                    <div className={cx("type")}>
                        <Link to="/">Trang chủ</Link>
                        <FaLongArrowAltRight className={cx("arrow-item")} />
                        <Link to="/cart">Giỏ hàng</Link>
                        <FaLongArrowAltRight className={cx("arrow-item")} />
                        <Link to="/order">Đặt hàng</Link>
                    </div>
                    <div className={cx("order-cart-shop-content")}>
                        <form action="#">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Sản Phẩm</td>
                                        <td>Màu sắc</td>
                                        <td>Đơn Giá</td>
                                        <td>Số Lượng</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(function (
                                        value: any,
                                        index: any
                                    ) {
                                        return (
                                            <tr key={index}>
                                                <td
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            width: "20%",
                                                            padding: 10,
                                                        }}
                                                        src={
                                                            apiImage + value.img
                                                        }
                                                        alt=""
                                                    />
                                                    <a
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                            fontSize: 14,
                                                        }}
                                                        href={`#!/product/${value.id}`}
                                                        className="nameItem"
                                                    >
                                                        {value.name}
                                                    </a>
                                                </td>
                                                <td style={{ fontSize: 14 }}>
                                                    {value.color}
                                                </td>
                                                <td>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <p>
                                                            <span
                                                                style={{
                                                                    fontSize: 14,
                                                                    color: "#888888",
                                                                    textDecoration:
                                                                        "line-through",
                                                                }}
                                                                className={cx(
                                                                    "price-item"
                                                                )}
                                                            >
                                                                {value.priceOld.toLocaleString(
                                                                    "DE-de"
                                                                )}
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
                                                                    fontSize: 14,
                                                                    marginLeft: 5,
                                                                }}
                                                                className={cx(
                                                                    "price-item"
                                                                )}
                                                            >
                                                                {value.price.toLocaleString(
                                                                    "DE-de"
                                                                )}
                                                            </span>
                                                            <sup>đ</sup>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div
                                                        className={cx(
                                                            "buy-amount"
                                                        )}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                height: 30,
                                                                width: 30,
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                alignItems:
                                                                    "center",
                                                                outline: "none",
                                                                cursor: "pointer",
                                                            }}
                                                            className={cx(
                                                                "ti-plus plus"
                                                            )}
                                                        >{value.amount}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
                <div
                    style={{ textDecoration: "none" }}
                    className={cx("total-order")}
                >
                    <form action="#">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Phí tạm tính: </td>
                                    <td>
                                        <span className={cx("totalPriceCart")}>
                                            {totalPrice.toLocaleString("DE-de")}
                                        </span>
                                        <sup>đ</sup>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phụ phí: </td>
                                    <td>
                                        <span>0</span>
                                        <sup>đ</sup>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phí vận chuyển: </td>
                                    <td>
                                        <span className={cx("transport_oder")}>
                                            0
                                        </span>
                                        <sup>đ</sup>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Giảm giá: </td>
                                    <td>
                                        <span>0</span>
                                        <sup>đ</sup>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            borderTop: "1px solid #E1E1E1",
                                        }}
                                    >
                                        Tổng thanh toán:
                                    </td>
                                    <td
                                        className={cx("total_order")}
                                        style={{
                                            borderTop: "1px solid #E1E1E1",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily:
                                                    "Arial, Helvetica, sans-serif",
                                                fontSize: 20,
                                            }}
                                            className={cx("total_all")}
                                        >
                                            {(
                                                totalPrice
                                            ).toLocaleString("DE-de")}
                                        </span>
                                        <sup>đ</sup>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <div className={cx("address-delivery")}>
                    <h2>Vui lòng chọn địa chỉ giao hàng</h2>
                    <Form
                        layout="vertical"
                        form={form}
                        style={{ padding: "0 20px 10px 20px" }}
                    >
                        <Form.Item
                            label="Họ tên"
                            name="hoTen"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ tên!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Điện thoại"
                            name="soDienThoai"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: "Số điện thoại không hợp lệ!",
                                },
                            ]}
                        >
                            <Input maxLength={11} />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email!",
                                },
                                {
                                    type: "email",
                                    message: "Email không hợp lệ!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="diaChi"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button type="primary" onClick={handlerOrder}>
                                Thanh toán và giao hàng
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Order;
