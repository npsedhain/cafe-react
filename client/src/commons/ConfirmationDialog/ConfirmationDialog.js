import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';

import Button from '../Button';

export default function ConfirmationDialog({ open, handleClose, title, body, handleConfirmation, action }) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmation} danger autoFocus>
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
