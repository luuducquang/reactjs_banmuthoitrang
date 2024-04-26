import { apiClient } from "../constant/api";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export const getAllImportBill = async ():Promise<any> =>{
    const res = await apiClient?.get(`/api/HoaDonNhap/get_all_hoadonnhap`,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const getAllNhaPhanPhoi = async ():Promise<any> =>{
    const res = await apiClient?.get(`/api/NhaPhanPhoi/get-all-nhaphanphoi`,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const getDetailImportBillById = async (id:any):Promise<any> =>{
    const res = await apiClient?.get(`/api/HoaDonNhap/getbyid-mahoadon-chitiethoadonnhap/${id}`,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const createImportBill = async (data:any):Promise<any> =>{
    const res = await apiClient?.post(`/api/HoaDonNhap/create-hoadonnhap`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const updateImportBill = async (data:any):Promise<any> =>{
    const res = await apiClient?.put(`/api/HoaDonNhap/update-hoadonnhap`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const deleteImportBill = async (data: any): Promise<any> => {
    const res = await apiClient?.delete(`/api/HoaDonNhap/delete-hoadonnhap`, {
        headers: {
            "Authorization": "Bearer " + user.token,
        },
        data: data 
    });
    return res;
}