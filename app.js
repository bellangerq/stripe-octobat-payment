// Express
const express = require('express')
const app = express()
app.listen(process.env.PORT || 3000)
require('dotenv').config()

// Stripe
const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')(keySecret)

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

    .then(token => createCharge(
      token,
      req.body.amount * 100,
      req.body.country
    ))

    .then(charge => res.render(
      "success", { charge: charge }
    ))

    .catch(error => res.render(
      "error", { error: error }
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

const createCharge = (token, amount, country) =>
  stripe.charges.create({
    amount: amount,
    currency: 'eur',
    source: token.id,
    metadata: {
      address_country: country
    }
  })
