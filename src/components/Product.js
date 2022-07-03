import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DataGrid } from '@mui/x-data-grid';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik,Formik,Form } from 'formik';
import * as yup from 'yup'; 

function Product(props) {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

  const handleinsetdata = (values) =>{
    let local_data = JSON.parse(localStorage.getItem("Product"))
    
    if(local_data === null){
        localStorage.setItem("Product",JSON.stringify([values]))
    } else {
        local_data.push(values);
        localStorage.setItem("Product",JSON.stringify(local_data))
    }
    handleClose()
  }


  let schema = yup.object().shape({ 
    name:yup.string().required("Please enter your product name."), 
    productid:yup.string().required("Please enter your product id."), 
    price:yup.number().positive("Please enter your product valid price.").integer().required("Please enter your product price."), 
    companyname:yup.string().required("Please enter your company name."),
    address:yup.string().required("Please enter your address."), 
    }); 

  const formik = useFormik({
    initialValues: {
        name: '',
        productid: '',
        price: '',
        companyname: '',
        address: ''
    },
    validationSchema:schema,
    onSubmit: values => {
      handleinsetdata(values);
    },
  });

  let {errors,values,touched,handleBlur,handleChange,handleSubmit} = formik;
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
            {errors.name && touched.name ?<p style={{color:"red"}}>{errors.name}</p>:null}
            <TextField
              margin="dense"
              name='productid'
              label="Product unique id"
              fullWidth
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.productid && touched.productid ?<p style={{color:"red"}}>{errors.productid}</p>:null}
            <TextField
              margin="dense"
              name="price"
              label="Price"
              fullWidth
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.price && touched.price ?<p style={{color:"red"}}>{errors.price}</p>:null}
            <TextField
              margin="dense"
              name="companyname"
              label="Company name"
              fullWidth
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.companyname && touched.companyname ?<p style={{color:"red"}}>{errors.companyname}</p>:null}
            <TextField
              margin="dense"
              name="address"
              label="Address"
              fullWidth
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.address && touched.address ?<p style={{color:"red"}}>{errors.address}</p>:null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
          </Form>
        </Formik>
        </Dialog>
      </div>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
        </>
    );
}

export default Product;