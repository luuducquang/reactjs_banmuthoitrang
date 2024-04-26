import { apiClient } from "../constant/api";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export const getAllProduct = async ():Promise<any> =>{
    const res = await apiClient?.get(`/api/SanPham/get-allsanpham`);
    return res?.data;
}

export const getCategory = async ():Promise<any> =>{
    const res = await apiClient?.get("/api/DanhMuc/get-all-danhmuc");
    return res?.data;
}

export const getCategoryOffer = async ():Promise<any> =>{
    const res = await apiClient?.get("/api/DanhMucUuDai/get-all-danhmucuudai");
    return res?.data;
}

export const getDistributor = async ():Promise<any> =>{
    const res = await apiClient?.get("/api/NhaPhanPhoi/get-all-nhaphanphoi");
    return res?.data;
}

export const createProduct = async (data:any):Promise<any> =>{
    const res = await apiClient?.post(`/api/SanPham/create-sanpham`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }
    });
    return res?.data;
}

export const updateProduct = async (data:any):Promise<any> =>{
    const res = await apiClient?.put(`/api/SanPham/update-sanpham`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }
    });
    return res?.data;
}

export const getbyMaSanPham = async (maSanPham:any):Promise<any> =>{
    const res = await apiClient?.get("/api/SanPham/getbyid-sanpham/" + maSanPham, {
        headers: {
            "Authorization": "Bearer " + user.token,
        }
    });
    return res?.data;
}

export const deleteProduct = async (data: any): Promise<any> => {
    const res = await apiClient?.delete(`/api/SanPham/delete-sanpham`, {
        headers: {
            "Authorization": "Bearer " + user.token,
        },
        data: data 
    });
    return res;
}
