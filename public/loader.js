'use strict';

var form = document.querySelector('form');
var button = document.querySelector("input[type='submit']");
var loader = document.querySelector('.loader');

form.addEventListener('submit', function () {
  loader.style.display = 'block';
  button.value = '';
});