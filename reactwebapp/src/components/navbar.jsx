import React from 'react'

import {
    AppBar,
    Typography,
    Button,
    Toolbar,
    Grid
} from '@material-ui/core'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//ICONS
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import '../styles/navbar.css'
import { connect } from 'react-redux'

import history from '../history'

const NavBar = (props) => {
    //var [isLogged, setIsLogged] = useState(useSelector(state => state.isLoggedIn))

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={4}>
                        <Typography
                            variant="h4"
                            onClick={() => history.push('/')}
                            className='NavBar-Title'
                        >
                            Strike Back
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        {!props.isLogged
                            &&
                            <Button
                                href='/login'
                                color="inherit"
                                startIcon={<AccountCircleIcon />}
                            >
                                Login
                        </Button>
                        }
                    </Grid>

                    <Grid item xs={4}>
                        <Fab
                            color="secondary"
                            aria-label="add"
                            onClick={() => history.push('/addRemark')}
                        >
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => ({
    isLogged: state.authenticationReducer.token
})

export default connect(mapStateToProps)(NavBar)
//export default NavBar