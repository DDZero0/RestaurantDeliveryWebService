import React from 'react';
import Checkout from './Checkout';
import './Home.css';
import {BrowserRouter as Redirect,useHistory,withRouter} from 'react-router-dom';

class Order extends React.Component{
  constructor(props){
  super(props);

this.state={
  name:'',
  address:'',
  email:'',
  size:'medium',
  crust: "reg",
  sauce: "reg",
  toppings:{
    "cheese":{
          selected:true,
          all:true,
          leftHalf:false,
          rightHalf:false},
    "extraCheese":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "pepperoni":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "salami":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "ham":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "italianSausage":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "groundBeef":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "bacon":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "donair":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "onion":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "greenPepper":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "tomato":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "pineapple":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false},
    "mushroom":{
          selected:false,
          all:true,
          rightHalf:false,
          leftHalf:false}
  },
}

this.sizeChange = this.sizeChange.bind();
this.crustChange = this.crustChange.bind();
this.sauceChange = this.sauceChange.bind();
this.toppingsChange = this.toppingsChange.bind();
this.halfChange = this.halfChange.bind();
this.orderPizza = this.orderPizza.bind();
this.handleBuyerInfo = this.handleBuyerInfo.bind();
  }

sizeChange=(e)=>{
    this.setState({
    size : e.target.value
  });
  }

crustChange=(e)=>{
  this.setState({
  crust : e.target.value
});
}

sauceChange=(e)=>{
  this.setState({
  sauce : e.target.value
});
}

toppingsChange=(e)=>{

  let checkTops = this.state.toppings;

      if(e.target.checked){
        checkTops[e.target.name].selected = true;
      }
      else{
        checkTops[e.target.name].selected = false;
      }

      this.setState({
        toppings:checkTops
      })
  }

halfChange=(e)=>{
  let currentTops = this.state.toppings;
  if(e.target.value === "leftHalf"){
  currentTops[e.target.name].all = false;
  currentTops[e.target.name].leftHalf = true;
  currentTops[e.target.name].rightHalf = false;
}
  else if(e.target.value === "rightHalf"){
  currentTops[e.target.name].all = false;
  currentTops[e.target.name].leftHalf = false;
  currentTops[e.target.name].rightHalf = true;
}
  else{
  currentTops[e.target.name].all = true;
  currentTops[e.target.name].leftHalf = false;
  currentTops[e.target.name].rightHalf = false;
}

    this.setState({
      toppings:currentTops
    })
}

handleBuyerInfo=(e)=>{
  let formField = e.target.name;
  this.setState({
    [formField]:e.target.value
  })
}

