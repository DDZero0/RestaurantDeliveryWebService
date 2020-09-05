const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let transport = nodemailer.createTransport(
  {host: 'smtp.bellaliant.net',
    port: 25});

const dbString = "mongodb+srv://DDZero:D0d5ehts@cluster0-qj6cl.mongodb.net/test?retryWrites=true\&w=majority";

mongodb.connect(dbString,(err,data)=>{
  if (err) throw err;
  let db = data.db('Pizza');

app.get('/api/getOrders',(req,res)=>{
  db.collection('Orders').find({}).toArray((err,doc)=>{
    if (err) throw err;
    res.json(doc);
  })
})

app.post('/api/submitOrder',(req,res)=>{
  let name = req.body.name;
  let address = req.body.address;
  let email = req.body.email;
  let size = req.body.size;
  let crust = req.body.crust;
  let sauce = req.body.sauce;
  let toppings = req.body.toppings;

  let topsCost;
  let total = 0;

  if(size === 'small'){
    topsCost = 1;
    total = 4.99;
  } else if(size === 'medium'){
    topsCost = 1.25;
    total = 6.99;
  } else{
    topsCost = 1.5;
    total = 10.99;
  }

  for(let i = 0; i < Object.keys(toppings).length;i++){
    if(Object.keys(toppings)[i] === 'extraCheese' || Object.keys(toppings)[i] === 'donair'){
      total += 2 * topsCost;
    }
    total += topsCost;
  }

  total = total.toFixed(2);

  db.collection('Orders').insertOne({
    Name:name,
    Address:address,
    Email:email,
    Crust:crust,
    Size: size,
    Sauce:sauce,
    Toppings:toppings,
    Cost: total
    },
    (err,doc)=>{
      if(err) throw err;

      res.json({msg:"Accepted order"});
    })
  })

app.post('/api/completeOrder',(req,res)=>{
  console.log(req.body);
   let name = req.body.name;
   let email = req.body.email;
   let cost = req.body.cost * 1.15;
   let time = req.body.time * 5 + 20;

   const message = {
       from: 'no-reply@ddspizza.com', // Sender address
       to: email,         // List of recipients
       subject: 'Order out for delivery!', // Subject line
       text: `Hey ${name}, your pizza is out for delivery!
       Your pizza should arrive in approximately ${time} minutes.
       You owe ${cost} at time of delivery!
       Thanks again for choosing DD's Pizzaria!` // Plain text body
   };
   transport.sendMail(message, function(err, info) {
       if (err) {
         console.log(err)
       } else {
         console.log(info);
       }
   });
   db.collection('Orders').deleteOne({Name:name},(err,doc)=>{
     if (err) throw err;
      res.json({msg:`${name}'s order has been sent out for delivery!'`});
   })

})
})

app.listen(3001,()=>{console.log('Listening on port 3001!')});

module.exports = app;
