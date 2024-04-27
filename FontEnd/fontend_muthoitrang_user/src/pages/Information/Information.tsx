import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Upload,
    UploadFile,
    notification,
    UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import styles from "./Information.module.scss";
import {
    getInformation,
    updateInformation,
} from "../../services/information.service";
import { apiImage } from "../../constant/api";

type NotificationType = "success" | "info" | "warning" | "error";
const cx = classNames.bind(styles);

type Info = {
    maTaiKhoan: any;
    tenTaiKhoan: any;
    matKhau: any;
    maChitietTaiKhoan: any;
    maLoaitaikhoan: any;
};

const Information = () => {
    const [form] = Form.useForm();

    const user = JSON.parse(localStorage.getItem("customer") || "{}");
    const [infor, setInfor] = useState<Info>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [fileListLoaded, setFileListLoaded] = useState(false);

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

    const handleAvatarChange = ({ fileList }: any) => {
        setFileList(fileList);
    };

    const handlerRemove = (e: any) => {
        // console.log(e);
    };

    const handleUpdateInformation = async () => {
        form.validateFields()
            .then(async (values: any) => {
                await updateInformation({
                    MaTaiKhoan: infor?.maTaiKhoan,
                    TenTaiKhoan: infor?.tenTaiKhoan,
                    MatKhau: infor?.matKhau,
                    Email: values.email,
                    list_json_chitiet_taikhoan: [
                        {
                            MaChitietTaiKhoan: infor?.maChitietTaiKhoan,
                            MaLoaitaikhoan: infor?.maLoaitaikhoan,
                            AnhDaiDien:
                                fileList.length > 0
                                    ? `/img/${fileList[0].name}`
                                    : "/img/user.jpg",
                            HoTen: values.hoTen,
                            DiaChi: values.diaChi,
                            SoDienThoai: values.soDienThoai,
                            status: 2,
                        },
                    ],
                });
                const customerData = localStorage.getItem("customer");
                const customerObject = customerData
                    ? JSON.parse(customerData)
                    : {};
                customerObject.hoten = values.hoTen;
                customerObject.anhdaidien =
                    (fileList.length > 0
                        ? `/img/${fileList[0].name}`
                        : "/img/user.jpg");

                customerObject.sodienthoai = values.soDienThoai;
                customerObject.email = values.email;
                const updatedCustomerData = JSON.stringify(customerObject);
                localStorage.setItem("customer", updatedCustomerData);
                openNotificationWithIcon(
                    "success",
                    "Cập nhật thành công! Load lại trang để thay đổi"
                );
            })
            .catch(async (e: any) => {
                openNotificationWithIcon(
                    "warning",
                    "Cập nhật không thành công"
                );
                console.log(e);
            });
    };

    const upload_props: UploadProps = {
        name: "file",
        action: apiImage + "/api-admin/Image/upload",
        headers: {
            authorization: "Bearer " + user.token,
        },
        onChange(info: any) {
            if (info.file.status === "done") {
                form.setFieldValue(
                    "image_url",
                    info.fileList[0].response.filePath
                );
            }
        },
    };

    useEffect(() => {
        async function fetchData(mataikhoan: any) {
            const res = await getInformation(mataikhoan);
            setInfor(res[0]);

            setFileList([
                {
                    uid: "0",
                    name: res[0].anhDaiDien.slice(5),
                    status: "done",
                    url: apiImage + res[0].anhDaiDien,
                    thumbUrl: apiImage + res[0].anhDaiDien,
                },
            ]);

            setFileListLoaded(true);
            form.setFieldsValue({
                hoTen: res[0].hoTen,
                soDienThoai: res[0].soDienThoai,
                email: res[0].email,
                diaChi: res[0].diaChi,
            });
        }
        fetchData(user.mataikhoan);
    }, [user.mataikhoan]);

    return (
        <>
            {contextHolder}
            <div style={{ marginTop: 85 }} className={cx("content")}>
                <div className={cx("cleanser")}>
                    <div style={{ marginTop: 10 }} className={cx("type")}>
                        <Link to="/">Trang chủ</Link>
                        <FaLongArrowAltRight className={cx("arrow-item")} />
                        <Link to={`/information`}>Thông tin tài khoản</Link>
                    </div>
                    <div className={cx("news")}>
                        <Form form={form} layout="vertical">
                            <Form.Item>
                                {fileListLoaded && (
                                    <Upload
                                        {...upload_props}
                                        onChange={handleAvatarChange}
                                        defaultFileList={fileList}
                                        maxCount={1}
                                        listType="picture-card"
                                        onRemove={handlerRemove}
                                    >
                                        <Button
                                            icon={<UploadOutlined />}
                                        ></Button>
                                    </Upload>
                                )}
                            </Form.Item>
                            <Form.Item label="Họ tên" name="hoTen">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Số điện thoại" name="soDienThoai">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Email" name="email">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Địa chỉ" name="diaChi">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={handleUpdateInformation}
                                >
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Information;
