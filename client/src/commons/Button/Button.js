import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}));

function CRButton({ onClick, children }) {
  const classes = useStyles();

  return (
    <Button className={classes.button} onClick={onClick}>
      {children}
    </Button>
  );
}

export default CRButton;
