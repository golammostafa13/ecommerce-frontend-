import React from 'react';
import {AppBar, Toolbar, Badge, IconButton, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyle from './style.js';
import logo from '../../assets/images/logo.png';
import {Link, useLocation} from 'react-router-dom';
const Header = ({totalItems}) => {
    const classes = useStyle();
    const location = useLocation();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Rasel E-Commerce" height="25px" className={classes.image}/>
                    </Typography>
                    <div className={classes.grow}></div>
                    {location.pathname==="/" &&
                        <div className={classes.button}>
                            <IconButton component={Link} to="/cart" aria-label="Shop-Cart" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;