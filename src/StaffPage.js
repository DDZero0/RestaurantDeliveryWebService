import React from 'react';
import {BrowserRouter as Redirect,useHistory,withRouter} from 'react-router-dom';
import './Home.css';

class StaffPage extends React.Component{
  constructor(props){
    super(props);

    this.state={
      name:'',
      address:'',
      email:'',
      size:'',
      crust:'',
      sauce:'',
      toppings:{},
      cost:'',
      waitingList:0,
    }

this.getOrders = this.getOrders.bind();
this.completeOrder = this.completeOrder.bind();
  }

completeOrder = async (name,email,cost,queue) =>{
  let payload = {
    name: name,
    email: email,
    cost: cost,
    time: queue,
  }
  let response = await fetch('api/completeOrder',{method:"POST", body:JSON.stringify(payload),headers:{
    'Content-Type':"application/json"
  }});
  let data ={};
  if(response.status === 200){
    data = await response.json();
  }
  else{
    data.msg = 'Error reaching server! Try again';
  }
  alert(data.msg);
  this.getOrders();
}

getOrders = async ()=>{

  let ordersDiv = document.getElementById("orders");
  let wholeOrder = [];
  let response = await fetch('/api/getOrders');
  let data;
  if(response.status === 200){
    data = await response.json();
  }
  else{
    data = {msg:"Error retrieving pizzas!!!"};
    alert(data.msg);
    return;
  }

//Cycles through the db to pull the orders
  for(let i=0; i< Object.values(data).length;i++){
    let orderInfo = Object.values(data)[i];

//variable creation
    let customerAndCrust =
    <div className="customerInfo">
    <h3>Name: {orderInfo.Name}</h3>
    <h4>Address: {orderInfo.Address}</h4>
    <h4>Email: {orderInfo.Email}</h4>
    <h4>Size: {orderInfo.Size}</h4>
    <h4>Crust: {orderInfo.Crust}</h4>
    <h4>Sauce: {orderInfo.Sauce}</h4>
    </div>;
    let cost = <h4>Cost: {orderInfo.Cost}</h4>;
    let newLine=<br/>;
    let combinedOrder = [];
    let toppingsArr = Object.entries(orderInfo.Toppings);
    let formattedToppingsArr = [];

    let clearOrder = <button className="ok-btn"
    onClick={()=>this.completeOrder(orderInfo.Name,orderInfo.Email,orderInfo.Cost,this.state.waitingList)}
    >Out for Delivery!</button>

    toppingsArr.forEach( entry => {
    formattedToppingsArr.push(`${entry[0]} : ${entry[1]}`);
    formattedToppingsArr.push(newLine);
    });

    combinedOrder.push(customerAndCrust, formattedToppingsArr, cost, clearOrder);
    wholeOrder.push(<div className="wholeOrder">{combinedOrder}</div>);

    this.setState({
      order: [...wholeOrder],
      waitingList : wholeOrder.length
    })
 }

}

componentDidMount(){
  this.getOrders();
  let x = setInterval(()=>{
    this.getOrders();
  },10000);
}

render(){
  return(
          <div id="staff-page">
          <div className="row">{this.state.order}</div>
          </div>)
}


}

export default withRouter(StaffPage);
