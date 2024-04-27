import { apiClient } from "../constant/api";

export const getProductById = async (id:any):Promise<any> =>{
    const res = await apiClient?.get(`/api/SanPham/getbyid-sanpham/`+id);
    return res?.data;
}

export const getProductRecomend = async (data:any):Promise<any> =>{
  const res = await apiClient?.post(`/api/SanPham/search-sanpham`,data);
  return res?.data;
}

