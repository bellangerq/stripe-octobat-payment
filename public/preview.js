'use strict';

var amount = document.querySelector('input[name=amount]');
var total = document.querySelector('.total');

total.innerHTML = amount.value;

amount.addEventListener('keyup', function () {
  total.innerHTML = amount.value;
});