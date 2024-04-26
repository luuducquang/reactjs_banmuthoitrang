import { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Login.module.scss";
import { login } from "../../service/login.service";
const cx = classNames.bind(styles);

type NotificationType = "success" | "info" | "warning" | "error";

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();

    const onFinish = (values: any) => {
        setLoading(true);
        setTimeout(() => {
            async function loginNow() {
                const res = await login({
                    username: values.username,
                    password: values.password,
                });
                res.isRemember = values.remember;
                if (
                    res != null &&
                    res.message != null &&
                    res.message != "undefined"
                ) {
                    alert(res.message);
                } else {
                    if (res.maLoaitaikhoan === 1 || res.maLoaitaikhoan === 8) {
                        await loginSuccess(res);
                    } else {
                        openNotificationWithIcon(
                            "warning",
                            "Tài khoản khách hàng không thể vào đây!"
                        );
                    }
                }
            }
            loginNow();
            setLoading(false);
        }, 1000);
    };

    const loginSuccess = async (res: any) => {
        localStorage.setItem("user", JSON.stringify(res));
        openNotificationWithIcon(
            "success",
            `Xin chào ${res.hoten} bạn đã đăng nhập thành công`
        );
        navigate("/");
    };

    const openNotificationWithIcon = (type: NotificationType, content: any) => {
        notification[type]({
            message: "Thông Báo",
            description: content,
        });
    };

    useEffect(() => {
        const stringUser = localStorage.getItem("user");
        if (!stringUser) {
            navigate("/login");
            return;
        }
    }, [form]);

    return (
        <div className={cx("login-container")}>
            <Form
                form={form}
                name="login-form"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                className={cx("login-form")}
            >
                <h2 className={cx("login-form-title")}>
                    Đăng nhập admin
                </h2>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className={cx("login-form-button")}
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
