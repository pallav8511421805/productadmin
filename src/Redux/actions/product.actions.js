import { Addalldata, Deletealldata, editalldata, getalldata } from '../../Axios/APIS/Product.api'
import { base_url } from '../../BaseUrl/baseurl'
import { db, storage } from '../../Firebase'
import { addDoc, collection,deleteDoc,doc,getDocs, updateDoc} from 'firebase/firestore'
import * as Actiontypes from '../actions/Actiontype'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const getproduct_data = () => (dispatch) => {
  try {
    dispatch(loaddata())
    setTimeout(async function () {
      let data = []
      const querySnapshot = await getDocs(collection(db, 'Products'))
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      })
      dispatch({ type: Actiontypes.getproductdata, payload: data })
      // getalldata()
      //   .then((data) =>
      //     dispatch({ type: Actiontypes.getproductdata, payload: data.data }),
      //   )
      //   .catch((error) => dispatch(errordata(error.message)))

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
      const filename = Math.floor(Math.random()*100000);
      const proRef = ref(storage, 'Products/' + filename)
      uploadBytes(proRef, data.pname).then(async (snapshot) => {
        getDownloadURL(snapshot.ref)
        .then(
          async (url) => {
            const docRef = await addDoc(collection(db, 'Products'), 
            {...data,pname: url,filename : filename})
            dispatch({
              type: Actiontypes.Add_product,
              payload: { ...data, id: docRef.id, pname: url,filename:filename},
            })
          },
        )
      })
      // Addalldata(data)
      //   .then((data) =>
      //     dispatch({ type: Actiontypes.Add_product, payload: data.data }),
      //   )
      //   .catch((error) => dispatch(errordata(error.message)))
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

export const Editdata = (data) => async (dispatch) => {
    const filename = Math.floor(Math.random()*100000);
  try {
    const proRef = doc(db, "Medicines", data.id);
    if (typeof data.pname === "string") {
      await updateDoc(proRef, {
        address: data.address,
        companyname: data.companyname,
        name: data.name,
        price: data.price,
        productid : data.productid
      });
      dispatch({ type: Actiontypes.Edit_product, payload: data });
    } else {
      const oldimgRef = ref(storage, "Medicines/" + data.filename);
      const newimgRef = ref(storage, "Medicines/" + filename);

      deleteObject(oldimgRef)
      .then(async () => {
        uploadBytes(newimgRef, data.pname)
        .then(async (snapshot) => {
          getDownloadURL(snapshot.ref)
          .then(async (url) => {
            await updateDoc(proRef, {
              address: data.address,
              companyname: data.companyname,
              name: data.name,
              price: data.price,
              productid : data.productid,
              filename: filename,
              pname: url,
            });
            dispatch({ type: Actiontypes.Edit_product, payload: {...data, filename: filename, pname: url} })
          })
        })
      })}
    // editalldata(data)
    //  .then((data) =>
    //     dispatch({ type: Actiontypes.Edit_product, payload: data }),
    //   )
    //   .catch((error) => dispatch(errordata(error.message)))
    // fetch(base_url + 'product/').then(
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
    // fetch(base_url + 'product/' + data.id, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) =>
    //     dispatch({ type: Actiontypes.Edit_product, payload: data }),
    //   )
    //   .catch((error) => dispatch(errordata(error.message)))
  } catch (error) {
    dispatch(errordata(error.message))
  }
}

export const Deletedata = (data) => (dispatch) => {
  try {
    const proRef = ref(storage, 'Products/' + data.filename)
    deleteObject(proRef)
    .then(async() => {
      await deleteDoc(doc(db, 'Products', data.id))
      dispatch({ type: Actiontypes.Delete_product, payload: data.id })
    })
    .catch((error) => {
      dispatch(errordata(error.message))
    });
    // Deletealldata(id)
    //   .then(dispatch({ type: Actiontypes.Delete_product, payload: id }))
    //   .catch((error) => dispatch(errordata(error.message)))
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
