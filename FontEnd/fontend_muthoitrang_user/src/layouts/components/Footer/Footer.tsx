import {
    FaCcMastercard,
    FaCcPaypal,
    FaCcVisa,
    FaCreditCard,
    FaFacebook,
    FaInstagram,
} from "react-icons/fa6";

import "./Footer.scss";

function Footer() {
    return (
        <>
            <div id="footer">
                <div className="footer-suport">
                    <div className="suport">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="title-footer">
                                        HỖ TRỢ KHÁCH HÀNG
                                    </td>
                                    <td className="title-footer">
                                        VỀ CHÚNG TÔI
                                    </td>
                                    <td className="title-footer">
                                        MẠNG XÃ HỘI
                                    </td>
                                    <td className="title-footer">FANPAGE</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="fa-sharp fa-solid fa-play" />
                                        <span>
                                            <a href="">Hướng dẫn mua hàng</a>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="fa-sharp fa-solid fa-play" />
                                        <span>
                                            <a href="">Sứ mệnh và tầm nhìn</a>
                                        </span>
                                    </td>
                                    <td rowSpan={2}>
                                        <a href="#">
                                            <FaFacebook className="fa-brands fa-square-facebook" />
                                        </a>
                                        <a href="">
                                            <FaInstagram className="fa-brands fa-instagram" />
                                        </a>
                                    </td>
                                    <td className="img-fanpage" rowSpan={5}>
                                        <a href="#">
                                            <img
                                                src={
                                                    "https://style-republik.com/wp-content/uploads/2020/09/Hat-feature.jpg"
                                                }
                                                alt=""
                                            />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="fa-sharp fa-solid fa-play" />
                                        <span>
                                            <a href="">Chính sách vận chuyển</a>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="fa-sharp fa-solid fa-play" />
                                        <span>
                                            <a href="">Giới thiệu công ty</a>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="fa-sharp fa-solid fa-play" />
                                        <span>
                                            <a href="">Chính sách bảo hành</a>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="fa-sharp fa-solid fa-play" />
                                        <span>
                                            <a href="">Blog</a>
                                        </span>
                                    </td>
                                    <td className="title-footer">THANH TOÁN</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="fa-sharp fa-solid fa-play" />
                                        <span>
                                            <a href="">
                                                Chính sách bảo mật thông tin
                                            </a>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="fa-sharp fa-solid fa-play" />
                                        <span>
                                            <a href="">Liên hệ</a>
                                        </span>
                                    </td>
                                    <td rowSpan={2}>
                                        <FaCcVisa className="fa-brands fa-cc-visa" />
                                        <FaCcPaypal className="fa-brands fa-cc-paypal" />
                                        <FaCreditCard className="fa-regular fa-credit-card" />
                                        <FaCcMastercard className="fa-brands fa-cc-mastercard" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="fa-sharp fa-solid fa-play" />
                                        <span>
                                            <a href="">Chính sách đổi trả</a>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="footer">
                    <div className="footer-contact">
                        <div className="copyright">
                            Copyright © Mũ thời trang
                        </div>
                        {/* <div className="socials-list">
                                <a href="/">
                                    <i className="ti-facebook social-color"></i>
                                </a>
                                <a href="/">
                                    <i className="ti-instagram social-color"></i>
                                </a>
                                <a href="/">
                                    <i className="ti-youtube social-color"></i>
                                </a>
                                <a href="/">
                                    <i className="ti-pinterest social-color"></i>
                                </a>
                                <a href="/">
                                    <i className="ti-twitter social-color"></i>
                                </a>
                                <a href="/">
                                    <i className="ti-linkedin social-color"></i>
                                </a>
                            </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
