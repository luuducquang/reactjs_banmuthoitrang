import { apiClient } from "../constant/api";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export const getAllBillSell = async ():Promise<any> =>{
    const res = await apiClient?.get(`/api/HoaDon/get_all_hoadon`,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const getAllProduct = async ():Promise<any> =>{
    const res = await apiClient?.get(`/api/SanPham/get-allsanpham`,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const getDetailBillById = async (id:any):Promise<any> =>{
    const res = await apiClient?.get(`/api/HoaDon/getbyid-mahoadon-chitiethoadon/${id}`,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const createBillSell = async (data:any):Promise<any> =>{
    const res = await apiClient?.post(`/api/HoaDon/create-hoadon`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const updateBillSell = async (data:any):Promise<any> =>{
    const res = await apiClient?.put(`/api/HoaDon/update-hoadon`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const deleteBillSell = async (data: any): Promise<any> => {
    const res = await apiClient?.delete(`/api/HoaDon/delete-hoadon`, {
        headers: {
            "Authorization": "Bearer " + user.token,
        },
        data: data 
    });
    return res;
}
