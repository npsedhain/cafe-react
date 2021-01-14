import React from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Button as InputButton,
  LinearProgress,
  FormHelperText
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

import Button from '../../../commons/Button';
import { MENU_TYPE } from '../../../constants';

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
  },
  error: {
    color: theme.palette.danger
  }
}));

const DEFAULT = {
  type: '',
  name: '',
  price: '',
  photo: '',
  file: ''
};

const REQUIRED = ['type', 'name', 'price'];

const setDefaultValidation = (menuItem) => {
  return { type: menuItem && !!menuItem.type, name: menuItem && !!menuItem.name, price: menuItem && !!menuItem.price };
};

export const ADD_MENU_ITEM = gql`
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
  mutation UpdateMenuItem($_id: ID!, $type: String!, $name: String!, $price: Float!, $photo: String, $file: Upload) {
    updateMenuItem(_id: $_id, type: $type, name: $name, price: $price, photo: $photo, file: $file) {
      _id
      type
      name
      price
      photo
    }
  }
`;

export default function AddMenuItem({ open, handleClose, menuItem, refetch }) {
  const classes = useStyles();

  const [addMenuItem, { loading: addLoading }] = useMutation(ADD_MENU_ITEM);
  const [editMenuItem, { loading: editLoading }] = useMutation(EDIT_MENU_ITEM);

  const [error, setError] = React.useState('');
  const [formData, setFormData] = React.useState(menuItem || DEFAULT);
  const [formValidation, setFormValidation] = React.useState(setDefaultValidation(menuItem));

  const handleFormDataChange = (key, data) => {
    let value = data;
    if (key === 'price' && value) value = parseFloat(value);

    if (REQUIRED.includes(key)) {
      setFormValidation({ ...formValidation, [key]: !!value });
    }

    setFormData({ ...formData, [key]: value });
  };

  const resetDialog = () => {
    setError('');
    setFormData(DEFAULT);
    setFormValidation(setDefaultValidation(DEFAULT));
  };

  const validateForm = () => {
    return REQUIRED.every((key) => formValidation[key]);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (menuItem) {
      editMenuItem({ variables: formData })
        .then(() => {
          resetDialog();
          handleClose();
        })
        .catch((err) => setError(err.message));
    } else {
      addMenuItem({ variables: formData })
        .then(() => {
          resetDialog();
          handleClose();
          refetch();
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          resetDialog();
        }}
      >
        {(editLoading || addLoading) && <LinearProgress />}
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText className={classes.error}>{error}</DialogContentText>
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
                inputProps={{
                  'data-testid': 'type'
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {MENU_TYPE.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {!formValidation.type && (
                <FormHelperText className={classes.error}>Type is a required field.</FormHelperText>
              )}
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
                type='text'
                value={formData.name}
                fullWidth
                InputProps={{
                  className: classes.textField
                }}
                inputProps={{
                  'data-testid': 'name'
                }}
                variant='outlined'
                onChange={(event) => handleFormDataChange('name', event.target.value)}
                required
              />
              {!formValidation.name && (
                <FormHelperText className={classes.error}>Name is a required field.</FormHelperText>
              )}
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
                type='number'
                value={formData.price}
                fullWidth
                InputProps={{
                  className: classes.textField
                }}
                inputProps={{
                  'data-testid': 'price'
                }}
                variant='outlined'
                onChange={(event) => handleFormDataChange('price', event.target.value)}
                required
              />
              {!formValidation.price && (
                <FormHelperText className={classes.error}>Price is a required field.</FormHelperText>
              )}
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
            <Button testId='submit-button' disbaled={editLoading || addLoading} onClick={handleSubmit}>
              Save Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
