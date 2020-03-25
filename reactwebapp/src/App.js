import React, { useEffect } from 'react';
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
import Admin from './components/administrator';
import MyActivities from './components/myActivities'; 

import { login as loginDAO } from './DAOs/usersDAO';

import history from './history'

import {useDispatch} from 'react-redux'
import {login} from './actions'


export default function App() {
  console.log('The Strike Back App is running')
  //const auth = useSelector(state => state.authenticationReducer.token)
  const dispatch = useDispatch()

  useEffect(() => {
    //Auto login when first render of App
    const pseudo = localStorage.getItem('pseudo')
    const pwd = localStorage.getItem('pwd')
    if (pseudo != null && pwd != null) {
      loginDAO(pseudo, pwd, true)
      .then((res) => {
          if (res.status == 200) {
              res.json().then(resJson => {
                console.log(resJson)
                  dispatch(login(resJson.authToken, resJson.heards, resJson.ups, resJson.downs, resJson.reports, resJson.admin))
              })
          } else {
              console.log(res)
              res.json().then(resJson => {
                  alert(resJson)
              })
          }
      })
    }
  },[])

  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <div className="App">

          <NavBar></NavBar>

          <Switch>
            <Route path='/' exact render={(props) => <Home {...props}></Home>}/>
            <Route path='/signup' render={(props) => <SignUp {...props}></SignUp>}/>
            <Route path='/login' render={(props) => <Login {...props}></Login>}/>
            <Route path='/fullRemark:id' render={(props) => <RemarkDetails {...props}></RemarkDetails>}/>
            <Route path='/addRemark' render={(props) => <AddRemark {...props}></AddRemark>}/>
            <Route path='/admin' render={(props) => <Admin {...props}></Admin>}/>
            <Route path='/myactivities' render={(props) => <MyActivities {...props}></MyActivities>}/>
          </Switch>
          
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

