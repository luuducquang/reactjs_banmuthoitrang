import { Flex, Modal, notification } from "antd";
import { deleteProduct } from "../../service/product.service";
import { deleteImportBill } from "../../service/importbill.service";

type NotificationType = "success" | "info" | "warning" | "error";
const ImportBillDelete = (props: any) => {
    const [api, contextHolder] = notification.useNotification();
    const handleOk = async () => {
        props.handleCancelDeleteModal();
        await deleteImportBill(props.listiddel);
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
export default ImportBillDelete;
