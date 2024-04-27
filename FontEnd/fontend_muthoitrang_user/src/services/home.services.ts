import { apiClient } from "../constant/api";

export const getCategory = async (): Promise<any> => {
    const res = await apiClient?.get(`/api/DanhMuc/get-all-danhmuc`);  
    return res?.data;
};

export const getProductHome = async (data:any):Promise<any> =>{
  const res = await apiClient?.post(`/api/SanPham/search-sanpham`,data);
  return res?.data;
}

  