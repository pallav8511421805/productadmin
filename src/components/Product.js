import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik, useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

function Product(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = useState([])
  const [did, setdid] = useEffect(0)
  const [dopen, setdOpen] = React.useState(false);

  const handledClickOpen = () => {
    setdOpen(true);
  };

  const handledClose = () => {
    setdOpen(false);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadpdata = () => {
    let local_data = JSON.parse(localStorage.getItem("Product"))

    if (local_data !== null) {
      setdata(local_data)
    }
  }

  const handleddelete = () => {
    let local_data = JSON.parse(localStorage.getItem("Product"))

    let filterdata = local_data.filter((l) => l.id !== did);

    localStorage.setItem("Product", JSON.stringify(filterdata));
    loadpdata();
    handledClose();
  }

  const columns = [
    { field: 'name', headerName: 'Product name', width: 130 },
    { field: 'productid', headerName: 'Product id', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'companyname', headerName: 'Company name', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    {
      field: 'action', headerName: 'Action', width: 130,
      renderCell: (params) => (
        <IconButton aria-label="delete" color="primary" onClick={()=>{ handledClickOpen(), setdid(params.id) }}>
          <DeleteIcon />
        </IconButton>
      )
    },
  ];
  {console.log(did)}
  const handleinsetdata = (values) => {
    let local_data = JSON.parse(localStorage.getItem("Product"))

    let Mid = Math.floor(Math.random() * 100)

    const data = {
      id: Mid,
      ...values
    }

    if (local_data === null) {
      localStorage.setItem("Product", JSON.stringify([data]))
    } else {
      local_data.push(data);
      localStorage.setItem("Product", JSON.stringify(local_data))
    }

    handleClose()
    formik.resetForm()
    loadpdata()
  }

  let schema = yup.object().shape({
    name: yup.string().required("Please enter your product name."),
    productid: yup.string().required("Please enter your product id."),
    price: yup.number().positive("Please enter your product valid price.").integer().required("Please enter your product price."),
    companyname: yup.string().required("Please enter your company name."),
    address: yup.string().required("Please enter your address."),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      productid: '',
      price: '',
      companyname: '',
      address: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      handleinsetdata(values);
    },
  });

  useEffect(() => {
    loadpdata()
  }, [])

  let { errors, values, touched, handleBlur, handleChange, handleSubmit } = formik;
  return (
    <>
      <div>
        <h1>Products</h1>
      </div>
      <Dialog
        open={dopen}
        onClose={handledClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handledClose}>No</Button>
          <Button onClick={handleddelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add product details
        </Button>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>Add product</DialogTitle>
          <Formik value={formik}>
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  margin="dense"
                  name="name"
                  label="Product name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.name && touched.name ? <p style={{ color: "red" }}>{errors.name}</p> : null}
                <TextField
                  margin="dense"
                  name='productid'
                  label="Product unique id"
                  fullWidth
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.productid && touched.productid ? <p style={{ color: "red" }}>{errors.productid}</p> : null}
                <TextField
                  margin="dense"
                  name="price"
                  label="Price"
                  fullWidth
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.price && touched.price ? <p style={{ color: "red" }}>{errors.price}</p> : null}
                <TextField
                  margin="dense"
                  name="companyname"
                  label="Company name"
                  fullWidth
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.companyname && touched.companyname ? <p style={{ color: "red" }}>{errors.companyname}</p> : null}
                <TextField
                  margin="dense"
                  name="address"
                  label="Address"
                  fullWidth
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.address && touched.address ? <p style={{ color: "red" }}>{errors.address}</p> : null}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
      </div>
      <div style={{ height: 400, width: '80%', margin: "15px auto" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
}

export default Product;