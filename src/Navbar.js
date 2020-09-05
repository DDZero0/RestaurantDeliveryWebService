import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom';
import './Home.css';


class Navbar extends React.Component{

  render(){
    return (<div className="row nav">

  <div className="col-33">
    <img id="logo" src="https://i.pinimg.com/originals/bd/83/75/bd8375b4bb1a6b22583acdd99be81ed0.png" />
    <h4 className="logo-caption">DD's Pizza</h4>
  </div>

  <div className="col-66">
    <ul className="navbar">
      <li>Products</li>
      <Link to="/Order"><li>Order</li></Link>
      <li>Contact</li>
      <li>About</li>
      <li id="lastList">Privacy Statement</li>
    </ul>
  </div>
</div>)
}
}

export default Navbar;
