// Requires
require('dotenv').config()
const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.SECRET_KEY
const app = require('express')()
const bodyParser = require('body-parser')
const stripe = require('stripe')(keySecret)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // for parsing application/json

app.set('view engine', 'pug')

// Routes
app.get('/', (req, res) => res.render('index'))

app.post('/charge', (req, res) =>

  // Pass form params to create new token
  generateToken({
    number: req.body.number,
    expMonth: req.body.expMonth,
    expYear: req.body.expYear,
    cvc: req.body.cvc
  })
    // Create charge with form amount field
    .then(token => createCharge(token, req.body.amount))

    // Render result
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
const createCharge = (token, amount) =>
  stripe.charges.create({
    amount: amount,
    currency: 'eur',
    source: token.id
  })

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
