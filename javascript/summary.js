// Compute amounts
const total = document.querySelector('.total')
const taxRate = document.querySelector('.tax-rate').innerHTML / 100
const subTotal = document.querySelector('.sub-total')
const taxAmount = document.querySelector('.tax-amount')

subTotal.innerHTML = (parseInt(subTotal.innerHTML)).toFixed(2)
taxAmount.innerHTML = (parseInt(subTotal.innerHTML) * taxRate).toFixed(2)
total.innerHTML = (parseInt(subTotal.innerHTML) + (parseInt(subTotal.innerHTML) * taxRate)).toFixed(2)
