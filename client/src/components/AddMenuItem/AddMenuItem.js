import React from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Button as InputButton
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

import Button from '../../commons/Button';
import { MENU_TYPE } from '../../constants';

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: 500
  },
  textField: {
    height: 52
  },
  submit: {
    margin: theme.spacing(4, 0, 2, 0)
  },
  inputButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  photo: {
    width: 300,
    height: 200,
    objectFit: 'cover'
  }
}));

const DEFAULT = {
  type: '',
  name: '',
  price: '',
  photo: '',
  file: ''
};

const ADD_MENU_ITEM = gql`
  mutation CreateMenuMutation($type: String!, $name: String!, $price: Float!, $file: Upload) {
    createMenuItem(type: $type, name: $name, price: $price, file: $file) {
      _id
      type
      name
      price
      photo
    }
  }
`;

const EDIT_MENU_ITEM = gql`
  mutation UpdateMenuItem($_id: ID!, $type: String!, $name: String!, $price: Float!, $file: Upload) {
    updateMenuItem(_id: $_id, type: $type, name: $name, price: $price, file: $file) {
      _id
      type
      name
      price
      photo
    }
  }
`;

export default function AddMenuItem({ open, handleClose, menuItem }) {
  const classes = useStyles();

  const [addMenuItem] = useMutation(ADD_MENU_ITEM);
  const [editMenuItem] = useMutation(EDIT_MENU_ITEM);

  const [formData, setFormData] = React.useState(menuItem || DEFAULT);
  const handleFormDataChange = (key, data) => {
    let value = data;
    if (key === 'price') value = parseFloat(value);
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    if (menuItem) {
      editMenuItem({ variables: formData });
    } else {
      addMenuItem({ variables: formData });
    }
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Grid container spacing={2} alignItems='center' justify='space-between'>
            <Grid sm={3} item>
              <Typography variant='body1'>Type</Typography>
            </Grid>
            <Grid sm={9} item>
              <Select
                value={formData.type}
                fullWidth
                onChange={(event) => handleFormDataChange('type', event.target.value)}
                variant='outlined'
              >
                {MENU_TYPE.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems='center' justify='space-between'>
            <Grid sm={3} item>
              <Typography variant='body1'>Name</Typography>
            </Grid>
            <Grid sm={9} item>
              <TextField
                className={classes.textField}
                margin='dense'
                id='name'
                type='text'
                value={formData.name}
                fullWidth
                InputProps={{
                  className: classes.textField
                }}
                variant='outlined'
                onChange={(event) => handleFormDataChange('name', event.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems='center' justify='space-between'>
            <Grid sm={3} item>
              <Typography variant='body1'>Price</Typography>
            </Grid>
            <Grid sm={9} item>
              <TextField
                className={classes.textField}
                margin='dense'
                id='price'
                type='number'
                value={formData.price}
                fullWidth
                InputProps={{
                  className: classes.textField
                }}
                variant='outlined'
                onChange={(event) => handleFormDataChange('price', event.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems='center' justify='space-between'>
            <Grid sm={3} item>
              <Typography variant='body1'>Photo</Typography>
            </Grid>
            <Grid sm={9} item>
              <InputButton className={classes.inputButton} variant='contained' component='label'>
                Choose Photo
                <input type='file' hidden onInput={(event) => handleFormDataChange('file', event.target.files[0])} />
              </InputButton>
              {formData.photo && !formData.file && (
                <img className={classes.photo} src={formData.photo} alt={formData.name} />
              )}
              {formData.file && (
                <img className={classes.photo} src={URL.createObjectURL(formData.file)} alt={formData.name} />
              )}
            </Grid>
          </Grid>
          <div className={classes.submit}>
            <Button onClick={handleSubmit}>Save Item</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
