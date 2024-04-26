import { apiClient } from "../constant/api";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export const getAllTypeAccount = async ():Promise<any> =>{
    const res = await apiClient?.get(`/api/LoaiTaiKhoan/get_all_loaitaikhoan`,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}


export const createTypeAccount = async (data:any):Promise<any> =>{
    const res = await apiClient?.post(`/api/LoaiTaiKhoan/create_loaitaikhoan`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }
    });
    return res?.data;
}

export const updateTypeAccount = async (data:any):Promise<any> =>{
    const res = await apiClient?.put(`/api/LoaiTaiKhoan/update_loaitaikhoan`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }
    });
    return res?.data;
}

export const deleteTypeAccount = async (data: any): Promise<any> => {
    const res = await apiClient?.delete(`/api/LoaiTaiKhoan/delete_loaitaikhoan`, {
        headers: {
            "Authorization": "Bearer " + user.token,
        },
        data: data 
    });
    return res;
}