orderPizza =(e) =>{
  e.preventDefault();

    this.props.history.push({
      pathname:"/Checkout",
      state:this.state })
  }

  render(){

    return(

    <div id="order-page">

        <div className="row">
          <div className="col-25">
          </div>

          <div className="col-50">

          <h3>Select the size of the 'zza</h3>
          <form  onSubmit={this.orderPizza}>
            <input type="radio" id="small"
            name="sizeSelect" value="small"
            checked={this.state.size === 'small'} onChange={this.sizeChange}/>
            <label>Small (4.99$ + 1.00$ per topping)</label><br/>

            <input type="radio" id="medium"
            name="sizeSelect" value="medium"
            checked={this.state.size === 'medium'} onChange={this.sizeChange}/>
            <label>Medium (6.99$ + 1.25$ per topping)</label><br/>

            <input type="radio" id="large"
            name="sizeSelect" value="large"
            checked={this.state.size === 'large'} onChange={this.sizeChange}/>
            <label>Large (10.99$ + 1.50$ per topping)</label><br/>

          <h3>Now select a crust...</h3>
              <input type="radio"
              name="crust" value="reg"
              checked={this.state.crust === 'reg'} onChange={this.crustChange}/>
              <label>Regular Crust</label><br/>

              <input type="radio" id="thin"
              name="crust" value="thin"
              checked={this.state.crust === 'thin'} onChange={this.crustChange}/>
              <label>Thin Crust</label><br />

              <input type="radio" id="deep"
              name="crust" value="deep"
              checked={this.state.crust === 'deep'} onChange={this.crustChange}/>
              <label>Deep Dish</label><br/>

              <h3>Then the sauce, the sauce!!</h3>
                <input type="radio" id="noSauce"
                name="sauceSelect" value="none"
                checked={this.state.sauce === 'none'} onChange={this.sauceChange}/>
                <label>No Sauce</label><br/>

                <input type="radio" id="regSauce"
                name="sauceSelect" value="reg"
                checked={this.state.sauce === 'reg'} onChange={this.sauceChange}/>
                <label>Regular Sauce</label><br/>

                <input type="radio" id="extraSauce"
                name="sauceSelect" value="extra"
                checked={this.state.sauce === 'extra'} onChange={this.sauceChange}/>
                <label>Extra Sauce</label><br/>

              <div className="row">
                <h3>NOW CHOOSE TOPPINGS, THE TOPPING GOD DAMMIT</h3>
                <div className="col-50">
                  <h4>Toppings</h4>
                  <input className="toppings" checked={this.state.toppings['cheese'].selected} type="checkbox" name="cheese" onChange={this.toppingsChange}/>
                  <label>Cheese</label><br/>
                  <input className="toppings" type="checkbox" name="extraCheese" onChange={this.toppingsChange}/>
                  <label><b>Extra Cheese*</b></label><br/>
                  <input className="toppings" type="checkbox" name="pepperoni" onChange={this.toppingsChange}/>
                  <label>Pepperoni</label><br/>
                  <input className="toppings" type="checkbox" name="salami" onChange={this.toppingsChange}/>
                  <label>Salami</label><br/>
                  <input className="toppings" type="checkbox" name="ham" onChange={this.toppingsChange}/>
                  <label>Ham</label><br/>
                  <input className="toppings" type="checkbox" name="italianSausage" onChange={this.toppingsChange}/>
                  <label>Italian Sausage</label><br/>
                  <input className="toppings" type="checkbox" name="groundBeef" onChange={this.toppingsChange}/>
                  <label>Ground Beef</label><br/>
                  <input className="toppings" type="checkbox" name="bacon" onChange={this.toppingsChange}/>
                  <label>Bacon</label><br/>
                  <input className="toppings" type="checkbox" name="donair" onChange={this.toppingsChange}/>
                  <label><b>Donair Meat*</b></label><br/>
                  <input className="toppings" type="checkbox" name="onion" onChange={this.toppingsChange}/>
                  <label>Onion</label><br/>
                  <input  className="toppings"type="checkbox" name="greenPepper" onChange={this.toppingsChange}/>
                  <label>Green Pepper</label><br/>
                  <input className="toppings" type="checkbox" name="tomato" onChange={this.toppingsChange}/>
                  <label>Tomato</label><br/>
                  <input className="toppings" type="checkbox" name="pineapple" onChange={this.toppingsChange}/>
                  <label>Pineapple</label><br/>
                  <input className="toppings" type="checkbox" name="mushroom" onChange={this.toppingsChange}/>
                  <label>Mushroom</label><br/>
                </div>
                <div className="col-25">
                  <h4>Full or Half</h4>
                  <div className="radio-spans">
                      <input type="radio" disabled ={!this.state.toppings['cheese'].selected}
                      name="cheese" value="all"
                      checked={this.state.toppings['cheese'].all === true} onChange={this.halfChange}/>
                      <label className="toppingsRadio">Full</label>

                      <input type="radio" disabled ={!this.state.toppings['cheese'].selected}
                      name="cheese" value="leftHalf"
                      checked={this.state.toppings['cheese'].leftHalf === true} onChange={this.halfChange}/>
                      <label className="toppingsRadio">Left Half</label>

                      <input type="radio" disabled ={!this.state.toppings['cheese'].selected}
                      name="cheese" value="rightHalf"
                      checked={this.state.toppings['cheese'].rightHalf === true} onChange={this.halfChange}/>
                      <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                      <input type="radio" disabled={!this.state.toppings['extraCheese'].selected}
                      name="extraCheese" value="all"
                      checked={this.state.toppings['extraCheese'].all === true} onChange={this.halfChange}/>
                      <label className="toppingsRadio">Full</label>

                      <input type="radio" disabled ={!this.state.toppings['extraCheese'].selected}
                      name="extraCheese" value="leftHalf"
                      checked={this.state.toppings['extraCheese'].leftHalf === true} onChange={this.halfChange}/>
                      <label className="toppingsRadio">Left Half</label>

                      <input type="radio" disabled ={!this.state.toppings['extraCheese'].selected}
                      name="extraCheese" value="rightHalf"
                      checked={this.state.toppings['extraCheese'].rightHalf === true} onChange={this.halfChange}/>
                      <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['pepperoni'].selected}
                    name="pepperoni" value="all"
                    checked={this.state.toppings['pepperoni'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled ={!this.state.toppings['pepperoni'].selected}
                    name="pepperoni" value="leftHalf"
                    checked={this.state.toppings['pepperoni'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled ={!this.state.toppings['pepperoni'].selected}
                    name="pepperoni" value="rightHalf"
                    checked={this.state.toppings['pepperoni'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['salami'].selected}
                    name="salami" value="all"
                    checked={this.state.toppings['salami'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled={!this.state.toppings['salami'].selected}
                    name="salami" value="leftHalf"
                    checked={this.state.toppings['salami'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled={!this.state.toppings['salami'].selected}
                    name="salami" value="rightHalf"
                    checked={this.state.toppings['salami'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['ham'].selected}
                    name="ham" value="all"
                    checked={this.state.toppings['ham'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled={!this.state.toppings['ham'].selected}
                    name="ham" value="leftHalf"
                    checked={this.state.toppings['ham'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled={!this.state.toppings['ham'].selected}
                    name="ham" value="rightHalf"
                    checked={this.state.toppings['ham'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['italianSausage'].selected}
                    name="italianSausage" value="all"
                    checked={this.state.toppings['italianSausage'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled={!this.state.toppings['italianSausage'].selected}
                    name="italianSausage" value="leftHalf"
                    checked={this.state.toppings['italianSausage'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled={!this.state.toppings['italianSausage'].selected}
                    name="italianSausage" value="rightHalf"
                    checked={this.state.toppings['italianSausage'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['groundBeef'].selected}
                    name="groundBeef" value="all"
                    checked={this.state.toppings['groundBeef'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled={!this.state.toppings['groundBeef'].selected}
                    name="groundBeef" value="leftHalf"
                    checked={this.state.toppings['groundBeef'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled={!this.state.toppings['groundBeef'].selected}
                    name="groundBeef" value="rightHalf"
                    checked={this.state.toppings['groundBeef'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['bacon'].selected}
                    name="bacon" value="all"
                    checked={this.state.toppings['bacon'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio"
                    name="bacon" value="leftHalf" disabled={!this.state.toppings['bacon'].selected}
                    checked={this.state.toppings['bacon'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio"
                    name="bacon" value="rightHalf" disabled={!this.state.toppings['bacon'].selected}
                    checked={this.state.toppings['bacon'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['donair'].selected}
                    name="donair" value="all"
                    checked={this.state.toppings['donair'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled={!this.state.toppings['donair'].selected}
                    name="donair" value="leftHalf"
                    checked={this.state.toppings['donair'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled={!this.state.toppings['donair'].selected}
                    name="donair" value="rightHalf"
                    checked={this.state.toppings['donair'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['onion'].selected}
                    name="onion" value="all"
                    checked={this.state.toppings['onion'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled={!this.state.toppings['onion'].selected}
                    name="onion" value="leftHalf"
                    checked={this.state.toppings['onion'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled={!this.state.toppings['onion'].selected}
                    name="onion" value="rightHalf"
                    checked={this.state.toppings['onion'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['greenPepper'].selected}
                    name="greenPepper" value="all"
                    checked={this.state.toppings['greenPepper'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled={!this.state.toppings['greenPepper'].selected}
                    name="greenPepper" value="leftHalf"
                    checked={this.state.toppings['greenPepper'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled={!this.state.toppings['greenPepper'].selected}
                    name="greenPepper" value="rightHalf"
                    checked={this.state.toppings['greenPepper'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['tomato'].selected}
                    name="tomato" value="all"
                    checked={this.state.toppings['tomato'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled={!this.state.toppings['tomato'].selected}
                    name="tomato" value="leftHalf"
                    checked={this.state.toppings['tomato'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled={!this.state.toppings['tomato'].selected}
                    name="tomato" value="rightHalf"
                    checked={this.state.toppings['tomato'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['pineapple'].selected}
                    name="pineapple" value="all"
                    checked={this.state.toppings['pineapple'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled={!this.state.toppings['pineapple'].selected}
                    name="pineapple" value="leftHalf"
                    checked={this.state.toppings['pineapple'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled={!this.state.toppings['pineapple'].selected}
                    name="pineapple" value="rightHalf"
                    checked={this.state.toppings['pineapple'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  <div className="radio-spans">
                    <input type="radio" disabled={!this.state.toppings['mushroom'].selected}
                    name="mushroom" value="all"
                    checked={this.state.toppings['mushroom'].all === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Full</label>

                    <input type="radio" disabled={!this.state.toppings['mushroom'].selected}
                    name="mushroom" value="leftHalf"
                    checked={this.state.toppings['mushroom'].leftHalf === true} onChange={this.halfChange}/>
                    <label className="toppingsRadio">Left Half</label>

                    <input type="radio" disabled={!this.state.toppings['mushroom'].selected}
                    name="mushroom" value="rightHalf"
                    checked={this.state.toppings['mushroom'].rightHalf === true} onChange={this.halfChange}/>
                    <label>Right Half</label>
                  </div>
                  </div>
                </div>
                <h5>*Items are premium toppings and cost double</h5>
                <br/>
                <h4>Add ons, cause we all about chasin that paper baby</h4>
                <div className="row">
                  <div className="add-ons col-50">
                    <input type="checkbox" name="pipsay" checked={true}/>
                    <label>Tin o'pipsay</label>
                  </div>
                  <div className="col-25">
                    <input type="number" placeholder="Quantity"/>
                  </div>
                </div>
              <br/>
              <h4>Finally, the info we need to get it the pizza to you</h4>
              <input type="text" name="name" placeholder="Name" onChange={this.handleBuyerInfo} required/><br/>
              <input type="text" name="address" placeholder="Address" onChange={this.handleBuyerInfo} required/><br/>
              <input type="email" name="email" placeholder="Email Address" onChange={this.handleBuyerInfo} required/><br/>
              <button type="submit" >Submit Order!</button>
          </form>
          </div>

          <div className="col-25">
          </div>

        </div>
  </div>

    )
  }
}

export default withRouter(Order) ;
