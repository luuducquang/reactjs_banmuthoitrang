import { Link, useNavigate } from "react-router-dom";
import "./Registry.scss";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useState } from "react";
import {
    checkUserNameIsEmpty,
    registryUser,
} from "../../services/registry.service";

type NotificationType = "success" | "info" | "warning" | "error";

function Registry() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, content: any) => {
        notification[type]({
            message: "Thông Báo",
            description: content,
        });
    };

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        setLoading(true);
        setTimeout(function () {
            async function Registry(username: any) {
                try {
                    const resCheckUser = await checkUserNameIsEmpty();
                    const userEmpty = resCheckUser.map(
                        (value: any) => value.tenTaiKhoan
                    );
                    if (userEmpty.includes(username)) {
                        openNotificationWithIcon(
                            "error",
                            "Tên đăng nhập đã tồn tại"
                        );
                    } else {
                        await registryUser({
                            TenTaiKhoan: values.taikhoan,
                            MatKhau: values.matkhau2,
                            Email: values.email,
                            list_json_chitiet_taikhoan: [
                                {
                                    MaLoaitaikhoan: 2,
                                    AnhDaiDien: "/img/user.jpg",
                                    HoTen: values.hoten,
                                    DiaChi: "",
                                    SoDienThoai: values.sodienthoai,
                                },
                            ],
                        });
                        openNotificationWithIcon(
                            "success",
                            "Đăng ký thành công"
                        );
                        navigate("/login");
                    }
                } catch (error) {
                    console.error("Error while checking username:", error);
                }
            }
            Registry(values.taikhoan);

            setLoading(false);
        }, 1000);
    };

    return (
        <div id="wrapper">
            <Form
                form={form}
                name="register-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className="form-login"
            >
                <h1 className="form-heading">Đăng ký tài khoản</h1>
                <Form.Item
                    name="taikhoan"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input
                        prefix={<i className="fa-solid fa-user" />}
                        placeholder="Tên đăng nhập"
                    />
                </Form.Item>
                <Form.Item
                    name="hoten"
                    rules={[
                        {
                            required: true,
                            message: "Please input your full name!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <i className="fa-sharp fa-solid fa-user-secret" />
                        }
                        placeholder="Họ và tên"
                    />
                </Form.Item>
                <Form.Item
                    name="sodienthoai"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        prefix={<i className="fa-solid fa-phone" />}
                        placeholder="Nhập số điện thoại"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                    ]}
                >
                    <Input
                        prefix={<i className="fa-solid fa-envelope" />}
                        type="email"
                        placeholder="Nhập địa chỉ email"
                    />
                </Form.Item>
                <Form.Item
                    name="matkhau"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<i className="fa-solid fa-lock" />}
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <Form.Item
                    name="matkhau2"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password again!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("matkhau") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The two passwords that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<i className="fa-solid fa-lock" />}
                        placeholder="Nhập lại mật khẩu"
                    />
                </Form.Item>
                <Form.Item
                    name="checkrule"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          new Error(
                                              "Please accept the terms and conditions!"
                                          )
                                      ),
                        },
                    ]}
                >
                    <Checkbox>
                        Tôi đã đọc và đồng ý với{" "}
                        <a href="#">điều khoản chung</a> và{" "}
                        <a href="#">chính sách bảo mật của SkinCare</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="form-submit"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        Đăng ký
                    </Button>
                </Form.Item>
                <div className="register">
                    <ul>Tôi đã có tài khoản</ul>
                    <Link to="/login">Đăng nhập</Link>
                </div>
            </Form>
        </div>
    );
}

export default Registry;
