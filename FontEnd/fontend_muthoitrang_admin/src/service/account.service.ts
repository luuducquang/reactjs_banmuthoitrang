import { apiClient } from "../constant/api";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export const getListTypeAccount = async ():Promise<any> =>{
    const res = await apiClient?.get(`/api/LoaiTaiKhoan/get_all_loaitaikhoan`,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const checkUserNameIsEmpty = async ():Promise<any> =>{
    const res = await apiClient?.get("/api/TaiKhoan/get-alltaikhoan");
    return res?.data;
}

export const getDetailAccount = async (id:any):Promise<any> =>{
    const res = await apiClient?.get(`/api/TaiKhoan/getbyid-taikhoan-chitiettaikhoan/`+id,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}


export const getAllAccount = async ():Promise<any> =>{
    const res = await apiClient?.get('/api/TaiKhoan/get-alltaikhoan',{
        headers: {
            "Authorization": "Bearer " + user.token,
        }
    });
    return res?.data;
}


export const createAccount = async (data:any):Promise<any> =>{
    const res = await apiClient?.post(`/api/TaiKhoan/create-taikhoan`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }
    });
    return res?.data;
}

export const updateAccount = async (data:any):Promise<any> =>{
    const res = await apiClient?.put(`/api/TaiKhoan/update-taikhoan`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }
    });
    return res?.data;
}

export const deleteAccount = async (data: any): Promise<any> => {
    const res = await apiClient?.delete(`/api/TaiKhoan/delete-taikhoan`, {
        headers: {
            "Authorization": "Bearer " + user.token,
        },
        data: data 
    });
    return res;
}
