import { adddata, getdata } from "../Request"

export const getalldata = () => {
    return getdata('product')
}

export const Addalldata = (data) => {
    return adddata('product', data)
}