import { Pagination, Table, TableColumnsType, notification } from "antd";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDelete, MdEditSquare } from "react-icons/md";
import BillSellModal from "../../components/BillSell/BillSellModal";
import BillSellDelete from "../../components/BillSell/BillSellDelete";
import { getAllBillSell } from "../../service/billsell.service";
import { RiAddBoxFill } from "react-icons/ri";

interface DataType {
    key: React.Key;
    maHoaDon: any;
    tenTaiKhoan: any;
    trangThai: any;
    ngayTao: any;
    tongTien: any;
    tenKH: any;
    diaChi: any;
    email: any;
    sdt: any;
    diaChiGiaoHang: any;
}

type NotificationType = "success" | "info" | "warning" | "error";

function BillSell() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalBillSell, setTotalBillSell] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [listIdDelete, setListIdDelete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [maHoaDon, setMaHoaDon] = useState();
    const [dataRecord, setDataRecord] = useState<DataType>();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancelIUModal = () => {
        setIsModalOpen(false);
    };

    const handleCancelDeleteModal = () => {
        setIsOpenDeleteModal(false);
    };

    const handleClearSelection = () => {
        setSelectedRowKeys([]);
    };

    const columns: TableColumnsType<DataType> = [
        {
            title: "ID",
            dataIndex: "maHoaDon",
        },
        {
            title: "Tên Khách Hàng",
            dataIndex: "tenKH",
        },
        {
            title: "Tài Khoản Tạo",
            dataIndex: "tenTaiKhoan",
        },
        {
            title: "Tổng Giá",
            dataIndex: "tongTien",
            render: (text: string) => parseInt(text).toLocaleString("en-US"),
        },
        {
            title: "Địa Chỉ Giao",
            dataIndex: "diaChiGiaoHang",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "sdt",
        },
        {
            title: "Ngày Tạo",
            dataIndex: "ngayTao",
        },
        {
            title: "Trạng Thái",
            dataIndex: "trangThai",
        },
        {
            title: "Tuỳ Chọn",
            align: "center",
            render: (_, record) => (
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        if (record.trangThai === "Huỷ đơn") {
                            openNotificationWithIcon(
                                "warning",
                                "Đơn đã huỷ không thế xem!"
                            );
                        } else {
                            setIsModalOpen(true);
                            setMaHoaDon(record.maHoaDon);
                            setDataRecord(record);
                        }
                    }}
                >
                    <MdEditSquare style={{ fontSize: "20px" }} />
                </div>
            ),
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            // console.log(
            //     `selectedRowKeys: ${selectedRowKeys}`,
            //     "selectedRows: ",
            //     selectedRows
            // );
            setSelectedRowKeys(selectedRowKeys);
            const listid: any = selectedRows.map(function (
                value: any,
                index: any
            ) {
                return value.maHoaDon;
            });
            setListIdDelete(listid);
        },
        getCheckboxProps: (record: DataType) => ({
            // disabled: record.id === "Disabled User", // Column configuration not to be checked
            // name: record.name,
        }),
    };

    const fetchData = async () => {
        setLoading(true);
        let results = await getAllBillSell()
        setData(results);
        console.log(results);
        setTotalBillSell(results.length);
        setLoading(false);
    };

    const dataSet = data.map(function (value: any, index: any) {
        return {
            key: index + 1,
            maHoaDon: value.maHoaDon,
            tenTaiKhoan: value.tenTaiKhoan,
            trangThai: value.trangThai,
            ngayTao: value.ngayTao,
            tongTien: value.tongGia,
            tenKH: value.tenKH,
            diaChi: value.diaChi,
            email: value.email,
            sdt: value.sdt,
            diaChiGiaoHang: value.diaChiGiaoHang,
        };
    });

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    return (
        <>
            {contextHolder}
            <div className="container">
                <div className="button mt-3">
                    <button
                        onClick={() => {
                            showModal();
                            setMaHoaDon(undefined);
                        }}
                        className="btn btn-success btn-add "
                    >
                        <RiAddBoxFill />
                    </button>
                    <button
                        onClick={() => {
                            if (listIdDelete.length > 0) {
                                setIsOpenDeleteModal(true);
                            }
                        }}
                        className="btn btn-danger btn-del mx-1"
                    >
                        <MdDelete />
                    </button>
                </div>
                <Table
                    bordered={true}
                    rowSelection={{
                        ...rowSelection,
                        selectedRowKeys: selectedRowKeys,
                    }}
                    columns={columns}
                    dataSource={dataSet}
                    loading={loading}
                    rowClassName="hover-row"
                />
                <BillSellModal
                    showModal={showModal}
                    isModalOpen={isModalOpen}
                    handleCancelIUModal={handleCancelIUModal}
                    fetchData={fetchData}
                    maHoaDon={maHoaDon}
                    record={dataRecord}
                />
                <BillSellDelete
                    isOpenDeleteModal={isOpenDeleteModal}
                    fetchData={fetchData}
                    handleCancelDeleteModal={handleCancelDeleteModal}
                    listiddel={listIdDelete}
                    onDeleteSuccess={handleClearSelection}
                />
            </div>
        </>
    );
}

export default BillSell;
