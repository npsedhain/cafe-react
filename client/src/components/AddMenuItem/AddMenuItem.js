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
  }
}));

const DEFAULT = {
  type: '',
  name: '',
  price: '',
  photo: ''
};

export default function AddMenuItem({ open, handleClose }) {
  const classes = useStyles();

  const [formData, setFormData] = React.useState(DEFAULT);
  const handleFormDataChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
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
                <input type='file' hidden onInput={(event) => handleFormDataChange('photo', event.target.files[0])} />
              </InputButton>
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
