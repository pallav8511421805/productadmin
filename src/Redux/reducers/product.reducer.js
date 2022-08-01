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

            case Actiontypes.Add_product:
            return {
                ...state,
                isload: false,
                productdata: state.productdata.concat(action.payload),
                error: ''
            }

            case Actiontypes.Edit_product:
                return {
                    ...state,
                    isload: false,
                    productdata: state.productdata.map((p) => {
                        if (p.id === action.payload.id) {
                            return action.payload;
                        } else {
                            return p;
                        }
                    }),
                    error: ''
                }
                case Actiontypes.Delete_product:
                return {
                    ...state,
                    isload: false,
                    productdata: state.productdata.filter((d) => d.id !== action.payload.id),
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