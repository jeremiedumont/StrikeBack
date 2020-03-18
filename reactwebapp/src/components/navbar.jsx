import React, { useState, useEffect } from 'react'

import {
    AppBar,
    Typography,
    Button,
    Toolbar
} from '@material-ui/core'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//ICONS
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import '../styles/navbar.css'
import { useSelector } from 'react-redux';

const NavBar = () => {
    const [isLogged, setIsLogged] = useState(useSelector(state => state.isLoggedIn))

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" >
                    Strike Back |
                </Typography>
                { !isLogged
                    &&
                    <Button
                        href='/login'
                        color="inherit"
                        startIcon={<AccountCircleIcon />}

                    >
                        Login
                    </Button>
                }

                <Fab
                    color="secondary"
                    aria-label="add"
                    href='/addRemark'
                >
                    <AddIcon />
                </Fab>
            </Toolbar>
        </AppBar>
    )
}

class NavBar1 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            open: false
        }
    }

    _handleOpen = () => {
        console.log('OOO')
        this.setState({
            open: true
        })
    };

    _handleClose = () => {
        console.log('CCC')
        this.setState({
            open: false
        })
    };

    render() {
        return (
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" >
                        Strike Back |
                        </Typography>
                    {true
                        &&
                        <Button
                            href='/login'
                            color="inherit"
                            startIcon={<AccountCircleIcon />}

                        >
                            Login
                            </Button>
                    }

                    <Fab
                        color="secondary"
                        aria-label="add"
                        href='/addRemark'
                    >
                        <AddIcon />
                    </Fab>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar