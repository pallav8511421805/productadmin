import { Addalldata, Deletealldata, getalldata } from '../../Axios/APIS/Product.api'
import { base_url } from '../../BaseUrl/baseurl'
import * as Actiontypes from '../actions/Actiontype'

export const getproduct_data = () => (dispatch) => {
  try {
    dispatch(loaddata())
    setTimeout(function () {
      getalldata()
        .then((data) =>
          dispatch({ type: Actiontypes.getproductdata, payload: data.data }),
        )
        .catch((error) => dispatch(errordata(error.message)))

      // fetch(base_url + 'product')
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

      // .then(data => dispatch(({ type: Actiontypes.getproductdata, payload:data.data})))
      // .catch(error => dispatch(errordata(error.message)));
    }, 2000)
  } catch (error) {
    dispatch(errordata(error.message))
  }
}

export const Adddata = (data) => (dispatch) => {
  try {
    dispatch(loaddata())
    setTimeout(function () {
      Addalldata(data)
        .then((data) =>
          dispatch({ type: Actiontypes.Add_product, payload: data.data }),
        )
        .catch((error) => dispatch(errordata(error.message)))
      // fetch(base_url + 'product')
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
      // fetch(base_url + 'product', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(data),
      // })
      //     .then(response => response.json())
      //     .then(data => dispatch(({ type: Actiontypes.Add_product, payload: data.data})))
      //     .catch(error => dispatch(errordata(error.message)));
    }, 2000)
  } catch (error) {
    dispatch(errordata(error.message))
  }
}

export const Editdata = (data) => (dispatch) => {
  try {
    fetch(base_url + 'product/').then(
      (response) => {
        if (response.ok) {
          return response
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText,
          )
          error.response = response
          throw error
        }
      },
      (error) => {
        var errmess = new Error(error.message)
        throw errmess
      },
    )
    fetch(base_url + 'product/' + data.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: Actiontypes.Edit_product, payload: data }),
      )
      .catch((error) => dispatch(errordata(error.message)))
  } catch (error) {
    dispatch(errordata(error.message))
  }
}

export const Deletedata = (id) => (dispatch) => {
  try {
    Deletealldata(id)
      .then(dispatch({ type: Actiontypes.Delete_product, payload: id }))
      .catch((error) => dispatch(errordata(error.message)))
    // fetch(base_url + 'product').then(
    //   (response) => {
    //     if (response.ok) {
    //       return response
    //     } else {
    //       var error = new Error(
    //         'Error ' + response.status + ': ' + response.statusText,
    //       )
    //       error.response = response
    //       throw error
    //     }
    //   },
    //   (error) => {
    //     var errmess = new Error(error.message)
    //     throw errmess
    //   },
    // )
    // fetch(base_url + 'product/' + id, {
    //   method: 'DELETE',
    // })
    //   .then((data) =>
    //     dispatch({ type: Actiontypes.Delete_product, payload: data }),
    //   )
    //   .catch((error) => dispatch(errordata(error.message)))
  } catch (error) {
    dispatch(errordata(error.message))
  }
}

export const loaddata = () => (dispatch) => {
  dispatch({ type: Actiontypes.Load_Product })
}

export const errordata = (error) => (dispatch) => {
  dispatch({ type: Actiontypes.Error_Product, payload: error })
}
