import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
export const customAxios = async (method, url, data) => {
    return await axios({
        method,
        url,
        data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const fileUpload = async (method, url, data) => {
    return await axios({
        method,
        url,
        data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};
