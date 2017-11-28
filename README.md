# Technical test

Node JS technical test with Stripe & Octobat APIs.

## Install

Clone this project

```
git clone git@github.com:bellangerq/technical-test.git
```

Install Node dependencies:

```
npm install
```

Create a `.env` file and store your Stripe keys (with [dotenv](https://github.com/motdotla/dotenv)):

```
PUBLISHABLE_KEY=pk_test_******
SECRET_KEY=sk_test_******

```
Launch local server and visit `localhost:3000`:

```
node app.js
```

## Roadmap

1. **STRIPE**
  - [x] Create Stripe token
  - [x] Create Stripe charge
  - [ ] Associate token to charge
  - [ ] Show Stripe charge token if success (`.then`)
  - [ ] Show status if error (`.catch`)
  - [ ] Create form view
  - [ ] Pass query parameters to Stripe token
2. **OCTOBAT**
3. **FRONT**
