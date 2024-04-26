import { Pagination, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { getAllDistributor } from "../../service/distributor.service";
import DistributorModal from "../../components/Distributor/DistributorModal";
import DistributorDelete from "../../components/Distributor/DistributorDelete";
import { RiAddBoxFill } from "react-icons/ri";

interface DataType {
    key: React.Key;
    maNhaPhanPhoi: any;
    tenNhaPhanPhoi: any;
    diaChi: any;
    soDienThoai: any;
    linkWeb: any;
    moTa: any;
}

function Distributor() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalDistributor, setTotalDistributor] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [listIdDelete, setListIdDelete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [maNhaPhanPhoi, setMaNhaPhanPhoi] = useState();
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
            dataIndex: "maNhaPhanPhoi",
        },
        {
            title: "Tên Nhà Phân Phối",
            dataIndex: "tenNhaPhanPhoi",
            render: (text, record) => (
                <a
                    target="_blank"
                    style={{ color: "blue" }}
                    href={record.linkWeb}
                >
                    {text}
                </a>
            ),
        },
        {
            title: "Địa Chỉ",
            dataIndex: "diaChi",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "soDienThoai",
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
                        setMaNhaPhanPhoi(record.maNhaPhanPhoi);
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
                return value.maNhaPhanPhoi;
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
        let results = await getAllDistributor();
        setData(results);
        setTotalDistributor(results.length);
        setLoading(false);
    };

    const dataSet = data.map(function (value: any, index: any) {
        return {
            key: index + 1,
            maNhaPhanPhoi: value.maNhaPhanPhoi,
            tenNhaPhanPhoi: value.tenNhaPhanPhoi,
            diaChi: value.diaChi,
            soDienThoai: value.soDienThoai,
            linkWeb: value.linkWeb,
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
                        setMaNhaPhanPhoi(undefined);
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
            <DistributorModal
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleCancelIUModal={handleCancelIUModal}
                fetchData={fetchData}
                maNhaPhanPhoi={maNhaPhanPhoi}
                record={dataRecord}
            />
            <DistributorDelete
                isOpenDeleteModal={isOpenDeleteModal}
                fetchData={fetchData}
                handleCancelDeleteModal={handleCancelDeleteModal}
                listiddel={listIdDelete}
                onDeleteSuccess={handleClearSelection}
            />
        </div>
    );
}

export default Distributor;
