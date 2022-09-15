import { adddata, deletedata, editdata, getdata } from "../Request"

export const getalldata = () => {
    return getdata('product')
}

export const Addalldata = (data) => {
    return adddata('product', data)
}

export const Deletealldata = (id) =>{
    return deletedata('product',id)
}
export const editalldata = (data) =>{
    return editdata('product',data.id)
}