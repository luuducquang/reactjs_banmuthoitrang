import { Pagination, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { getAllTypeAccount } from "../../service/typeaccount.service";
import TypeAccountModal from "../../components/TypeAccount/TypeAccountModal";
import TypeAccountDelete from "../../components/TypeAccount/TypeAccountDelete";
import { RiAddBoxFill } from "react-icons/ri";

interface DataType {
    key: React.Key;
    maLoaitaikhoan: any;
    tenLoai: any;
    moTa: any;
}

function TypeAccount() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCategory, setTotalCategory] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [listIdDelete, setListIdDelete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [maLoaitaikhoan, setMaLoaitaikhoan] = useState();
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
            dataIndex: "maLoaitaikhoan",
        },
        {
            title: "Tên Loại Tài Khoản",
            dataIndex: "tenLoai",
        },
        {
            title: "Mô Tả",
            dataIndex: "moTa",
        },
        {
            title: "Tuỳ Chọn",
            align: "center",
            render: (_, record) => (
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setIsModalOpen(true);
                        setMaLoaitaikhoan(record.maLoaitaikhoan);
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
                return value.maLoaitaikhoan;
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
        let results = await getAllTypeAccount();
        setData(results);
        setTotalCategory(results.length);
        setLoading(false);
    };

    const dataSet = data.map(function (value: any, index: any) {
        return {
            key: index + 1,
            maLoaitaikhoan: value.maLoaitaikhoan,
            tenLoai: value.tenLoai,
            moTa: value.moTa,
        };
    });

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    return (
        <div className="container">
            <div className="button">
                <button
                    onClick={() => {
                        showModal();
                        setMaLoaitaikhoan(undefined);
                    }}
                    type="button"
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
                    type="button"
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
                pagination={false}
            />
            <Pagination
                current={currentPage}
                total={totalCategory}
                pageSize={10}
                onChange={handlePageChange}
                style={{ marginTop: "16px", textAlign: "center" }}
            />
            <TypeAccountModal
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleCancelIUModal={handleCancelIUModal}
                fetchData={fetchData}
                maLoaitaikhoan={maLoaitaikhoan}
                record={dataRecord}
            />
            <TypeAccountDelete
                isOpenDeleteModal={isOpenDeleteModal}
                fetchData={fetchData}
                handleCancelDeleteModal={handleCancelDeleteModal}
                listiddel={listIdDelete}
                onDeleteSuccess={handleClearSelection}
            />
        </div>
    );
}

export default TypeAccount;
