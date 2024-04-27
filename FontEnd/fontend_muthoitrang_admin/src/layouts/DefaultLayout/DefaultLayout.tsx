import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, theme } from "antd";
import { FaHatCowboy } from "react-icons/fa";
import { RiBillFill, RiBillLine } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { PiFactoryBold } from "react-icons/pi";
import { MdAccountCircle, MdOutlineSwitchAccount } from "react-icons/md";
import { apiImage } from "../../constant/api";

const { Header, Sider, Content } = Layout;

type User = {
    mataikhoan: any;
    anhdaidien: any;
    hoten: any;
};
const DefaultLayout: React.FC = ({ children }: any) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [dataUser, setDataUser] = useState<User | null>();
    const handlerLogout = () => {
        async function logout() {
            localStorage.setItem("user", JSON.stringify(null));
        }
        logout();
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setDataUser(user);
    }, []);
    return (
        <Layout>
            <Sider trigger={[]} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1" icon={<FaHatCowboy />}>
                        <Link to="/">Thông tin mũ</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<RiBillFill />}>
                        <Link to="/hoadonban">Hoá đơn bán</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<RiBillLine />}>
                        <Link to="/hoadonnhap">Hoá đơn nhập</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<BiSolidCategory />}>
                        <Link to="/danhmuc">Danh mục</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<PiFactoryBold />}>
                        <Link to="/nhaphanphoi">Nhà phân phối</Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<MdOutlineSwitchAccount />}>
                        <Link to="/loaitaikhoan">Loại tài khoản</Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<MdAccountCircle />}>
                        <Link to="/taikhoan">Tài khoản</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: "flex",
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: "16px", width: 64, height: 64 }}
                    />
                    <div style={{display:'flex'}}>
                        <div>
                            <Avatar src={apiImage + dataUser?.anhdaidien} />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                fontSize: "16px",
                                marginLeft: "10px",
                            }}
                        >
                            <span>Xin chào, {dataUser?.hoten}</span>
                        </div>
                        <div style={{marginLeft:'10px'}}>
                            <Link onClick={handlerLogout} to={'/login'} className="btn btn-success btn-add ">
                                Đăng xuất
                            </Link>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: `calc(100vh - 112px)`, 
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
