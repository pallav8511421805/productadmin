import axios from "axios";
import { base_url } from "../BaseUrl/baseurl";

const instance = axios.create({
    baseURL: base_url,
    timeout: 1000,
});

export const sendrequest = (config) => {
    return instance.request(config);
}

export const getdata = (path) => {
    return sendrequest({
        url: path,
        method: 'GET',
    })
}

export const adddata = (path,data) => {
    return sendrequest({
        url: path,
        data: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
    })
}

export const deletedata = (path,id) =>{
    return sendrequest({
        url: path + id,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
    })
}
export const editdata = (path,data) =>{
    return sendrequest({
        url: path + data.id,
        method: "PUT",
        data:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}