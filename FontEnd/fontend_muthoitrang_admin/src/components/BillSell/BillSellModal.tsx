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

import "./BillSellModal.scss";

type NotificationType = "success" | "info" | "warning" | "error";
const { Option } = Select;

interface Product {
    key: React.Key;
    maSanPham: any;
    maChiTietHoaDon: any;
    tenSanPham: any;
    giaGiam: any;
    anhDaiDien: any;
    soLuong: any;
    donGia: any;
    tongGia: any;
}

function BillSellModal(props: any) {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [listIdDelete, setListIdDelete] = useState([]);
    const [listIdDetailDelete, setListIdDetailDelete] = useState([]);

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

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    async function fetchData() {
        const resProduct = await getAllProduct();
        setProduct(resProduct);
    }

    async function fetchDetail(maHoaDon: any) {
        const resDetailBill = await getDetailBillById(maHoaDon);
        const dataSetDetail = resDetailBill.map((value: any, index: any) => {
            return {
                key: index + 1,
                maChiTietHoaDon: value.maChiTietHoaDon,
                maSanPham: value.maSanPham,
                tenSanPham: value.tenSanPham,
                giaGiam: value.giaGiam,
                anhDaiDien: apiImage + value.anhDaiDien,
                soLuong: value.soLuong,
                donGia: value.donGia,
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
                donGia: "",
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
                        if (values.trangThai === "Huỷ đơn") {
                            const listitemDeleted = dataSet.map(
                                (value: any) => {
                                    return {
                                        MaChiTietHoaDon: value.maChiTietHoaDon,
                                        MaSanPham: value.maSanPham,
                                        SoLuongTon: value.soLuong,
                                        Status: 4,
                                    };
                                }
                            );
                            await updateBillSell({
                                MaHoaDon: props.maHoaDon,
                                TrangThai: values.trangThai,
                                TongGia: String(values.tongTien).replace(
                                    /\./g,
                                    ""
                                ),
                                TenKH: values.tenKH,
                                DiaChi: values.diaChiGiaoHang,
                                Email: values.email,
                                SDT: values.sdt,
                                DiaChiGiaoHang: values.diaChiGiaoHang,
                                MaTaiKhoan: user.mataikhoan,
                                list_json_chitiet_hoadon: listitemDeleted,
                            });
                            openNotificationWithIcon(
                                "success",
                                "Huỷ đơn thành công!"
                            );
                        } else {
                            await updateBillSell({
                                MaHoaDon: props.maHoaDon,
                                TrangThai: values.trangThai,
                                TongGia: String(values.tongTien).replace(
                                    /\./g,
                                    ""
                                ),
                                TenKH: values.tenKH,
                                DiaChi: values.diaChiGiaoHang,
                                Email: values.email,
                                SDT: values.sdt,
                                DiaChiGiaoHang: values.diaChiGiaoHang,
                                MaTaiKhoan: user.mataikhoan,
                                list_json_chitiet_hoadon: [
                                    {
                                        MaChiTietHoaDon: 0,
                                        MaSanPham: 0,
                                        SoLuong: 0,
                                        TongGia: 0,
                                        status: 0,
                                    },
                                ],
                            });
                            openNotificationWithIcon(
                                "success",
                                "Cập nhật thành công!"
                            );
                        }
                        props.fetchData();
                    } else {
                        const listDataProduct = dataSet.map((value: any) => {
                            return {
                                MaSanPham: value.maSanPham,
                                SoLuong: Number(values.soLuong),
                                DonGia: Number(values.donGia),
                                TongGia: Number(values.tongGia),
                            };
                        });
                        props.handleCancelIUModal();
                        await createBillSell({
                            TrangThai: values.trangThai,
                            TongGia: String(values.tongTien).replace(/\./g, ""),
                            TenKH: values.tenKH,
                            DiaChi: values.diaChiGiaoHang,
                            Email: values.email,
                            SDT: values.sdt,
                            DiaChiGiaoHang: values.diaChiGiaoHang,
                            MaTaiKhoan: user.mataikhoan,
                            list_json_chitiet_hoadon: listDataProduct,
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
                    style={{ width: "100px" }}
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
            title: "Đơn giá",
            dataIndex: "donGia",
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
                                        Number(record.donGia),
                                };
                            }
                            return item;
                        });
                        SetDataSetTemp(updatedDataSetTemp);
                        SetDataSet(updatedDataSetTemp);

                        await updateBillSell({
                            MaHoaDon: props.maHoaDon,
                            TrangThai: form.getFieldValue("trangThai"),
                            TongGia: form.getFieldValue("tongTien"),
                            TenKH: form.getFieldValue("tenKH"),
                            DiaChi: form.getFieldValue("diaChiGiaoHang"),
                            Email: form.getFieldValue("email"),
                            SDT: form.getFieldValue("sdt"),
                            DiaChiGiaoHang:
                                form.getFieldValue("diaChiGiaoHang"),
                            list_json_chitiet_hoadon: [
                                {
                                    MaChiTietHoaDon: record.maChiTietHoaDon,
                                    MaSanPham: record.maSanPham,
                                    SoLuong: Number(record.soLuong),
                                    SoLuongTon:
                                        Number(record.soLuong) -
                                        Number(dataProductLast?.soLuong),
                                    DonGia: Number(record.donGia),
                                    TongGia:
                                        Number(record.donGia) *
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
                    MaChiTietHoaDon: value.maChiTietHoaDon,
                    MaSanPham: value.maSanPham,
                    SoLuongTon: Number(value.soLuong),
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

    const handleProductChange = (value: any) => {
        const selectedProduct = product.find(
            (item) => item.maSanPham === value
        );
        setSelectedProduct(selectedProduct);
        form.setFieldsValue({
            donGia: selectedProduct ? selectedProduct.giaGiam : null,
            tongGia: selectedProduct ? selectedProduct.giaGiam : null,
        });
    };

    const handleQuantityChange = (value: any) => {
        if (value === "0" || value==="") {
            form.setFieldsValue({
                soLuong: 1,
            });
        }
        const donGia = form.getFieldValue("donGia");
        form.setFieldsValue({
            tongGia: donGia * value,
        });
    };

    const handleQuantityChangeItem = (value: any, record: any) => {
        if (value === "0" || value==="") {
            value = "1";
        }
        const updatedDataSet = dataSet.map((item) => {
            if (item.key === record.key) {
                const newSoLuong = Number(value);
                const newTongGia = Number(newSoLuong) * Number(item.donGia);

                return { ...item, soLuong: newSoLuong, tongGia: newTongGia };
            }
            return item;
        });
        SetDataSet(updatedDataSet);
        const totalPrice = updatedDataSet.reduce((accumulator, value) => {
            return accumulator + Number(value.donGia) * Number(value.soLuong);
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
                if (selectedProduct) {
                    const existingIndex = dataSet.findIndex(
                        (item) => item.maSanPham === selectedProduct.maSanPham
                    );

                    if (existingIndex !== -1) {
                        // const updatedDataSet = [...dataSet];
                        // updatedDataSet[existingIndex].soLuong =
                        //     Number(updatedDataSet[existingIndex].soLuong) +
                        //     Number(values.soLuong);
                        // updatedDataSet[existingIndex].tongGia =
                        //     Number(updatedDataSet[existingIndex].tongGia) +
                        //     Number(values.tongGia);
                        // SetDataSet(updatedDataSet);
                        // const totalPrice = updatedDataSet.reduce(
                        //     (accumulator, value) => {
                        //         return (
                        //             accumulator +
                        //             Number(value.donGia) * Number(value.soLuong)
                        //         );
                        //     },
                        //     0
                        // );
                        // form.setFieldsValue({
                        //     tongTien: totalPrice,
                        // });
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
                                    giaGiam: selectedProduct.giaGiam,
                                    anhDaiDien:
                                        apiImage + selectedProduct.anhDaiDien,
                                    soLuong: Number(values.soLuong),
                                    donGia: Number(values.donGia),
                                    tongGia: Number(values.tongGia),
                                };

                                const newData = [...dataSet, dataTemp];
                                SetDataSet(newData);
                                SetDataSetTemp(newData);

                                const totalPrice = newData.reduce(
                                    (accumulator, value) => {
                                        return (
                                            accumulator +
                                            Number(value.donGia) *
                                                Number(value.soLuong)
                                        );
                                    },
                                    0
                                );
                                form.setFieldsValue({
                                    tongTien: totalPrice,
                                });

                                await updateBillSell({
                                    MaHoaDon: props.maHoaDon,
                                    TrangThai: values.trangThai,
                                    TongGia: totalPrice,
                                    TenKH: values.tenKH,
                                    DiaChi: values.diaChiGiaoHang,
                                    Email: values.email,
                                    SDT: values.sdt,
                                    DiaChiGiaoHang: values.diaChiGiaoHang,
                                    MaTaiKhoan: user.mataikhoan,
                                    list_json_chitiet_hoadon: [
                                        {
                                            MaSanPham:
                                                selectedProduct.maSanPham,
                                            SoLuong: Number(values.soLuong),
                                            SoLuongTon: Number(values.soLuong),
                                            DonGia: Number(values.donGia),
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
                                giaGiam: selectedProduct.giaGiam,
                                anhDaiDien:
                                    apiImage + selectedProduct.anhDaiDien,
                                soLuong: Number(values.soLuong),
                                donGia: Number(values.donGia),
                                tongGia: Number(values.tongGia),
                            };

                            const newData = [...dataSet, dataTemp];
                            SetDataSet(newData);
                            SetDataSetTemp(newData);

                            const totalPrice = newData.reduce(
                                (accumulator, value) => {
                                    return (
                                        accumulator +
                                        Number(value.donGia) *
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
                        "Vui lòng chọn sản phẩm!"
                    );
                }
            })
            .catch(async (e) => {
                openNotificationWithIcon("warning", "Thông tin chưa đủ!");
                console.log(e);
            });
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
                    accumulator + Number(value.donGia) * Number(value.soLuong)
                );
            }, 0);
            form.setFieldsValue({
                tongTien: totalPrice,
            });
        }
        if (props.maHoaDon) {
            if (listChiTietHoaDonDelete.length > 0) {
                updateBillSell({
                    MaHoaDon: props.maHoaDon,
                    TrangThai: form.getFieldValue("trangThai"),
                    TongGia: form.getFieldValue("tongTien"),
                    TenKH: form.getFieldValue("tenKH"),
                    DiaChi: form.getFieldValue("diaChiGiaoHang"),
                    Email: form.getFieldValue("email"),
                    SDT: form.getFieldValue("sdt"),
                    DiaChiGiaoHang: form.getFieldValue("diaChiGiaoHang"),
                    list_json_chitiet_hoadon: listChiTietHoaDonDelete,
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
                        name="tenKH"
                        label="Tên khách hàng"
                        rules={[
                            {
                                required: true,
                                message: "Tên khách hàng không được để trống!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="sdt"
                        label="Số điện thoại"
                        rules={[
                            {
                                required: true,
                                message: "Số điện thoại không được để trống!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Email không được để trống!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="diaChiGiaoHang"
                        label="Địa chỉ giao"
                        rules={[
                            {
                                required: true,
                                message: "Địa chỉ giao không được để trống!",
                            },
                        ]}
                    >
                        <Input />
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

                    <Form.Item
                        name="trangThai"
                        label="Trạng thái"
                        rules={[
                            {
                                required: true,
                                message: "Trạng thái không được để trống!",
                            },
                        ]}
                        initialValue={"Đang xử lý"}
                    >
                        <Select
                            placeholder="Chọn trạng thái"
                            disabled={
                                props.maHoaDon !== "" &&
                                props.maHoaDon !== undefined
                                    ? false
                                    : true
                            }
                        >
                            <Option value="" disabled>
                                Chọn trạng thái
                            </Option>
                            <Option value="Đang xử lý">Đang xử lý</Option>
                            <Option value="Đang giao hàng">
                                Đang giao hàng
                            </Option>
                            <Option value="Đã giao hàng">Đã giao hàng</Option>
                            <Option value="Đổi hàng">Đổi hàng</Option>
                            <Option value="Trả hàng">Trả hàng</Option>
                            <Option value="Hoàn tất">Hoàn tất</Option>
                            <Option value="Huỷ đơn">Huỷ đơn</Option>
                        </Select>
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
                                {" "}
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
                        name="donGia"
                        label="Đơn giá"
                        rules={[
                            {
                                required: false,
                                message: "Đơn giá không được để trống!",
                            },
                        ]}
                    >
                        <Input type="number" readOnly />
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

export default BillSellModal;
