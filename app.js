// Imports
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/payment', (req, res) => {
  // Retrieve forms inputs
  const amount = req.body.amount * 100;

  // Create Stripe charge
  stripe.charges.create({
    amount: amount,
    currency: "zq",
    source: "tok_mastercard"
  })

});

// Local server
app.listen(3000, () => console.log('Example app listening on port 3000!'));
