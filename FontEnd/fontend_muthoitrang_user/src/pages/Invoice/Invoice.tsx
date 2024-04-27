import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { Table, TableColumnsType } from "antd";

import styles from "./Invoice.module.scss";
import { FaCircleInfo } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getInvoiceAll } from "../../services/invoice.servie";
import InvoiceModal from "./InvoiceModal";
const cx = classNames.bind(styles);

interface DataType {
    key: React.Key;
    maHoaDon: any;
    trangThai: any;
    ngayTao: any;
    tongGia: any;
    sdt: any;
    diaChiGiaoHang: any;
}

function Invoice() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [maHoaDon, setMaHoaDon] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancelIUModal = () => {
        setIsModalOpen(false);
    };

    const dataSet = data.map(function (value: any, index: any) {
        return {
            key: index + 1,
            maHoaDon: value.maHoaDon,
            sdt: value.sdt,
            diaChiGiaoHang: value.diaChiGiaoHang,
            ngayTao: value.ngayTao,
            tongGia: value.tongGia,
            trangThai: value.trangThai,
        };
    });

    const columns: TableColumnsType<DataType> = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: "Số điện thoại",
            dataIndex: "sdt",
            key: "sdt",
            align: "center",
        },
        {
            title: "Địa chỉ",
            dataIndex: "diaChiGiaoHang",
            key: "diaChiGiaoHang",
            align: "center",
        },
        {
            title: "Ngày đặt",
            dataIndex: "ngayTao",
            key: "ngayTao",
            align: "center",
            render: (text: any) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "Tổng tiền",
            dataIndex: "tongGia",
            key: "tongGia",
            align: "center",
            render: (text: any) => text.toLocaleString("DE-de"),
        },
        {
            title: "Trạng thái",
            dataIndex: "trangThai",
            key: "trangThai",
            align: "center",
            render: (text: any) => (
                <span
                    style={{
                        color:
                            text === "Đang xử lý"
                                ? "#FFCC00"
                                : text === "Huỷ đơn"
                                ? "#FF3300"
                                : "#33CC00",
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Chi tiết",
            dataIndex: "chiTiet",
            key: "chiTiet",
            align: "center",
            render: (_: any, record: any) => (
                <FaCircleInfo
                    onClick={() => {
                        setIsModalOpen(true);
                        setMaHoaDon(record.maHoaDon);
                    }}
                    style={{ cursor: "pointer" }}
                />
            ),
        },
    ];

    const fetchData = async (id: any) => {
        setLoading(true);
        let results = await getInvoiceAll(id);
        setData(results);
        setLoading(false);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("customer") || "{}");
        if (user && user.mataikhoan) {
            fetchData(user.mataikhoan);
        }
    }, []);

    return (
        <div style={{ marginTop: 85 }} className={cx("content")}>
            <div className={cx("cleanser")}>
                <div style={{ marginTop: 10 }} className={cx("type")}>
                    <Link to="/">Trang chủ</Link>
                    <FaLongArrowAltRight className={cx("arrow-item")} />
                    <Link to={`/invoice`}>Đơn hàng của bạn</Link>
                </div>
                <div className={cx("news")}>
                    <Table dataSource={dataSet} columns={columns} />
                    <InvoiceModal
                        showModal={showModal}
                        isModalOpen={isModalOpen}
                        handleCancelIUModal={handleCancelIUModal}
                        fetchData={fetchData}
                        maHoaDon={maHoaDon}
                    />
                </div>
            </div>
        </div>
    );
}

export default Invoice;
