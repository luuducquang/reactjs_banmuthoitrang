import ContentHome from "../../layouts/components/ContentHome";
import SaleProduct from "../../layouts/components/SaleProduct";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { notification } from "antd";

const cx = classNames.bind(styles);
type NotificationType = "success" | "info" | "warning" | "error";

function Home() {
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
    return (
        <>
            {contextHolder}
            <div className={cx("content")}>
                <ContentHome>
                    <SaleProduct />
                </ContentHome>
            </div>
        </>
    );
}

export default Home;
