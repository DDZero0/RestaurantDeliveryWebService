import React from 'react';
import Home from './Home';
import Order from './Order';
import Checkout from './Checkout';
import StaffPage from './StaffPage';
import Navbar from './Navbar';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';


function Start(){

return(
<Router>
  <Switch>
    <Route path="/Order">
      <Navbar tab="orderTab"/>
      <Order />
    </Route>
    <Route path="/Checkout">
      <Navbar />
      <Checkout />
    </Route>
    <Route path="/StaffPage">
      <StaffPage />
    </Route>
    <Route path="/">
      <Navbar />
      <Home />
    </Route>
  </Switch>
</Router>
);
}

export default Start;
