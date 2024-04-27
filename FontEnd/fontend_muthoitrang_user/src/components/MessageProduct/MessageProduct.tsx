import React from "react";
import classNames from "classnames/bind";

import styles from "./MessageProduct.module.scss";
import { FaCheckCircle } from "react-icons/fa";

const cx = classNames.bind(styles);

function MessageProduct({ title, display = "none" }: any) {
    const [show, setShow] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={cx("chilFrame")} style={{ display: display }}>
            {show && (
                <div className={cx("last")}>
                    <div className={cx("product-last")}>
                        <div className={cx("product-last-icon")}>
                            <FaCheckCircle className={cx("fa-circle-check")}/>
                        </div>
                        <div className={cx("product-last-name")}>{title}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MessageProduct;
