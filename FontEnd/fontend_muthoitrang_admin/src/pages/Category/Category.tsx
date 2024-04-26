import { Pagination, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import CategoryModal from "../../components/Category/CategoryModal";
import CategoryDelete from "../../components/Category/CategoryDelete";
import { RiAddBoxFill } from "react-icons/ri";
import { getAllCategory } from "../../service/category.service";

interface DataType {
    key: React.Key;
    maDanhMuc: any;
    tenDanhMuc: any;
    noiDung: any;
}

function Category() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCategory, setTotalCategory] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [listIdDelete, setListIdDelete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [maDanhMuc, setMaDanhMuc] = useState();
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
            dataIndex: "maDanhMuc",
        },
        {
            title: "Tên Danh Mục",
            dataIndex: "tenDanhMuc",
        },
        {
            title: "Nội Dung",
            dataIndex: "noiDung",
        },
        {
            title: "Tuỳ Chọn",
            align: "center",
            render: (_, record) => (
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setIsModalOpen(true);
                        setMaDanhMuc(record.maDanhMuc);
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
                return value.maDanhMuc;
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
        let results = await getAllCategory();
        setData(results);
        setTotalCategory(results.length);
        setLoading(false);
    };

    const dataSet = data.map(function (value: any, index: any) {
        return {
            key: index + 1,
            maDanhMuc: value.maDanhMuc,
            tenDanhMuc: value.tenDanhMuc,
            noiDung: value.noiDung,
        };
    });

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    return (
        <>
            <div className="container">
                <div className="button">
                    <button
                        onClick={() => {
                            showModal();
                            setMaDanhMuc(undefined);
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
                <CategoryModal
                    showModal={showModal}
                    isModalOpen={isModalOpen}
                    handleCancelIUModal={handleCancelIUModal}
                    fetchData={fetchData}
                    maDanhMuc={maDanhMuc}
                    record={dataRecord}
                />
                <CategoryDelete
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

export default Category;
