import { makeStyles, Container, Grid, Typography } from '@material-ui/core';

import MenuItem from './MenuItem';
import CRButton from '../../commons/Button';

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

function MenuHome() {
  const classes = useStyles();
  return (
    <Container maxWidth='xl' className={classes.main}>
      <Grid container justify='space-between' className={classes.container}>
        <Grid item>
          <Typography variant='h5' className={classes.menu}>
            Menu
          </Typography>
        </Grid>
        <Grid item>
          <CRButton label='Add Menu Item'></CRButton>
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
    </Container>
  );
}

export default MenuHome;
