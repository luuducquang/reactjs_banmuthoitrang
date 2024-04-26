import { Pagination, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDelete, MdEditSquare } from "react-icons/md";
import ImportBillDelete from "../../components/ImportBill/ImportBillDelete";
import ImportBillModal from "../../components/ImportBill/ImportBillModal";
import { getAllImportBill } from "../../service/importbill.service";
import { RiAddBoxFill } from "react-icons/ri";

interface DataType {
    key: React.Key;
    maHoaDon: any;
    maNhaPhanPhoi: any;
    tenNhaPhanPhoi: any;
    ngayTao: any;
    kieuThanhToan: any;
    tongTien: any;
    tenTaiKhoan: any;
}

function ImportBill() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalImportBill, setTotalImportBill] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [listIdDelete, setListIdDelete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [maHoaDon, setMaHoaDon] = useState();
    const [dataRecord, setDataRecord] = useState<DataType>();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

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
            title: "Tên Nhà Phân Phối",
            dataIndex: "tenNhaPhanPhoi",
        },
        {
            title: "Tài Khoản Nhập",
            dataIndex: "tenTaiKhoan",
        },
        {
            title: "Ngày Tạo",
            dataIndex: "ngayTao",
        },
        {
            title: "Kiểu Thanh Toán",
            dataIndex: "kieuThanhToan",
        },
        {
            title: "Tổng Tiền",
            dataIndex: "tongTien",
            render: (text: string) => parseInt(text).toLocaleString("en-US"),
        },
        {
            title: "Tuỳ Chọn",
            align: "center",
            render: (_, record) => (
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setIsModalOpen(true);
                        setMaHoaDon(record.maHoaDon);
                        setDataRecord(record);
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
        let results = await getAllImportBill()
        setData(results);
        setTotalImportBill(results.length);
        setLoading(false);
    };

    const dataSet = data.map(function (value: any, index: any) {
        return {
            key: index + 1,
            maHoaDon: value.maHoaDon,
            maNhaPhanPhoi: value.maNhaPhanPhoi,
            tenNhaPhanPhoi: value.tenNhaPhanPhoi,
            ngayTao: value.ngayTao,
            kieuThanhToan: value.kieuThanhToan,
            tongTien: value.tongTien,
            tenTaiKhoan: value.tenTaiKhoan,
        };
    });

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    return (
        <div className="container">
            <div className="button mt-3">
                <button
                    onClick={() => {
                        showModal();
                        setMaHoaDon(undefined);
                    }}
                    className="btn btn-success btn-add"
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
            <ImportBillModal
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleCancelIUModal={handleCancelIUModal}
                fetchData={fetchData}
                maHoaDon={maHoaDon}
                record={dataRecord}
            />
            <ImportBillDelete
                isOpenDeleteModal={isOpenDeleteModal}
                fetchData={fetchData}
                handleCancelDeleteModal={handleCancelDeleteModal}
                listiddel={listIdDelete}
                onDeleteSuccess={handleClearSelection}
            />
        </div>
    );
}

export default ImportBill;
