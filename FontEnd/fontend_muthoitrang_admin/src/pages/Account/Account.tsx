import { Pagination, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDelete, MdEditSquare } from "react-icons/md";
import AccountModal from "../../components/Account/AccountModal";
import AccountDelete from "../../components/Account/AccountDelete";
import { getAllAccount } from "../../service/account.service";
import { RiAddBoxFill } from "react-icons/ri";

interface DataType {
    key: React.Key;
    maTaiKhoan: any;
    tenTaiKhoan: any;
    email: any;
    matKhau: any;
}

function Account() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalAccount, setTotalAccount] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [listIdDelete, setListIdDelete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [maTaiKhoan, setMaTaiKhoan] = useState();
    const [dataRecord, setDataRecord] = useState<DataType>();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

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
            dataIndex: "maTaiKhoan",
        },
        {
            title: "Tên Tài Khoản",
            dataIndex: "tenTaiKhoan",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Tuỳ Chọn",
            align: "center",
            render: (_, record) => (
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setIsModalOpen(true);
                        setMaTaiKhoan(record.maTaiKhoan);
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
                return value.maTaiKhoan;
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
        let results = await getAllAccount();
        setData(results);
        setTotalAccount(results.length);
        setLoading(false);
    };

    const dataSet = data.map(function (value: any, index: any) {
        return {
            key: index + 1,
            maTaiKhoan: value.maTaiKhoan,
            tenTaiKhoan: value.tenTaiKhoan,
            email: value.email,
            matKhau: value.matKhau,
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
                        setMaTaiKhoan(undefined);
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
            />
            <AccountModal
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleCancelIUModal={handleCancelIUModal}
                fetchData={fetchData}
                maTaiKhoan={maTaiKhoan}
                record={dataRecord}
            />
            <AccountDelete
                isOpenDeleteModal={isOpenDeleteModal}
                fetchData={fetchData}
                handleCancelDeleteModal={handleCancelDeleteModal}
                listiddel={listIdDelete}
                onDeleteSuccess={handleClearSelection}
            />
        </div>
    );
}

export default Account;
