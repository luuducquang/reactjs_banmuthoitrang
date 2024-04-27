import {
    Button,
    Flex,
    Form,
    Input,
    Modal,
    Select,
    Table,
    TableColumnsType,
    notification,
} from "antd";
import { useEffect, useState } from "react";
import { getInvoiceById } from "../../services/invoice.servie";
import { apiImage } from "../../constant/api";

interface TableColumn {
    key: React.Key;
    maChiTietHoaDon: any;
    anhDaiDien: any;
    tenSanPham: any;
    soLuong: any;
    donGia: any;
    tongGia: any;
    maSanPham?: any;
}

type NotificationType = "success" | "info" | "warning" | "error";
const { Option } = Select;

function InvoiceModal(props: any) {
    const [form] = Form.useForm();
    const { TextArea } = Input;

    const [api, contextHolder] = notification.useNotification();
    const [data, setData] = useState([]);

    const openNotificationWithIcon = (
        type: NotificationType,
        content: string
    ) => {
        api[type]({
            message: "Thông báo",
            description: content,
        });
    };

    const handleCancel = () => {
        props.handleCancelIUModal();
    };
    async function fetchData(id: any) {
        const res = await getInvoiceById(id);
        setData(res);
    }
    useEffect(() => {
        if (props.maHoaDon) {
            fetchData(props.maHoaDon);
        }
    }, [props.maHoaDon]);

    const dataSet = data.map(function (value: any, index: any) {
        return {
            key: index + 1,
            maChiTietHoaDon: value.maChiTietHoaDon,
            anhDaiDien: apiImage + value.anhDaiDien,
            tenSanPham: value.tenSanPham,
            soLuong: value.soLuong,
            donGia: value.donGia,
            tongGia: value.tongGia,
        };
    });

    const columns: TableColumnsType<TableColumn> = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: "Hình Ảnh",
            dataIndex: "anhDaiDien",
            key: "anhDaiDien",
            align: "center",
            render: (text: any) => (
                <img
                    style={{ width: 100, height: 100, backgroundSize: "cover" }}
                    src={text}
                    alt=""
                />
            ),
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "tenSanPham",
            key: "tenSanPham",
            align: "center",
            render: (text: any, record: any) => (
                <a
                    style={{ textDecoration: "none" }}
                    href={`#!/product/${record.maSanPham}`}
                >
                    {text}
                </a>
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "soLuong",
            key: "soLuong",
            align: "center",
        },
        {
            title: "Đơn giá",
            dataIndex: "donGia",
            key: "donGia",
            align: "center",
        },
        {
            title: "Tổng giá",
            dataIndex: "tongGia",
            key: "tongGia",
            align: "center",
        },
    ];

    return (
        <>
            {contextHolder}
            <Modal
                title="Thông tin hoá đơn"
                width={"55vw"}
                open={props.isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Table
                    dataSource={dataSet}
                    columns={columns}
                    pagination={false}
                />
                <Flex
                    style={{ marginTop: "10px" }}
                    gap="small"
                    wrap="wrap"
                    justify="center"
                    align="center"
                >
                    <Button type="primary">Huỷ đơn</Button>
                </Flex>
            </Modal>
        </>
    );
}

export default InvoiceModal;
