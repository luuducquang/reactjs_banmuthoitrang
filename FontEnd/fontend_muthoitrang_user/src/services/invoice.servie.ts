import { apiClient } from "../constant/api";

const user = JSON.parse(localStorage.getItem("customer") || "{}");

export const getInvoiceAll = async (id:any):Promise<any> =>{
    const res = await apiClient?.get("/api/HoaDon/getbytaikhoan-mahoadon-chitiethoadon/"+id,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const getInvoiceById = async (id:any):Promise<any> =>{
    const res = await apiClient?.get("/api/HoaDon/getbyid-mahoadon-chitiethoadon/"+id,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}