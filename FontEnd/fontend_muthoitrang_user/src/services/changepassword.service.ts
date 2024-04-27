import { apiClient } from "../constant/api";

const user = JSON.parse(localStorage.getItem("customer") || "{}");

export const changePasswordUser = async (data:any):Promise<any> =>{
    const res = await apiClient?.put("/api/TaiKhoan/doimk-taikhoan",data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const checkUser = async (id:any):Promise<any> =>{
    const res = await apiClient?.get("/api/TaiKhoan/getbyid-taikhoan-chitiettaikhoan/"+id,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}
