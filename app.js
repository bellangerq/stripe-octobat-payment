// Express
const express = require('express')
const app = express()
app.listen(3000)
require('dotenv').config()

// Stripe
const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')(keySecret)

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // for parsing application/json

// Sass preprocessor
const sassMiddleware = require('node-sass-middleware')
const path = require('path')
app.use(sassMiddleware({
    src: path.join(__dirname, '/sass'),
    dest: path.join(__dirname, '/public'),
    debug: true,
    outputStyle: 'compressed',
    force: true
}))

// Html templating
app.set('view engine', 'pug')
app.use('/public', express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', (req, res) => res.render('index'))
app.post('/charge', (req, res) =>

  generateToken({
    number: req.body.number,
    expMonth: req.body.expMonth,
    expYear: req.body.expYear,
    cvc: req.body.cvc
  })

    .then(token => createCharge(token, req.body.amount * 100))

    .then(charge => res.render(
      "result", { charge: charge },
      console.log(charge)
    ))

    .catch(error => res.render(
      "result", { error: error },
      console.log(error)
    ))
)

const generateToken = ({ number, expMonth, expYear, cvc }) =>
  stripe.tokens.create({
    card: {
      number,
      exp_month: expMonth,
      exp_year: expYear,
      cvc
    }
  })

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
    -d '{ "number": "4242 4242 4242 4242", "expMonth": 12, "expYear": 21, "cvc": "123", "amount": 120 }' \
    'http://localhost:3000/charge'
*/
