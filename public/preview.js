'use strict';

// Compute amounts
var amountInput = document.querySelector('input[name=amount]');
var amount = parseInt(amountInput.value);
var total = document.querySelector('.total');
var taxRate = document.querySelector('.tax-rate').innerHTML / 100;
var subTotal = document.querySelector('.sub-total');
var taxAmount = document.querySelector('.tax-amount');

subTotal.innerHTML = amount.toFixed(2);
taxAmount.innerHTML = (amount * taxRate).toFixed(2);
total.innerHTML = (amount + amount * taxRate).toFixed(2);

amountInput.addEventListener('keyup', function () {
  amount = parseInt(amountInput.value);
  subTotal.innerHTML = amount.toFixed(2);
  taxAmount.innerHTML = (amount * taxRate).toFixed(2);
  total.innerHTML = (amount + amount * taxRate).toFixed(2);
});

// Update tax rate depending on country
var select = document.querySelector('select');

select.addEventListener('change', function (e) {
  var country = select.value;
  console.log(country);
});