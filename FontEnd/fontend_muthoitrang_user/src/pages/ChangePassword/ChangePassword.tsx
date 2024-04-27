import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./ChangePassword.module.scss";
import { Button, Form, Input, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
    changePasswordUser,
    checkUser,
} from "../../services/changepassword.service";

const cx = classNames.bind(styles);

function ChangePassword() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("customer") || "{}");

    const onFinish = async (values: any) => {
        setLoading(true);
        setTimeout(async () => {
            const res = await checkUser(user.mataikhoan);
            if (res[0].matKhau === values.currentPassword) {
                await changePasswordUser({
                    TenTaiKhoan: user.taikhoan,
                    MatKhau: values.confirmPassword,
                });
                setLoading(false);
                notification.success({
                    message: "Thành công",
                    description: "Mật khẩu đã được thay đổi thành công!",
                });
                form.resetFields();
            } else {
                setLoading(false);
                notification.warning({
                    message: "Không thành công",
                    description: "Mật khẩu cũ không đúng!",
                });
            }
        }, 1000);
    };

    return (
        <div style={{ marginTop: 85 }} className={cx("content")}>
            <div className={cx("cleanser")}>
                <div style={{ marginTop: 10 }} className={cx("type")}>
                    <Link to="/">Trang chủ</Link>
                    <FaLongArrowAltRight className={cx("arrow-item")} />
                    <Link to={`/changepassword`}>Đổi mật khẩu</Link>
                </div>
                <div className={cx("news")}>
                    <Form
                        form={form}
                        name="change_password"
                        onFinish={onFinish}
                        className={cx("ant-form")}
                    >
                        <Form.Item
                            name="currentPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu hiện tại!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Mật khẩu hiện tại"
                            />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu mới!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Mật khẩu mới"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={["newPassword"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng xác nhận mật khẩu mới!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("newPassword") ===
                                                value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "Mật khẩu xác nhận không khớp!"
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Xác nhận mật khẩu mới"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{ width: "100%" }}
                            >
                                Đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
