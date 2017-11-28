// REQUIRE
require('dotenv').config()
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const app = require("express")();
const stripe = require("stripe")(keySecret);

// ROUTES
app.get("/", (req, res) => {
  generateToken("4242424242424242", 12, 21, "123");
});

app.post("/charge", (req, res) => {
  // https://stripe.com/docs/recipes/custom-checkout
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
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
};
