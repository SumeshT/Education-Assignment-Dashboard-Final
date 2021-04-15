import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Wall from './Wall.jpg';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${Wall})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(0px)',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    headline :{
        backgroundColor: ["rgb(0,0,0)", "rgba(0,0,0, 0.4)"],
        color: "white",
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        width: "80%",
        padding: "20px",
        textAlign: "center",
        filter : '0px',
        fontSize: "2.5em",
        fontFamily : "serif"
    },
    ".ml11": { fontWeight: 700, fontSize: "2.5em" },
    ".ml11 .text-wrapper": {
        position: "relative",
        display: "inline-block",
        paddingTop: "0.1em",
        paddingRight: "0.05em",
        paddingBottom: "0.15em"
    },
    ".ml11 .line": {
        opacity: 0,
        position: "absolute",
        left: "0",
        height: "100%",
        width: "3px",
        backgroundColor: "#fff",
        transformOrigin: "0 50%"
    },
    ".ml11 .line1": { top: "0", left: "0" },
}));

function RadioButtonsGroup() {
    const [value, setValue] = React.useState('Student');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
}

export default function EnterOTP() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image}>
                <div className={classes.headline}>
                    <h1 className="ml11">
                  <span className="text-wrapper">
                    <span className="line line1"></span>
                    <span className="letters">Welcome to Dashboard</span>
                  </span>
                    </h1>
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password?
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="Password"
                            id="newPassword"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="reenterPassword"
                            label="Re-Enter Password"
                            type="Password"
                            id="reenterPassword"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Change Password
                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
