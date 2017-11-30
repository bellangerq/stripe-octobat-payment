// Requires
require('dotenv').config()
const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.SECRET_KEY
const app = require('express')()
const bodyParser = require('body-parser')
const stripe = require('stripe')(keySecret)

app.use(bodyParser.json()); // for parsing application/json

const testParams = {
  number: '4242 4242 4242 4242',
  expMonth: 12,
  expYear: 21,
  cvc: '123'
}

// Routes
app.get('/', (req, res) =>
  generateToken(testParams) // Using test params, we should use `req.params`
    .then(createCharge)
    .then(charge => res.status(201).send({ charge }))
    .catch(error => res.status(422).send({ error }))
)

/*
  POST '/'
  {
    "number": "4242 4242 4242 4242",
    "expMonth": 12,
    "expYear": 21,
    "cvc": "123"
  }

  Example :

  curl -i \
    -X POST \
    -H 'Content-Type: application/json' \
    -d '{ "number": "4242 4242 4242 4242", "expMonth": 12, "expYear": 21, "cvc": "123" }' \
    'http://localhost:3000'
*/
app.post('/', (req, res) =>
  generateToken(req.body) // Using test params, we should use `req.params`
    .then(createCharge)
    .then(charge => res.status(201).json({ charge }))
    .catch(error => res.status(422).json({ error }))
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
    source: token.id
  })
