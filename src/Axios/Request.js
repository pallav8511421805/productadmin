import axios from "axios";
import { base_url } from "../BaseUrl/baseurl";

const instance = axios.create({
    baseURL: base_url,
    timeout: 1000,
  });

export const sendrequest = (config) =>{
return instance.request(config);
}

export const getdata = (path) =>{
return sendrequest({
    url: path,
    method: 'GET',
})
}