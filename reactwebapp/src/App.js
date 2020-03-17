import React from 'react';
import {
  BrowserRouter as Router,
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
import { Home } from './components/home';
import RemarkDetails from './components/remarkDetails';
import AddRemark from './components/addRemark';
import Login from './components/login';


export default function App() {
  console.log('APP')
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <NavBar></NavBar>
          <Switch>
            <Route path='/' exact render={(props) => <Home {...props}></Home>}/>
            <Route path='/fullRemark:id' render={(props) => <RemarkDetails {...props}></RemarkDetails>}/>
            <Route path='/addRemark' render={(props) => <AddRemark {...props}></AddRemark>}/>
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

