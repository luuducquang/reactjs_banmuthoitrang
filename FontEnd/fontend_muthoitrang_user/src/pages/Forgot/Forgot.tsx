import { Link } from "react-router-dom";
import "./Forgot.scss";

function Forgot() {
    return (
        <div id="wrapper">
            <form action="" id="form-login">
                <h1 className="form-heading">Đặt lại mật khẩu</h1>
                <div className="form-group">
                    <i className="fa-solid fa-user" />
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Tên đăng nhập"
                    />
                </div>
                <div className="form-group">
                    <i className="fa-solid fa-envelope" />
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Nhập địa chỉ email"
                    />
                </div>
                <input
                    type="submit"
                    src="/"
                    defaultValue="Gửi"
                    className="form-submit"
                />
                {/* <a href="#" class="form-submit">Gửi</a> */}
                <div className="register">
                    <ul>Tôi đã có tài khoản</ul>
                    <Link to="/login">Đăng nhập</Link>
                </div>
            </form>
        </div>
    );
}

export default Forgot;
