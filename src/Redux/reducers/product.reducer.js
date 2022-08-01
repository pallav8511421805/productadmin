import * as Actiontypes from '../actions/Actiontype';

const intval = {
    isload: false,
    productdata: [],
    error: ''
}
export const productreducer = (state = intval, action) => {
    switch (action.type) {
        case Actiontypes.getproductdata:
            return {
                ...state,
                isload: false,
                productdata: action.payload,
                error: ''
            }

        case Actiontypes.Load_Product:
            return {
                ...state,
                isload: true,
                error: ''
            }
        case Actiontypes.Error_Product:
            return {
                ...state,
                isload: false,
                productdata: [],
                error: action.payload
            }
        default:
            return state;
    }
}