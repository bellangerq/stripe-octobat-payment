// Requires
require('dotenv').config()
const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.SECRET_KEY
const app = require('express')()
const stripe = require('stripe')(keySecret)

const params = {
  number: '4242 4242 4242 4242',
  expMonth: 12,
  expYear: 21,
  cvc: '123'
}

// Routes
app.get('/', (req, res) =>
  generateToken(params)
    .then(createCharge)
    .then(token => res.status(201).send({ token }))
    .catch(error => res.status(422).send({ error }))
)

app.listen(3000)

// Generate a card token
const generateToken = ({ number, expMonth, expYear, cvc }) =>
  stripe.tokens.create({
    card: {
      number,
      exp_month: expMonth,
      exp_year: expYear,
      cvc
    }
  })

// Create charge with card token
const createCharge = token =>
  stripe.charges.create({
    amount: 2000,
    currency: 'eur',
    source: token
  })
