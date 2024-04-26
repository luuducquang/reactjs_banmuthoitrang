import { Flex, Modal, notification } from "antd";
import { deleteCategory } from "../../service/category.service";

type NotificationType = "success" | "info" | "warning" | "error";
const CategoryDelete = (props: any) => {
    const [api, contextHolder] = notification.useNotification();
    const handleOk = async () => {
        props.handleCancelDeleteModal();
        await deleteCategory(props.listiddel);
        props.fetchData();
        props.onDeleteSuccess();
        openNotificationWithIcon("success");
    };

    const handleCancel = () => {
        props.handleCancelDeleteModal();
    };

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: "Thông báo",
            description: "Xóa thông tin thành công!",
        });
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Xóa thông tin"
                open={props.isOpenDeleteModal}
                cancelText={"Hủy bỏ"}
                okText={"Xóa"}
                width={"40vw"}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(child) => {
                    return (
                        <>
                            <hr
                                style={{
                                    color: "#F8F3F3",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                }}
                            />
                            <Flex justify={"flex-end"} align="center" gap={8}>
                                {child}
                            </Flex>
                        </>
                    );
                }}
            >
                <div>Bạn có muốn xóa thông tin không?</div>
            </Modal>
        </>
    );
};
export default CategoryDelete;
