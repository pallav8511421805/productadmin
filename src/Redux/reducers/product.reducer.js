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
                productdata: [],
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
                patientdata: [],
                error: action.payload
            }
        default:
            return state;
    }
}
}