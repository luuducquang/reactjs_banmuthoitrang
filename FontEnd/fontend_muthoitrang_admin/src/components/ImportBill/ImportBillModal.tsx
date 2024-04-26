import {
    Button,
    DatePicker,
    Divider,
    Form,
    Input,
    Modal,
    Select,
    Table,
    TableColumnsType,
    notification,
} from "antd";
import { useEffect, useState } from "react";
import { createCategory, updateCategory } from "../../service/category.service";
import moment from "moment";
import {
    createBillSell,
    getAllProduct,
    getDetailBillById,
    updateBillSell,
} from "../../service/billsell.service";
import { RiAddBoxFill } from "react-icons/ri";
import { apiImage } from "../../constant/api";
import { MdDelete, MdEditSquare } from "react-icons/md";
import {
    createImportBill,
    getAllNhaPhanPhoi,
    getDetailImportBillById,
    updateImportBill,
} from "../../service/importbill.service";

type NotificationType = "success" | "info" | "warning" | "error";
const { Option } = Select;

interface Product {
    key: React.Key;
    maSanPham: any;
    maChiTietHoaDon: any;
    tenSanPham: any;
    anhDaiDien: any;
    soLuong: any;
    giaNhap: any;
    tongGia: any;
}

interface NhaPhanPhoi {
    maNhaPhanPhoi: any;
    tenNhaPhanPhoi: any;
}

