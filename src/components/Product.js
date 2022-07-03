import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup'; 

function Product(props) {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let schema = yup.object().shape({ 
    name:yup.string().required("Please enter your medicine name."), 
    quantity:yup.number().positive().integer().required("Please enter your medicine quantity."), 
    price:yup.number().positive().integer().required("Please enter your medicine price."), 
    expiry:yup.number().positive().integer().required("Please enter your medicine expiry year.") 
    }); 

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
    return (
        <>
        <div>
            <h1>Products</h1>
        </div>
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add product details
        </Button>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>Add product</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Product name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name='productid'
              label="Product unique id"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="companyname"
              label="Company name"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
        </>
    );
}

export default Product;