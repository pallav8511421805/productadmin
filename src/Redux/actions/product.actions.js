import { baseurl } from "../../Baseurl/baseurl";
import * as Actiontypes from '../actions/Actiontype';

export const Getdata = () => (dispatch) => {
    try {
        dispatch(loaddata())
        setTimeout(function () {
            // fetch(baseurl + 'Patients')
            //     .then(response => {
            //         if (response.ok) {
            //             return response;
            //         } else {
            //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //             error.response = response;
            //             throw error;
            //         }
            //     },
            //         error => {
            //             var errmess = new Error(error.message);
            //             throw errmess;
            //         })
            //     .then(response => response.json())
                // .then(data => dispatch(({ type: actiontype.get_patients, payload: data.data })))
                // .catch(error => dispatch(errordata(error.message)));
        }, 2000)
    } catch (error) {
        dispatch(errordata(error.message))
    }
}

export const loaddata = () => (dispatch) => {
    dispatch({ type: actiontype.Load_patient })
}

export const errordata = (error) => (dispatch) => {
    dispatch({ type: actiontype.ERROR_patient, payload: error })
}