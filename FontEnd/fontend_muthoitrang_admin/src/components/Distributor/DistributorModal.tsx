import { Button, Form, Input, Modal, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { createCategory, updateCategory } from "../../service/category.service";
import {
    createDistributor,
    updateDistributor,
} from "../../service/distributor.service";

type NotificationType = "success" | "info" | "warning" | "error";
const { Option } = Select;

function DistributorModal(props: any) {
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
                if (props.maNhaPhanPhoi) {
                    props.handleCancelIUModal();
                    await updateDistributor({
                        MaNhaPhanPhoi: values.maNhaPhanPhoi,
                        TenNhaPhanPhoi: values.tenNhaPhanPhoi,
                        DiaChi: values.diaChi,
                        SoDienThoai: values.soDienThoai,
                        LinkWeb: values.linkWeb,
                        MoTa: values.moTa,
                    });
                    props.fetchData();
                    openNotificationWithIcon("success", "Cập nhật thành công!");
                } else {
                    props.handleCancelIUModal();
                    await createDistributor({
                        TenNhaPhanPhoi: values.tenNhaPhanPhoi,
                        DiaChi: values.diaChi,
                        SoDienThoai: values.soDienThoai,
                        LinkWeb: values.linkWeb,
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
        if (props.maNhaPhanPhoi !== "" && props.maNhaPhanPhoi !== undefined) {
            form.setFieldsValue(props.record);
        } else {
            form.resetFields();
        }
    }, [props.maNhaPhanPhoi, props.record]);

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
                        name="maNhaPhanPhoi"
                        label="Mã nhà phân phối"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="tenNhaPhanPhoi"
                        label="Tên nhà phân phối"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Tên nhà phân phối không được để trống!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="diaChi"
                        label="Địa chỉ"
                        rules={[
                            {
                                required: true,
                                message: "Địa chỉ không được để trống!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="soDienThoai"
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
                        name="linkWeb"
                        label="Link web"
                        rules={[
                            {
                                required: true,
                                message: "Link web không được để trống!",
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

export default DistributorModal;
