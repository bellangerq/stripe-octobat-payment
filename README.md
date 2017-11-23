# Technical test

Node JS technical test with Strip & Octobar APIs.

## Install

Clone this project

```
git clone git@github.com:bellangerq/technical-test.git
```

Install Node dependencies:

```
npm install
```

Launch local server and visit `localhost:3000`:

```
node app.js
```

## Roadmap
1. **STRIPE**
  - [ ] Create Stripe source (with fake credit card)
  - [ ] Create Stripe charge
  - [ ] Associate source to charge
  - [ ] Retrieve inputs values to create credit card (validates format & presence)
  - [ ] Handle errors
  - [ ] Show Stripe charge token if success (`.then`)
  - [ ] Show status if error (`.catch`)
2. **OCTOBAT**
  - [ ] Create compute function (takes one parameter == integer)
  - [ ] Call function before Stripe charge creation
  - [ ] To be completed...

3. **FRONT**
  - [ ] Style form (inputs, errors...)
