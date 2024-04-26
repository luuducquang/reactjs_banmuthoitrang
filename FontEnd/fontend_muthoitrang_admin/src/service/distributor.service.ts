import { apiClient } from "../constant/api";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export const getAllDistributor = async ():Promise<any> =>{
    const res = await apiClient?.get(`/api/NhaPhanPhoi/get-all-nhaphanphoi`,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }});
    return res?.data;
}

export const createDistributor = async (data:any):Promise<any> =>{
    const res = await apiClient?.post(`/api/NhaPhanPhoi/create-nhaphanphoi`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }
    });
    return res?.data;
}

export const updateDistributor = async (data:any):Promise<any> =>{
    const res = await apiClient?.put(`/api/NhaPhanPhoi/update-nhaphanphoi`,data,{
        headers: {
            "Authorization": "Bearer " + user.token,
        }
    });
    return res?.data;
}

export const deleteDistributor = async (data: any): Promise<any> => {
    const res = await apiClient?.delete(`/api/NhaPhanPhoi/delete-nhaphanphoi`, {
        headers: {
            "Authorization": "Bearer " + user.token,
        },
        data: data 
    });
    return res;
}