function ImportBillModal(props: any) {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [listIdDelete, setListIdDelete] = useState([]);
    const [listIdDetailDelete, setListIdDetailDelete] = useState([]);
    const [nhaPhanPhoi, setNhaPhanPhoi] = useState<NhaPhanPhoi[]>([]);

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<Product[]>([]);

    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [dataSet, SetDataSet] = useState<Product[]>([]);
    const [dataSetTemp, SetDataSetTemp] = useState<Product[]>([]);

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

    const handleCancel = () => {
        props.handleCancelIUModal();
    };

    const columns: TableColumnsType<Product> = [
        {
            title: "STT",
            dataIndex: "key",
            align: "center",
        },
        {
            title: "Hình Ảnh",
            dataIndex: "anhDaiDien",
            render: (anhDaiDien: string) => (
                <img
                    src={anhDaiDien}
                    alt="Hình Ảnh"
                    style={{ maxWidth: "100px" }}
                />
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "soLuong",
            align: "center",
            render: (_, record) => (
                <Input
                    type="number"
                    min={1}
                    value={record.soLuong}
                    onChange={(e) =>
                        handleQuantityChangeItem(e.target.value, record)
                    }
                    style={{ width: "60px" }}
                />
            ),
        },
        {
            title: "Giá nhập",
            dataIndex: "giaNhap",
            align: "center",
        },
        {
            title: "Tổng giá",
            dataIndex: "tongGia",
            align: "center",
        },
        {
            title: "Tuỳ Chọn",
            align: "center",
            render: (_, record) => (
                <div
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                        const dataProductLast = dataSetTemp.find(
                            (item) => item.maSanPham === record.maSanPham
                        );
                        const updatedDataSetTemp = dataSetTemp.map((item) => {
                            if (item.maSanPham === record.maSanPham) {
                                return {
                                    ...item,
                                    soLuong: Number(record.soLuong),
                                    tongGia:
                                        Number(record.soLuong) *
                                        Number(record.giaNhap),
                                };
                            }
                            return item;
                        });
                        SetDataSetTemp(updatedDataSetTemp);
                        SetDataSet(updatedDataSetTemp);

                        await updateImportBill({
                            MaHoaDon: props.maHoaDon,
                            MaNhaPhanPhoi: form.getFieldValue("maNhaPhanPhoi"),
                            KieuThanhToan: form.getFieldValue("kieuThanhToan"),
                            TongTien: form.getFieldValue("tongTien"),
                            list_json_chitiethoadonnhap: [
                                {
                                    id: record.maChiTietHoaDon,
                                    MaSanPham: record.maSanPham,
                                    SoLuong: Number(record.soLuong),
                                    SoLuongTon:
                                        Number(record.soLuong) -
                                        Number(dataProductLast?.soLuong),
                                    GiaNhap: Number(record.giaNhap),
                                    TongGia:
                                        Number(record.giaNhap) *
                                        Number(record.soLuong),
                                    status: 2,
                                },
                            ],
                        });

                        openNotificationWithIcon(
                            "success",
                            "Chỉnh sửa thành công!"
                        );
                        props.fetchData();
                    }}
                >
                    <MdEditSquare style={{ fontSize: "20px" }} />
                </div>
            ),
        },
    ];

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    async function fetchData() {
        const resProduct = await getAllProduct();
        setProduct(resProduct);
        const resNhaPhanPhoi = await getAllNhaPhanPhoi();
        setNhaPhanPhoi(resNhaPhanPhoi);
    }

    async function fetchDetail(maHoaDon: any) {
        const resDetailBill = await getDetailImportBillById(maHoaDon);
        const dataSetDetail = resDetailBill.map((value: any, index: any) => {
            return {
                key: index + 1,
                maChiTietHoaDon: value.id,
                maSanPham: value.maSanPham,
                tenSanPham: value.tenSanPham,
                anhDaiDien: apiImage + value.anhDaiDien,
                soLuong: value.soLuong,
                giaNhap: value.giaNhap,
                tongGia: value.tongGia,
            };
        });
        SetDataSet(dataSetDetail);
        SetDataSetTemp(dataSetDetail);
    }

    useEffect(() => {
        if (props.maHoaDon !== "" && props.maHoaDon !== undefined) {
            form.setFieldsValue(props.record);
            form.setFieldsValue({
                maSanPham: "",
                soLuong: 1,
                giaNhap: undefined,
                tongGia: "",
            });
            fetchDetail(props.maHoaDon);
            setSelectedProduct(null);
        } else {
            form.resetFields();
            SetDataSet([]);
            setSelectedProduct(null);
        }
        fetchData();
    }, [props.maHoaDon, props.record]);

    const handleOk = () => {
        form.validateFields()
            .then(async (values: any) => {
                if (dataSet.length === 0) {
                    openNotificationWithIcon(
                        "warning",
                        "Bạn cần thêm sản phẩm!"
                    );
                } else {
                    if (props.maHoaDon) {
                        props.handleCancelIUModal();

                        await updateImportBill({
                            MaHoaDon: props.maHoaDon,
                            MaNhaPhanPhoi: values.maNhaPhanPhoi,
                            KieuThanhToan: values.kieuThanhToan,
                            TongTien: values.tongTien,
                            list_json_chitiethoadonnhap: [
                                {
                                    Id: 0,
                                    MaSanPham: 0,
                                    SoLuong: 0,
                                    GiaNhap: 0,
                                    TongGia: 0,
                                    status: 0,
                                },
                            ],
                        });
                        openNotificationWithIcon(
                            "success",
                            "Cập nhật thành công!"
                        );

                        props.fetchData();
                    } else {
                        const listDataProduct = dataSet.map((value: any) => {
                            return {
                                MaSanPham: value.maSanPham,
                                SoLuong: Number(values.soLuong),
                                GiaNhap: Number(values.giaNhap),
                                TongGia: Number(values.tongGia),
                            };
                        });
                        props.handleCancelIUModal();
                        await createImportBill({
                            MaNhaPhanPhoi: values.maNhaPhanPhoi,
                            KieuThanhToan: values.kieuThanhToan,
                            TongTien: Number(
                                String(values.tongTien).replace(/\./g, "")
                            ),
                            MaTaiKhoan: user.mataikhoan,
                            list_json_chitiethoadonnhap: listDataProduct,
                        });
                        props.fetchData();
                        openNotificationWithIcon("success", "Thêm thành công!");
                    }
                }
            })
            .catch(async () => {
                openNotificationWithIcon("warning", "Thông tin chưa đủ!");
            });
    };


    const handleProductChange = (value: any) => {
        const selectedProduct = product.find(
            (item) => item.maSanPham === value
        );
        setSelectedProduct(selectedProduct);
    };

    const handleQuantityChange = (value: any) => {
        if (value === "0" || value === "") {
            form.setFieldsValue({
                soLuong: 1,
            });
        }
        const giaNhap = form.getFieldValue("giaNhap");
        form.setFieldsValue({
            tongGia: giaNhap * value,
        });
    };
    const handlePriceChange = (value: any) => {
        if (value === "0" || value === "") {
            form.setFieldsValue({
                giaNhap: 1,
            });
        }
        const soLuong = form.getFieldValue("soLuong");
        form.setFieldsValue({
            tongGia: soLuong * value,
        });
    };

    const handleQuantityChangeItem = (value: any, record: any) => {
        if (value === "0" || value === "") {
            value = "1";
        }
        const updatedDataSet = dataSet.map((item) => {
            if (item.key === record.key) {
                const newSoLuong = Number(value);
                const newTongGia = Number(newSoLuong) * Number(item.giaNhap);

                return { ...item, soLuong: newSoLuong, tongGia: newTongGia };
            }
            return item;
        });
        SetDataSet(updatedDataSet);
        const totalPrice = updatedDataSet.reduce((accumulator, value) => {
            return accumulator + Number(value.giaNhap) * Number(value.soLuong);
        }, 0);
        form.setFieldsValue({
            tongTien: totalPrice,
        });
    };

    function arraysAreEqual(arr1: any, arr2: any) {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true;
    }

    const handleAddItem = () => {
        form.validateFields()
            .then(async (values: any) => {
                if (
                    selectedProduct &&
                    form.getFieldValue("giaNhap") !== undefined
                ) {
                    const existingIndex = dataSet.findIndex(
                        (item) => item.maSanPham === selectedProduct.maSanPham
                    );

                    if (existingIndex !== -1) {
                        openNotificationWithIcon(
                            "warning",
                            "Sản phẩm đã có vui lòng sửa số lượng!"
                        );
                    } else {
                        if (props.maHoaDon) {
                            if (arraysAreEqual(dataSet, dataSetTemp)) {
                                const dataTemp = {
                                    key: dataSet.length + 1,
                                    maChiTietHoaDon: 0,
                                    maSanPham: selectedProduct.maSanPham,
                                    tenSanPham: selectedProduct.tenSanPham,
                                    anhDaiDien:
                                        apiImage + selectedProduct.anhDaiDien,
                                    soLuong: Number(values.soLuong),
                                    giaNhap: Number(values.giaNhap),
                                    tongGia: Number(values.tongGia),
                                };

                                const newData = [...dataSet, dataTemp];
                                SetDataSet(newData);
                                SetDataSetTemp(newData);

                                const totalPrice = newData.reduce(
                                    (accumulator, value) => {
                                        return (
                                            accumulator +
                                            Number(value.giaNhap) *
                                                Number(value.soLuong)
                                        );
                                    },
                                    0
                                );
                                form.setFieldsValue({
                                    tongTien: totalPrice,
                                });

                                await updateImportBill({
                                    MaHoaDon: props.maHoaDon,
                                    MaNhaPhanPhoi: values.maNhaPhanPhoi,
                                    KieuThanhToan: values.kieuThanhToan,
                                    TongTien: Number(totalPrice),
                                    MaTaiKhoan: user.mataikhoan,
                                    list_json_chitiethoadonnhap: [
                                        {
                                            MaSanPham:
                                                selectedProduct.maSanPham,
                                            SoLuong: Number(values.soLuong),
                                            GiaNhap: Number(values.giaNhap),
                                            TongGia: Number(values.tongGia),
                                            status: 1,
                                        },
                                    ],
                                });
                                openNotificationWithIcon(
                                    "success",
                                    "Thêm sản phẩm thành công!"
                                );
                                props.fetchData();
                                fetchDetail(props.maHoaDon);
                            } else {
                                openNotificationWithIcon(
                                    "warning",
                                    "Vui lòng cập nhật số lượng sản phẩm đã thêm!"
                                );
                            }
                        } else {
                            const dataTemp = {
                                key: dataSet.length + 1,
                                maChiTietHoaDon: 0,
                                maSanPham: selectedProduct.maSanPham,
                                tenSanPham: selectedProduct.tenSanPham,
                                anhDaiDien:
                                    apiImage + selectedProduct.anhDaiDien,
                                soLuong: Number(values.soLuong),
                                giaNhap: Number(values.giaNhap),
                                tongGia: Number(values.tongGia),
                            };

                            const newData = [...dataSet, dataTemp];
                            SetDataSet(newData);
                            SetDataSetTemp(newData);

                            const totalPrice = newData.reduce(
                                (accumulator, value) => {
                                    return (
                                        accumulator +
                                        Number(value.giaNhap) *
                                            Number(value.soLuong)
                                    );
                                },
                                0
                            );
                            form.setFieldsValue({
                                tongTien: totalPrice,
                            });
                        }
                    }
                } else {
                    openNotificationWithIcon(
                        "warning",
                        "Vui lòng chọn sản phẩm và nhập thông tin!"
                    );
                }
            })
            .catch(async (e) => {
                openNotificationWithIcon("warning", "Thông tin chưa đủ!");
                console.log(e);
            });
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Product[]) => {
            setSelectedRowKeys(selectedRowKeys);
            const listid: any = selectedRows.map(function (value: any) {
                return value.maSanPham;
            });

            const itemDelOld = dataSetTemp.filter((item: any) =>
                listid.includes(item.maSanPham)
            );

            const listiddetail: any = itemDelOld.map(function (value: any) {
                return {
                    Id: value.maChiTietHoaDon,
                    MaSanPham: value.maSanPham,
                    SoLuong: Number(value.soLuong),
                    status: 3,
                };
            });
            setListIdDelete(listid);
            setListIdDetailDelete(listiddetail);
        },
        getCheckboxProps: (record: Product) => ({
            // disabled: record.id === "Disabled User", // Column configuration not to be checked
            // name: record.name,
        }),
    };
    
    const removeItemsByMaSanPham = (
        maSanPhamList: any,
        listChiTietHoaDonDelete: any
    ) => {
        if (maSanPhamList) {
            const updatedDataSet = dataSet.filter(
                (item) => !maSanPhamList.includes(item.maSanPham)
            );
            SetDataSet(updatedDataSet);
            SetDataSetTemp(updatedDataSet);
            const totalPrice = updatedDataSet.reduce((accumulator, value) => {
                return (
                    accumulator + Number(value.giaNhap) * Number(value.soLuong)
                );
            }, 0);
            form.setFieldsValue({
                tongTien: totalPrice,
            });
        }
        if (props.maHoaDon) {
            if (listChiTietHoaDonDelete.length > 0) {
                updateImportBill({
                    MaHoaDon: props.maHoaDon,
                    MaNhaPhanPhoi: form.getFieldValue("maNhaPhanPhoi"),
                    KieuThanhToan: form.getFieldValue("kieuThanhToan"),
                    TongTien: form.getFieldValue("tongTien"),
                    list_json_chitiethoadonnhap: listChiTietHoaDonDelete,
                });
                props.fetchData();
                openNotificationWithIcon("success", "Xoá thành công");
            }
        }
        if (selectedRowKeys.length === 0) {
            openNotificationWithIcon(
                "warning",
                "Bạn chưa chọn sản phẩm để xoá"
            );
        }
    };

    const handleDelItem = () => {
        removeItemsByMaSanPham(listIdDelete, listIdDetailDelete);
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Thông tin hoá đơn"
                cancelText={"Hủy bỏ"}
                okText={"Lưu lại"}
                width={"55vw"}
                open={props.isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    initialValues={{
                        residence: ["zhejiang", "hangzhou", "xihu"],
                        prefix: "86",
                    }}
                    style={{ maxWidth: "100%" }}
                    scrollToFirstError
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="left"
                >
                    <Form.Item
                        style={{ visibility: "hidden" }}
                        name="maHoaDon"
                        label="Mã hoá đơn"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="maNhaPhanPhoi"
                        label="Tên nhà phân phối"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Tên nhà phân phối không được để trống!",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn Tên nhà phân phối"
                            defaultValue={""}
                        >
                            <Option value="" disabled>
                                Chọn nhà phân phối
                            </Option>
                            {nhaPhanPhoi.map(function (value: any, index: any) {
                                return (
                                    <Option
                                        key={index}
                                        value={value.maNhaPhanPhoi}
                                    >
                                        {value.tenNhaPhanPhoi}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="kieuThanhToan"
                        label="Kiểu thanh toán"
                        rules={[
                            {
                                required: true,
                                message: "Kiểu thanh toán không được để trống!",
                            },
                        ]}
                        initialValue={"Tiền Mặt"}
                    >
                        <Select placeholder="Chọn kiểu thanh toán">
                            <Option value="" disabled>
                                Chọn kiểu thanh toán
                            </Option>
                            <Option value="Tiền Mặt">Tiền Mặt</Option>
                            <Option value="Thẻ ATM">Thẻ ngân hàng</Option>
                            <Option value="Thẻ visa">Thẻ visa</Option>
                            <Option value="Thẻ ghi nợ">Thẻ ghi nợ</Option>
                            <Option value="Zalo Pay">Zalo Pay</Option>
                            <Option value="MoMo">MoMo</Option>
                            <Option value="Chuyển khoản">Chuyển khoản</Option>
                            <Option value="Apple Pay">Apple Pay</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="tongTien"
                        label="Tổng tiền"
                        rules={[
                            {
                                required: false,
                                message: "Tổng giá không được để trống!",
                            },
                        ]}
                    >
                        <Input readOnly type="number" />
                    </Form.Item>

                    <div
                        style={{
                            width: "100%",
                            height: "1px",
                            borderTop: "1px solid",
                            marginBottom: "22px",
                        }}
                    ></div>

                    <Form.Item
                        name="maSanPham"
                        label="Tên sản phẩm"
                        rules={[
                            {
                                required: false,
                                message: "Sản phẩm không được để trống!",
                            },
                        ]}
                        initialValue={""}
                    >
                        <Select
                            placeholder="Chọn sản phẩm"
                            onChange={handleProductChange}
                        >
                            <Option value="" disabled>
                                Chọn sản phẩm muốn mua
                            </Option>
                            {product.map(function (value: any, index: any) {
                                return (
                                    <Option key={index} value={value.maSanPham}>
                                        {value.tenSanPham}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="soLuong"
                        label="Số lượng"
                        rules={[
                            {
                                required: false,
                                message: "Số lượng không được để trống!",
                            },
                        ]}
                        initialValue={1}
                    >
                        <Input
                            type="number"
                            onChange={(e) =>
                                handleQuantityChange(e.target.value)
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="giaNhap"
                        label="Giá Nhập"
                        rules={[
                            {
                                required: false,
                                message: "Giá nhập không được để trống!",
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            onChange={(e) => handlePriceChange(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="tongGia"
                        label="Tổng giá"
                        rules={[
                            {
                                required: false,
                                message: "Tổng giá không được để trống!",
                            },
                        ]}
                    >
                        <Input type="number" readOnly />
                    </Form.Item>

                    <div>
                        <MdDelete
                            className="icon-container_delete"
                            onClick={handleDelItem}
                        />
                        <RiAddBoxFill
                            className="icon-container_add"
                            onClick={handleAddItem}
                        />
                    </div>

                    <Table
                        style={{ width: "55vw" }}
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
                </Form>
            </Modal>
        </>
    );
}

export default ImportBillModal;
