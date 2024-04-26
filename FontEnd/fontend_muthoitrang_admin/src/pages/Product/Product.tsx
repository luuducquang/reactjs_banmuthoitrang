import { useEffect, useState } from "react";
import { Table, TableColumnsType, Pagination } from "antd";
import { apiImage } from "../../constant/api";
import { FaInfoCircle, FaStar } from "react-icons/fa";
import ProductModal from "../../components/Product/ProductModal";
import ProductDelete from "../../components/Product/ProductDelete";
import { getAllProduct } from "../../service/billsell.service";
import { RiAddBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

interface DataType {
    key: React.Key;
    maSanPham: any;
    tenSanPham: any;
    anhDaiDien: any;
    gia: any;
    soLuong: any;
    luotBan: any;
    danhGia: any;
    mauSac: any;
    tenDanhMuc: any;
    trangThai: any;
}

function Product() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [maSanPham, setMaSanPham] = useState();
    const [totalProducts, setTotalProducts] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const [listIdDelete, setListIdDelete] = useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const handleClearSelection = () => {
        setSelectedRowKeys([]);
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

    const fetchData = async () => {
        setLoading(true);
        let results = await getAllProduct();
        setData(results);
        setTotalProducts(results.length);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const dataSet = data.map(function (value: any, index: any) {
        return {
            key: index + 1,
            maSanPham: value.maSanPham,
            tenSanPham: value.tenSanPham,
            anhDaiDien: apiImage + value.anhDaiDien,
            gia: value.gia,
            soLuong: value.soLuong,
            luotBan: value.luotBan,
            danhGia: value.danhGia,
            mauSac: value.mauSac,
            tenDanhMuc: value.tenDanhMuc,
            trangThai: value.trangThai ? "Hoạt Động" : "Đã Ẩn",
        };
    });

    const columns: TableColumnsType<DataType> = [
        {
            title: "ID",
            dataIndex: "maSanPham",
        },
        {
            title: "Tên Sản Phẩm",
            dataIndex: "tenSanPham",
        },
        {
            title: "Hình Ảnh",
            dataIndex: "anhDaiDien",
            render: (anhDaiDien: string) => (
                <img
                    src={anhDaiDien}
                    alt="Hình Ảnh"
                    style={{ width: "100px" }}
                />
            ),
        },
        {
            title: "Giá Bán",
            dataIndex: "gia",
            render: (text: string) => parseInt(text).toLocaleString("en-US"),
        },
        {
            title: "Số Lượng",
            dataIndex: "soLuong",
        },
        {
            title: "Đã Bán",
            dataIndex: "luotBan",
        },
        {
            title: "Đánh Giá",
            dataIndex: "danhGia",
            render: (danhGia: string) => {
                return (
                    <div>
                        <span>{danhGia}</span>
                        <FaStar
                            style={{
                                marginTop: "-3px",
                                color: "#ff9c1a",
                                marginLeft: "2px",
                            }}
                        />
                    </div>
                );
            },
        },
        {
            title: "Màu sắc",
            dataIndex: "mauSac",
        },
        {
            title: "Danh mục",
            dataIndex: "tenDanhMuc",
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
                        setIsModalOpen(true);
                        setMaSanPham(record.maSanPham);
                    }}
                >
                    <FaInfoCircle style={{ fontSize: "20px" }} />
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
                return value.maSanPham;
            });
            setListIdDelete(listid);
        },
        getCheckboxProps: (record: DataType) => ({
            // disabled: record.id === "Disabled User", // Column configuration not to be checked
            // name: record.name,
        }),
    };
    return (
        <div className="container">
            <div className="button mb-3">
                <button
                    onClick={() => {
                        showModal();
                        setMaSanPham(undefined);
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
            <ProductModal
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleCancelIUModal={handleCancelIUModal}
                refreshData={fetchData}
                maSanPham={maSanPham}
            />
            <ProductDelete
                isOpenDeleteModal={isOpenDeleteModal}
                fetchData={fetchData}
                handleCancelDeleteModal={handleCancelDeleteModal}
                listiddel={listIdDelete}
                onDeleteSuccess={handleClearSelection}
            />
        </div>
    );
}

export default Product;
