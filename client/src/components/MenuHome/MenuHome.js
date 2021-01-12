import React from 'react';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';

import Button from '../../commons/Button';

import MenuItem from './MenuItem';
import AddMenuItem from '../AddMenuItem';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '85vw'
  },
  container: {
    marginTop: theme.spacing(4)
  },
  cardsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  menu: {
    color: theme.palette.text.primary
  }
}));

export default function MenuHome() {
  const classes = useStyles();

  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const openAddDialog = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth='xl' className={classes.main}>
      <Grid container justify='space-between' className={classes.container}>
        <Grid item>
          <Typography variant='h5' className={classes.menu}>
            Menu
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={openAddDialog}>Add Menu Item</Button>
        </Grid>
      </Grid>
      <Grid container justify='space-between' spacing={4} className={classes.cardsContainer}>
        <Grid item>
          <MenuItem type='Main Course' name='Pizza' price='10.99' />
        </Grid>
        <Grid item>
          <MenuItem type='Main Course' name='Pizza' price='10.99' />
        </Grid>
        <Grid item>
          <MenuItem type='Main Course' name='Pizza' price='10.99' />
        </Grid>
        <Grid item>
          <MenuItem type='Main Course' name='Pizza' price='10.99' />
        </Grid>
      </Grid>
      <AddMenuItem open={isDialogOpen} handleClose={handleDialogClose} />
    </Container>
  );
}
