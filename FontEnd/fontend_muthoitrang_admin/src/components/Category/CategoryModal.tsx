import { Button, Form, Input, Modal, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { createCategory, updateCategory } from "../../service/category.service";

type NotificationType = "success" | "info" | "warning" | "error";
const { Option } = Select;

function CategoryModal(props: any) {
    const [form] = Form.useForm();
    const { TextArea } = Input;

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
                if (props.maDanhMuc) {
                    props.handleCancelIUModal();
                    await updateCategory({
                        MaDanhMuc: props.maDanhMuc,
                        TenDanhMuc: values.tenDanhMuc,
                        DacBiet: values.dacBiet === "Hoạt động",
                        NoiDung: values.noiDung,
                    });
                    props.fetchData();
                    openNotificationWithIcon("success", "Cập nhật thành công!");
                } else {
                    props.handleCancelIUModal();
                    await createCategory({
                        TenDanhMuc: values.tenDanhMuc,
                        DacBiet: values.dacBiet === "Hoạt động",
                        NoiDung: values.noiDung,
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
        if (props.maDanhMuc !== "" && props.maDanhMuc !== undefined) {
            form.setFieldsValue(props.record);
        } else {
            form.resetFields();
        }
    }, [props.maDanhMuc, props.record]);

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
                        name="maDanhMuc"
                        label="Mã danh mục"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="tenDanhMuc"
                        label="Tên danh mục"
                        rules={[
                            {
                                required: true,
                                message: "Tên Danh Mục không được để trống!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="noiDung"
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

export default CategoryModal;
