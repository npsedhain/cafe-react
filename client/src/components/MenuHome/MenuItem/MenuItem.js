import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

import Button from '../../../commons/Button';
import AddMenuItem from '../../AddMenuItem';
import ConfirmationDialog from '../../../commons/ConfirmationDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400
  },
  paper2: {
    height: 250,
    width: 450,
    backgroundColor: theme.palette.secondary.main
  },
  photo: {
    height: 250,
    width: 450,
    objectFit: 'cover'
  },
  paper: {
    height: 350,
    width: 450,
    backgroundColor: theme.palette.surface
  },
  cardTextContainer: {
    padding: theme.spacing(3)
  },
  price: {
    textAlign: 'right'
  }
}));

const DELETE_MENU_ITEM = gql`
  mutation DeleteMenuItem($_id: ID!) {
    deleteMenuItem(_id: $_id) {
      _id
    }
  }
`;

export default function MenuItem({ ...props }) {
  const classes = useStyles();

  const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM);
  const [isEditDialogOpen, setEditDialogOpen] = React.useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = React.useState(false);

  const openEditDialog = () => {
    setEditDialogOpen(true);
  };

  const openConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setConfirmationDialogOpen(false);
  };

  const handleDelete = () => {
    deleteMenuItem({ variables: { _id: props._id } });
    handleDialogClose();
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container className={classes.paper2}>
          <Grid item>
            <img className={classes.photo} src={props.photo} alt={props.name} />
          </Grid>
        </Grid>
        <Grid container className={classes.cardTextContainer} justify='space-between'>
          <Grid item>
            <Typography variant='h6' color='textSecondary'>
              {props.type}
            </Typography>
            <Typography variant='h5' color='textPrimary'>
              {props.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.price} variant='subtitle1' color='textSecondary'>
              ${props.price}
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button onClick={openEditDialog}>Edit</Button>
              </Grid>
              <Grid item>
                <Button onClick={openConfirmationDialog} danger>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {isEditDialogOpen && <AddMenuItem open={true} handleClose={handleDialogClose} menuItem={props} />}
      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          open={true}
          handleClose={handleDialogClose}
          title='Delete Item?'
          body='Are you sure you want to delete the item?'
          action='Delete'
          handleConfirmation={handleDelete}
        />
      )}
    </>
  );
}
