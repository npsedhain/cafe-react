import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  makeStyles
} from '@material-ui/core/';

import Button from '../Button';

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.danger
  }
}));

export default function ConfirmationDialog({
  open,
  handleClose,
  title,
  body,
  handleConfirmation,
  action,
  loading,
  error
}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {loading && <LinearProgress />}
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.error}>{error}</DialogContentText>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disbaled={loading} onClick={handleConfirmation} danger autoFocus>
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
