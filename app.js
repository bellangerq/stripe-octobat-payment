// Requires
require('dotenv').config()
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const app = require('express')();
const stripe = require('stripe')(keySecret);

// Routes
app.get('/', (req, res) => {
  generateToken('4242 4242 4242 4242', 12, 21, '123');
});

app.listen(3000);

// Generate a card token
const generateToken = (number, exp_month, exp_year, cvc) => {
  stripe.tokens.create({
    card: {
      number,
      exp_month,
      exp_year,
      cvc
    }
  })
  .then(token => {
    console.log(`Token: ${token.id}`);
    createCharge(token);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
};

// Create charge with card token
const createCharge = (token) => {
  stripe.charges.create({
    amount: 2000,
    currency: 'eur',
    source: "tok_visa", // doesn't work with `token`
  })
  .then(charge => {
    console.log(`Charge: ${charge.id}`);
  })
  .catch(err => {
    console.log(err);
  })
}
