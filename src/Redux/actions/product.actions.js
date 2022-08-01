import { base_url } from '../../BaseUrl/baseurl';
import * as Actiontypes from '../actions/Actiontype';

export const getproduct_data = () => (dispatch) => {
    try {
        // dispatch(loaddata())
        setTimeout(function () {
            fetch(base_url + 'product')
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
                .catch(error => console.error('Error:', error));
        }, 2000)
    } catch (error) {
        console.error('Error:', error);
    }
}

// export const loaddata = () => (dispatch) => {
//     dispatch({ type: Actiontypes.Load_Product})
// }

// export const errordata = (error) => (dispatch) => {
//     dispatch({ type: Actiontypes.Error_Product, payload: error })
// }