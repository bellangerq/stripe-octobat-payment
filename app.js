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

app.use('/public', express.static(path.join(__dirname, 'public')))

// Html templating
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
    .then(token => createCharge(token, req.body.amount * 100))

    // Render result
    .then(charge => res.status(201).json({ charge }))
    .catch(error => res.status(422).json({ error }))
)

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
