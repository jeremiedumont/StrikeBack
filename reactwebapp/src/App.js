import React from 'react';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom'

import './styles/App.css';
import {
  MuiThemeProvider,
  createMuiTheme 
} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';

import NavBar from './components/navbar';
import Home from './components/home';
import RemarkDetails from './components/remarkDetails';
import AddRemark from './components/addRemark';
import Login from './components/login';
import SignUp from './components/signUp';

import history from './history'

//import {useSelector, useDispatch} from 'react-redux'
//import {login, logout} from './actions'


export default function App() {
  console.log('APP')
  //const auth = useSelector(state => state.authenticationReducer.token)
  //const dispatch = useDispatch()
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <div className="App">

          <NavBar></NavBar>

          <Switch>
            <Route path='/' exact render={(props) => <Home {...props}></Home>}/>
            <Route path='/fullRemark:id' render={(props) => <RemarkDetails {...props}></RemarkDetails>}/>
            <Route path='/addRemark' render={(props) => <AddRemark {...props}></AddRemark>}/>
            <Route path='/signup' render={(props) => <SignUp {...props}></SignUp>}/>
            <Route path='/login' render={(props) => <Login {...props}></Login>}/>
          </Switch>

          <footer className="App-footer">
            This is our wonderful footer
          </footer>

        </div>
      </Router>
    </MuiThemeProvider>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: blue,
  },
  status: {
    danger: 'orange',
  },
});

