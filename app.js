// Express
const express = require('express')
const app = express()
app.listen(process.env.PORT || 3000)
require('dotenv').config()

// Stripe
const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY
const keySecret = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(keySecret)

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Axios
const axios = require('axios')

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
app.get('/', (req, res) => {
  const price = 250
  const country = 'AU'

  computeVAT(price, country)
    .then(tax_rate => {
      res.render('index', { tax_rate })
    })
})

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

const computeVAT = (price, country) => {
  return axios({
    method: 'post',
    url: 'https://apiv2.octobat.com/tax_evidence_requests',
    auth: {
      username: process.env.OCTOBAT_SECRET_KEY
    },
    data: {
      price: price,
      payment_source_country: country,
      ip_address: '8.8.8.8'
    }
  })
  .then(response => {
    return response.data.applied_rate
  })
  .catch(error => {
    console.log(error.response.data.errors)
  })
}

/*
  // Calcul VAT for index page
  app.get('/', (req, res) => {
    const initialPrice = 250
    const country = 'AU'
    return computeVAT(initialPrice, country).then(vat => res.render('index'))
  })

  // Calcul VAT on select change
  app.post('/calcul_vat', (req, res) => {
    return computeVAT(req.params.price, req.params.country).then(vat => {
      res.render({ vat: '0.22' })
    })
  })
*/
