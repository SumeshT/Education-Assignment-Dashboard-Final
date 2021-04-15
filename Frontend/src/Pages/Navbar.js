import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Badge, IconButton, Toolbar} from "@material-ui/core";
import {Home} from "@material-ui/icons";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {ExitToApp} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../actions/userAction";

const useStyles = makeStyles((theme) =>({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    appbar: {
        background: 'orange',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        paddingLeft: '30px',
        paddingRight: '30px'
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Zapf-Chancery',
        fontSize:'30px',
        paddingLeft:'5px',
    },
    logout:{
        fontSize:'2rem',
        paddingRight:'5px',
    },
    adddata : {
        marginRight : '50px'
    },
    user:{
        marginRight: 20
    }
}))
export default function Navbar() {
    const classes = useStyles();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    };
    return(
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Link to = '/'>
                        <IconButton edge="start" color="inherit" aria-label="home">
                            <Home fontSize="large" />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        <Link to='/' className={classes.link}>DASHBOARD</Link>
                    </Typography>
                    {(userInfo)?<Typography variant="h5" className={classes.user}><Link>{userInfo.name} </Link></Typography>:<></>}
                    <ExitToApp className={classes.logout}></ExitToApp>
                    <Typography variant="h7" >
                        <Link to='/logout' onClick = {logoutHandler} className={classes.link}>LOGOUT</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
