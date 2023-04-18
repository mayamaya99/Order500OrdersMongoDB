console.log('Server-side code running');

const express = require('express');

const app = express();

// for writing to file system
const fs = require('fs');

const mongoose = require('mongoose');


// serve files from the public directory
app.use(express.static('public'));
app.use(express.json());


app.listen(3000, () => {
  console.log('listening on 3000');
});

// connect to he database
mongoose.connect('mongodb+srv://elmiUser:Amina@cluster0.fh0dilb.mongodb.net/orders-db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// define schema for mongo db document
const orderSchema = new mongoose.Schema({
  storeId: String,
  salesPersonId: String,
  cdId: String,
  pricePaid: Number,
  date: Date
});

// const orderSchema = require("./orderSchema");

// create a model for the order document
const Order = mongoose.model('Order', orderSchema);


// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/submitOrder1', (req, res) => {
  const order = req.body;
  console.log('Received order:', order);

  const new_order = new Order({
    storeId: order.storeId,
    salesPersonId: order.salesPersonId,
    cdId: order.cdId,
    pricePaid: order.pricePaid,
    date: order.date
  })
  try {

    new_order.save()
    console.log('Order saved to MongoDB');
    res.json({ message: 'Order submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting order.');
  }
});

app.get('/getSelectLatest', async (req, res) => {

  try {
    const orders = await Order.find().sort({ date: -1 }).limit(10);  
    console.log(`Retrieved ${orders.length} orders from MongoDB`);
    res.json(orders); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving orders.');
  }
});

app.get('/getSelectMaxSalesPer', async (req, res) => {

  try {
    
    const maxSalesperson = await Order.aggregate([
      {
        $group: {
          _id: '$salesPersonId',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 1
      }
    ]);

    const maxSalespersonId = maxSalesperson[0]._id;

   
    const orders = await Order.find({ salesPersonId: maxSalespersonId });

    console.log(`Retrieved ${orders.length} orders with maximum salespersonid from MongoDB`);
    res.json(orders); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving orders with maximum salespersonid.');
  }
});