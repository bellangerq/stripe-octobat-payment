// REQUIRE
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const app = require("express")();
const stripe = require("stripe")(keySecret);

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));

// ROUTES
app.get("/", (req, res) => {
  res.render("index.pug", {keyPublishable})
});

app.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      currency: "eur",
      customer: customer.id
    }))
  .then(charge => console.log(`Charge: ${charge.id}`))
  .catch(err => {
    console.log(`Error: ${err}`);
  });
});

app.listen(3000);
