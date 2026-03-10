import { axiosInstance } from "../config/axiosInstance"

export const fetchedUserApi = async () => {
    const res = await axiosInstance.get(`/api/v1/user/profile`);
    return res.data.user
}