import { Button, Form, Input, Modal, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { createCategory, updateCategory } from "../../service/category.service";
import {
    createTypeAccount,
    updateTypeAccount,
} from "../../service/typeaccount.service";

type NotificationType = "success" | "info" | "warning" | "error";

function TypeAccountModal(props: any) {
    const [form] = Form.useForm();

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

    const handleOk = () => {
        form.validateFields()
            .then(async (values: any) => {
                if (props.maLoaitaikhoan) {
                    props.handleCancelIUModal();
                    await updateTypeAccount({
                        MaLoaitaikhoan: props.maLoaitaikhoan,
                        TenLoai: values.tenLoai,
                        MoTa: values.moTa,
                    });
                    props.fetchData();
                    openNotificationWithIcon("success", "Cập nhật thành công!");
                } else {
                    props.handleCancelIUModal();
                    await createTypeAccount({
                        TenLoai: values.tenLoai,
                        MoTa: values.moTa,
                    });
                    props.fetchData();
                    openNotificationWithIcon("success", "Thêm thành công!");
                }
            })
            .catch(async () => {
                openNotificationWithIcon("warning", "Thông tin chưa đủ!");
            });
    };

    const handleCancel = () => {
        props.handleCancelIUModal();
    };

    useEffect(() => {
        if (props.maLoaitaikhoan !== "" && props.maLoaitaikhoan !== undefined) {
            form.setFieldsValue(props.record);
        } else {
            form.resetFields();
        }
    }, [props.maLoaitaikhoan, props.record]);

    return (
        <>
            {contextHolder}
            <Modal
                title="Thông tin tin tức"
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
                        name="maLoaitaikhoan"
                        label="Mã loại tài khoản"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="tenLoai"
                        label="Tên loại tài khoản"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Tên loại tài khoản không được để trống!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="moTa"
                        label="Mô tả"
                        rules={[
                            {
                                required: true,
                                message: "Mô tả không được để trống!",
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

export default TypeAccountModal;
