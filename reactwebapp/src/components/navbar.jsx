import React from 'react'

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

export default class NavBar extends React.Component {

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
        return(
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6" >
                            Strike Back | 
                        </Typography>
                        <Button 
                            href='/login' 
                            color="inherit"
                            startIcon={<AccountCircleIcon/>}
                            
                        >
                            Login
                        </Button>
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