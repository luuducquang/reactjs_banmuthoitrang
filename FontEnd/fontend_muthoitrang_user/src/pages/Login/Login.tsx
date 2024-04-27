import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { login } from "../../services/login.service";

const cx = classNames.bind(styles);

type NotificationType = "success" | "info" | "warning" | "error";

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, content: any) => {
        notification[type]({
            message: "Thông Báo",
            description: content,
        });
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const res = await login({
                username: values.username,
                password: values.password,
            });
            res.isRemember = values.remember;

            if (res.message) {
                openNotificationWithIcon("error", res.message);
            } else {
                await loginSuccess(res);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            openNotificationWithIcon(
                "error",
                "An error occurred while logging in."
            );
        } finally {
            setLoading(false);
        }
    };

    const loginSuccess = async (res: any) => {
        localStorage.setItem("customer", JSON.stringify(res));
        openNotificationWithIcon(
            "success",
            `Xin chào ${res.hoten} bạn đã đăng nhập thành công`
        );
        navigate("/");
    };

    useEffect(() => {
        const stringUser = localStorage.getItem("customer");
        let userLocalStorage;
        if (!stringUser) {
            navigate("/login");
            return;
        }
        userLocalStorage = JSON.parse(stringUser);
        if (userLocalStorage?.isRemember) {
            form.setFieldsValue({
                username: userLocalStorage.taikhoan,
                remember: true,
            });
        }
    }, [form]);

    return (
        <div className={cx("wrapper")}>
            <Form
                form={form}
                name="login-form"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                className={cx("login-form")}
            >
                <h2 className={cx("login-form-title")}>Login Skin Care</h2>
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

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox style={{ color: "#fff" }}>
                        Remember username <Link to="/registry">Create account</Link>
                    </Checkbox>
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 0,
                }}
            >
                <div style={{ color: "#fff", fontSize: 11, marginTop: 25 }}>
                    Phần mềm quản lý mỹ phẩm{" "}
                    <i className="fa-solid fa-copyright" /> SkinCare 2023 by
                    LuuDucQuang{" "}
                </div>
            </div>
        </div>
    );
}

export default Login;
