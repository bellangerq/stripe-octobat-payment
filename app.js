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
  const initialPrice = 250
  const initialCountry = 'AU'

  computeVAT(initialPrice, initialCountry)
  .then(data => {
    res.render('index', {
      title: 'Payment 💳',
      tax_rate: data.applied_rate,
      tev_id: data.id
    })
  })
})

app.post('/compute_vat', (req, res) => {
  computeVAT(req.body.amount, req.body.country)
  .then(data => {
    res.json(data)
    return data
  })
})

app.post('/charge', (req, res) => {
  generateToken({
    number: req.body.number,
    expMonth: req.body.expMonth,
    expYear: req.body.expYear,
    cvc: req.body.cvc
  })

  .then(token => createCharge(
    token,
    req.body.amount * 100,
    req.body.country,
    req.body.tev_id
  ))

  .then(charge => {
    getTaxEvidence(charge.metadata.tax_evidence)
    .then(tev => {
      tev.customer_evidence.payment_source.country = req.body.country
      tev.customer_localization.country = req.body.country
      console.log(tev)
      res.render('success', {
        title: 'Success 🎉',
        charge: charge,
        tev
      })
    })
  })

  .catch(error => res.render(
    "error", {
      title: 'Error 🚫',
      error: error
    }
  ))
})

// Generate Stripe token == credit card
const generateToken = ({ number, expMonth, expYear, cvc }) =>
  stripe.tokens.create({
    card: {
      number,
      exp_month: expMonth,
      exp_year: expYear,
      cvc
    }
  })

// Generate Stripe charge with octobat metadata
const createCharge = (token, amount, country, tev_id) =>
  stripe.charges.create({
    amount: amount,
    currency: 'eur',
    source: token.id,
    metadata: {
      address_country: country,
      tax_evidence: tev_id
    }
  })

// Compute Octobat VAT rate depending on country
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
    return response.data
  })
  .catch(error => {
    console.log(error.response.data.errors)
  })
}

// Get last Octobat tax_evidence on success
const getTaxEvidence = id => {
  return axios({
    method: 'get',
    url: `https://apiv2.octobat.com/tax_evidences/${id}`,
    auth: {
      username: process.env.OCTOBAT_SECRET_KEY
    }
  })
  .then(response => {
    return response.data
  })
  .catch(error => {
    console.log(error)
  })
}
