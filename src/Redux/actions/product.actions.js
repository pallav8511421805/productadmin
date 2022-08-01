import { baseurl } from "../../Baseurl/baseurl";
import * as Actiontypes from '../actions/Actiontype';

export const Getdata = () => (dispatch) => {
    try {
        dispatch(loaddata())
        setTimeout(function () {
            fetch(baseurl + 'product')
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then(response => response.json())
                .then(data => dispatch(({ type: Actiontypes.getproductdata, payload: data.data })))
                .catch(error => dispatch(errordata(error.message)));
        }, 2000)
    } catch (error) {
        dispatch(errordata(error.message))
    }
}

export const loaddata = () => (dispatch) => {
    dispatch({ type: Actiontypes.Load_Product})
}

export const errordata = (error) => (dispatch) => {
    dispatch({ type: Actiontypes.Error_Product, payload: error })
}