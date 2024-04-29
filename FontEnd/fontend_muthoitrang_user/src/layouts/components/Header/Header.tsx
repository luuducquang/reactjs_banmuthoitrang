import React, { createContext, useEffect, useState } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import MenuHeder from "../MenuHeder";
import "./Header.scss";
import logo from "../../../assets/images/logo.jpg";
import { cartState, valueSearchState } from "../../../constant/recoil";
import { apiImage } from "../../../constant/api";
import Search from "antd/es/input/Search";

export const isMenuContext = createContext<{
    isMenu: boolean;
    setIsMenu: any;
}>({
    isMenu: false,
    setIsMenu: () => {},
});

type Img = {
    taikhoan: any;
    anhdaidien: any;
    hoten: any;
};

function Header() {
    const valueCart: any = useRecoilValue(cartState);

    const [loading, setLoading] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [customer, setCustomer] = useState<Img>({
        taikhoan: null,
        anhdaidien: null,
        hoten: null,
    });
    const [isShowOption, setIsShowOption] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();

    const valueSearchProduct: string = useRecoilValue(valueSearchState);

    const handleSearch = (value: any) => {
        if (value !== "") {
            setLoading(true);
            setTimeout(() => {
                navigate(`/search/${value}`);
                setLoading(false);
            }, 1000);
        } else {
        }
    };

    const handleChange = (e: any) => {
        setSearchValue(e.target.value);
    };

    const handleMenu = () => {
        setIsMenu(!isMenu);
    };

    const handlerClickImg = () => {
        setIsShowOption(!isShowOption);
    };

    const handlerLogout = () => {
        localStorage.removeItem("customer");
    };

    const setCartValue = useSetRecoilState(cartState);

    useEffect(() => {
        let productListString = localStorage.getItem("productList");
        let listProduct = productListString
            ? JSON.parse(productListString)
            : [];
        setCartValue(listProduct);

        let customerString = localStorage.getItem("customer");
        let customer = customerString ? JSON.parse(customerString) : [];
        setCustomer(customer);
    }, []);

    useEffect(() => {
        setSearchValue(String(valueSearchProduct));
    }, [valueSearchProduct]);

    return (
        <isMenuContext.Provider value={{ isMenu, setIsMenu }}>
            <div id="header">
                <div onClick={handleMenu} className="ti-menu list">
                    {" "}
                    <FaBars />
                </div>
                <div className="banner">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                {/* --------------Search------------------- */}
                <div className="wrap">
                    <Search
                        placeholder="Nhập từ khóa tìm kiếm"
                        loading={loading}
                        className="custom-search"
                        enterButton
                        onSearch={handleSearch}
                        onChange={handleChange}
                        onSubmit={handleSearch}
                        value={searchValue}
                    />
                    <span className="home-search">
                        <div className="content-search">
                            {/* <a href="">
                      <div class="products-search">
                          <img src="./assets/img/Cleanser/cerave-renewing-sa-face-cleanser-for-normal-skin.png" alt="">
                          <div class="info">
                              <div class="name-search">Sữa rửa mặt Cerave Renewing SA Face Cleaner 473ml</div>
                              <div class="price-search">
                                  <span>399.000</span><sup>đ</sup>
                              </div>
                          </div>
                      </div>
                  </a> */}
                        </div>
                    </span>
                </div>
                {/* ---------------------Shop--------------- */}
                <div className="shopping">
                    <Link to="/cart" className="cartItem">
                        <FaShoppingCart className="fa-cart-shopping shop" />
                        <span className="value-cart">{valueCart.length}</span>
                    </Link>
                </div>
                {/* <div style="display: flex;height: 100%;justify-content: center;align-items: center;">
          <i style="font-size: 25px;" class="fa-solid fa-bell"></i>
      </div> */}
                {/*---------------- Login, Registry -----------*/}
                <div className="User">
                    {customer && Object.keys(customer).length === 0 ? (
                        <>
                            <ul className="Login">
                                <li style={{ display: "flex" }}>
                                    <a href="/login">Đăng nhập</a>
                                </li>
                            </ul>
                            <ul className="Registry">
                                <li style={{ display: "flex" }}>
                                    <a href="/registry">Đăng ký</a>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <div className="imgUser">
                            <div>
                                <img
                                    className="imgCustomer"
                                    title={customer.taikhoan}
                                    src={apiImage + customer.anhdaidien}
                                    alt=""
                                    onClick={handlerClickImg}
                                />
                                {isShowOption ? (
                                    <ul className="OptionUser">
                                        <li>
                                            <a href="/invoice">
                                                Đơn hàng của bạn
                                            </a>
                                        </li>
                                        {/* <li>
                                            <a href="/information">
                                                Thông tin tài khoản
                                            </a>
                                        </li> */}
                                        <li>
                                            <a href="/changepassword">
                                                Đổi mật khẩu
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                onClick={handlerLogout}
                                                href="/login"
                                            >
                                                Đăng xuất
                                            </a>
                                        </li>
                                    </ul>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="helloUser">
                                <p>Xin chào,</p>
                                <p>{customer?.hoten}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <MenuHeder />
        </isMenuContext.Provider>
    );
}

export default Header;
