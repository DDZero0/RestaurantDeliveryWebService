import React from 'react';
import './Home.css';
import {BrowserRouter as Redirect,useHistory,withRouter} from 'react-router-dom';

class Checkout extends React.Component{
  constructor(props){
    super(props);

    let toppings = this.props.history.location.state.toppings;
    let wantedToppings = [];
    let basicTopInfo = {};

    for(let i = 0; i < Object.keys(toppings).length; i++){
      if(toppings[Object.keys(toppings)[i]].selected === true){
        wantedToppings.push([Object.keys(toppings)[i],toppings[Object.keys(toppings)[i]].all,toppings[Object.keys(toppings)[i]].rightHalf,toppings[Object.keys(toppings)[i]].leftHalf]);
      }
    }

    for(let j=0; j < wantedToppings.length; j++){
      for(let k=0; k < 1; k++){
        if(wantedToppings[j][1] === true){
          basicTopInfo[wantedToppings[j][0]] = "All";
        }
        else if (wantedToppings[j][2] === true){
          basicTopInfo[wantedToppings[j][0]] = "Right Half";
        }
        else if(wantedToppings[j][3] === true){
          basicTopInfo[wantedToppings[j][0]] = "Left Half";
        }
        else{
          basicTopInfo[wantedToppings[j][0]] = "All";
        }
      }
    }

    this.state={
      name: this.props.history.location.state.name,
      address: this.props.history.location.state.address,
      email: this.props.history.location.state.email,
      subtotal:0,
      size: this.props.history.location.state.size,
      crust: this.props.history.location.state.crust,
      sauce: this.props.history.location.state.sauce,
      toppings:basicTopInfo
    }

    this.sendOrder = this.sendOrder.bind();
    this.goBack = this.goBack.bind();
  }

componentDidMount(){
  let topsList = document.getElementById('tops-list');
  let listItem = '';
  let textNodes = '';
  let topsCost;
  let subtotal = 0;

  if(this.state.size === 'small'){
    topsCost = 1;
    subtotal = 4.99;
  } else if(this.state.size === 'medium'){
    topsCost = 1.25;
    subtotal = 6.99;
  } else{
    topsCost = 1.5;
    subtotal = 10.99;
  }

  Object.entries(this.state.toppings).forEach(entry =>{
      listItem = document.createElement('li');
      textNodes = document.createTextNode(`${entry[0].toUpperCase()} : ${entry[1]}`);
      listItem.appendChild(textNodes);
      topsList.appendChild(listItem);
      if(entry[0] === 'extraCheese'){
        subtotal += 2 * topsCost;
      } else if(entry[0] === 'donair'){
        subtotal += 2 * topsCost;
      } else{
        subtotal += topsCost;
      }
    })
    this.setState({
      subtotal: subtotal
    })
  }

goBack = (e) =>{
  e.preventDefault();

    this.props.history.push({
      pathname:"/Order",
      state:this.state })
}

sendOrder= async (e)=>{
    e.preventDefault();
    let response = await fetch('api/submitOrder',{method:"POST",body:JSON.stringify(this.state),headers:{
      'Content-Type':"application/json"
    }});
    let data = {
      msg:''
    };
    if(response.status === 200){
    data = await response.json();
    }
    else{
     data.msg = "Error reaching server, sorry!";
    }
    alert(data.msg);
  }

  render(){
    return (
      <div id="checkout-page">

        <div className="row">
           <div className="review-order">
             <h3>Please review your order</h3><br/>

             <h4>Name: {this.props.history.location.state.name}</h4>
             <h4>Address: {this.props.history.location.state.address}</h4>
             <h4>Email: {this.props.history.location.state.email}</h4><br/>
             <h4><u>Pizza Order</u></h4>
             <p>Size: {this.props.history.location.state.size}</p>
             <p>Crust: {this.props.history.location.state.crust}</p>
             <p>Sauce: {this.props.history.location.state.sauce}</p><br/>
             <u>Toppings:</u>
             <div className="toppings">
              <ul id="tops-list">
              </ul>
             </div>
             <br/>
             <h4>Subtotal: {this.state.subtotal.toFixed(2)}</h4>
             <h4>Taxes (15% HST): {(this.state.subtotal * 0.15).toFixed(2)}</h4>
             <h4>--------------</h4>
             <h4>Total: {(this.state.subtotal * 1.15).toFixed(2)}</h4>

           </div>
         </div>

        <div className="row">
            <div className="confirm-order">
              <button className="ok-btn" onClick={this.sendOrder}>Send me dat 'zza!!</button>
              <button className="bad-btn" onClick={this.goBack}>Let's try this again...</button>
            </div>
        </div>

       </div>
    )
  }
}

export default withRouter(Checkout);
