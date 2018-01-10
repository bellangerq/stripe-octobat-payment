'use strict';

// Compute amounts
var total = document.querySelector('.total');
var taxRate = document.querySelector('.tax-rate').innerHTML / 100;
var subTotal = document.querySelector('.sub-total');
var taxAmount = document.querySelector('.tax-amount');

subTotal.innerHTML = parseInt(subTotal.innerHTML).toFixed(2);
taxAmount.innerHTML = (parseInt(subTotal.innerHTML) * taxRate).toFixed(2);
total.innerHTML = (parseInt(subTotal.innerHTML) + parseInt(subTotal.innerHTML) * taxRate).toFixed(2);