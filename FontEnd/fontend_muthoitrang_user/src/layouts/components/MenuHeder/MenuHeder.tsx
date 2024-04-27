import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import classNames from "classnames/bind";

import { isMenuContext } from "../Header/Header";
import { getCategory } from "../../../services/home.services";
import styles from './MenuHeader.module.scss'

const cx = classNames.bind(styles);

function MenuHeder() {
    const { isMenu, setIsMenu } = useContext(isMenuContext);
    const [category, setCategory] = useState([]);

    const handleClose = () => {
        setIsMenu(!isMenu);
    };

    
    useEffect(() => {
        async function loadData() {
            const response = await getCategory();
            setCategory(response);
        }
        loadData();
    }, []);

    return (
        <>
            {isMenu && (
                <div className={cx("menu")}>
                    <div className={cx("menu-left")}>
                        <ul className={cx("menu-list")}>
                            <li>
                                <a href="/">Trang chủ</a>
                            </li>
                        </ul>
                        <ul className={cx("menu-list")}>
                            <li>
                                <a href="#">Danh mục</a>
                                <ul className={cx("menu-nav")}>
                                    {category.map(function (
                                        value: any,
                                        index: any
                                    ) {
                                        return (
                                            <li key={index}>
                                                <a
                                                    href={`/category/${value.tenDanhMuc}`}
                                                >
                                                    {value.tenDanhMuc}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div onClick={handleClose} className={cx("close-menu")}>
                        <IoClose/>
                    </div>
                </div>
            )}
        </>
    );
}

export default MenuHeder;
