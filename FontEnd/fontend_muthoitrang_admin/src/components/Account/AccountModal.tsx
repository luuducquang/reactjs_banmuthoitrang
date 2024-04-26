import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Space,
    Upload,
    UploadFile,
    UploadProps,
    notification,
} from "antd";
import { apiImage } from "../../constant/api";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
    checkUserNameIsEmpty,
    createAccount,
    getDetailAccount,
    getListTypeAccount,
    updateAccount,
} from "../../service/account.service";

type NotificationType = "success" | "info" | "warning" | "error";
const { Option } = Select;

type User = {
    mataikhoan: any;
};

type DetailAccount = {
    maChitietTaiKhoan: any;
    maLoaitaikhoan: any;
};

function AccountModal(props: any) {
    const [form] = Form.useForm();
    const { TextArea } = Input;

    const [dataUser, setDataUser] = useState<User>({ mataikhoan: "" });

    const [idDetailAccount, setIdDetailAccount] = useState<DetailAccount[]>([]);

    const [dataTypeAccount, setDataTypeAccount] = useState<DetailAccount[]>([]);

    const [api, contextHolder] = notification.useNotification();

    const [hinhAnh, setHinhAnh] = useState<UploadFile[]>([]);

    const openNotificationWithIcon = (
        type: NotificationType,
        content: string
    ) => {
        api[type]({
            message: "Thông báo",
            description: content,
        });
    };

    const handleUploadChange = ({ fileList }: { fileList: any }) => {
        setHinhAnh(fileList);
    };

    const handleOk = () => {
        form.validateFields()
            .then(async (values: any) => {
                if (!hinhAnh || hinhAnh.length === 0) {
                    openNotificationWithIcon(
                        "warning",
                        "Ảnh không được để trống!"
                    );
                    return;
                }
                if (props.maTaiKhoan) {
                    props.handleCancelIUModal();
                    await updateAccount({
                        MaTaiKhoan: props.maTaiKhoan,
                        TenTaiKhoan: values.tenTaiKhoan,
                        MatKhau: values.matKhau,
                        Email: values.email,
                        list_json_chitiet_taikhoan: [
                            {
                                MaChitietTaiKhoan:
                                    idDetailAccount[0].maChitietTaiKhoan,
                                MaLoaitaikhoan: values.maLoaitaikhoan,
                                AnhDaiDien: `/img/${hinhAnh[0].name}`,
                                HoTen: values.hoTen,
                                DiaChi: values.diaChi,
                                SoDienThoai: values.soDienThoai,
                                status: 2,
                            },
                        ],
                    });
                    props.fetchData();
                    openNotificationWithIcon("success", "Cập nhật thành công!");
                } else {
                    const resCheckUser = await checkUserNameIsEmpty();
                    const userEmpty = resCheckUser.map(
                        (value: any) => value.tenTaiKhoan
                    );
                    if (userEmpty.includes(values.tenTaiKhoan)) {
                        openNotificationWithIcon(
                            "error",
                            "Tên đăng nhập đã tồn tại"
                        );
                    } else {
                        props.handleCancelIUModal();
                        await createAccount({
                            TenTaiKhoan: values.tenTaiKhoan,
                            MatKhau: values.matKhau,
                            Email: values.email,
                            list_json_chitiet_taikhoan: [
                                {
                                    MaLoaitaikhoan: values.maLoaitaikhoan,
                                    AnhDaiDien: `/img/${hinhAnh[0].name}`,
                                    HoTen: values.hoTen,
                                    DiaChi: values.diaChi,
                                    SoDienThoai: values.soDienThoai,
                                },
                            ],
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

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const upload_props: UploadProps = {
        name: "file",
        action: apiImage + "/api/Image/upload",
        headers: {
            authorization: "Bearer " + user.token,
        },
        onChange(info) {
            if (info.file.status === "done") {
                form.setFieldValue(
                    "image_url",
                    info.fileList[0].response.filePath
                );
            }
        },
    };

    const fetchData = async (maTaiKhoan: any) => {
        let data = await getDetailAccount(maTaiKhoan);
        const dataForm = { ...data[0], ...props.record };
        form.setFieldsValue(dataForm);
        setIdDetailAccount(data);
        setHinhAnh([
            {
                uid: "0",
                name: dataForm.anhDaiDien.slice(5),
                status: "done",
                url: apiImage + dataForm.anhDaiDien,
            },
        ]);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setDataUser(user);
        if (props.maTaiKhoan !== "" && props.maTaiKhoan !== undefined) {
            fetchData(props.maTaiKhoan);
        } else {
            form.resetFields();
            setHinhAnh([]);
        }
    }, [props.maTaiKhoan]);

    useEffect(() => {
        async function fetchTypeAccount() {
            const resTypeAccount = await getListTypeAccount();
            setDataTypeAccount(resTypeAccount);
        }
        fetchTypeAccount();
    }, []);

    return (
        <>
            {contextHolder}
            <Modal
                title="Thông tin tài khoản"
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
                        name="maTaiKhoan"
                        label="Mã tài khoản"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="tenTaiKhoan"
                        label="Tên Tài Khoản"
                        rules={[
                            {
                                required: true,
                                message: "Tên tài khoản không được để trống!",
                            },
                        ]}
                    >
                        <Input disabled={props.maTaiKhoan ? true : false} />
                    </Form.Item>

                    <Form.Item
                        name="matKhau"
                        label="Mật Khẩu"
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu không được để trống!",
                            },
                        ]}
                    >
                        <Input type="password" />
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
                        name="soDienThoai"
                        label="Số Điện Thoại"
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
                        name="maLoaitaikhoan"
                        label="Loại Tài Khoản"
                        rules={[
                            {
                                required: true,
                                message: "Loại Tài Khoản không được để trống!",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn loại tài khoản"
                            defaultValue={""}
                        >
                            <Option value="" disabled>Chọn loại tài khoản</Option>
                            {dataTypeAccount.map(function (
                                value: any,
                                index: any
                            ) {
                                return (
                                    <Option
                                        key={index}
                                        value={value.maLoaitaikhoan}
                                    >
                                        {value.tenLoai}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="anhDaiDien"
                        label="Ảnh Đại Diện"
                        rules={[
                            {
                                required: true,
                                message: "Ảnh không được để trống!",
                            },
                        ]}
                    >
                        <Space
                            direction="vertical"
                            style={{ width: "100%" }}
                            size="large"
                        >
                            <Upload
                                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                {...upload_props}
                                listType="picture"
                                maxCount={1}
                                onChange={handleUploadChange}
                                fileList={hinhAnh}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload
                                </Button>
                            </Upload>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        name="hoTen"
                        label="Họ Tên"
                        rules={[
                            {
                                required: true,
                                message: "Họ tên không được để trống!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="diaChi"
                        label="Địa Chỉ"
                        rules={[
                            {
                                required: true,
                                message: "Địa chỉ không được để trống!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AccountModal;
