import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import { InfoProvider } from './contexts/infoContext';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Explore from './components/Explore';
import ErrorHandler from './components/ErrorHandler';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <InfoProvider>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/p/:username' component={Profile} />
            <PrivateRoute exact path='/p/*/edit' component={EditProfile} />
            <PrivateRoute exact path='/explore' component={Explore} />
            <Route exact path='/error' component={ErrorHandler} />
          </InfoProvider>
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
