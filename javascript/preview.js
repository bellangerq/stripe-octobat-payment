const amountInput = document.querySelector('input[name=amount]')
let amount = amountInput.value
const total = document.querySelector('.total')
const taxRate = document.querySelector('.tax-rate').innerHTML / 100
const exclTax = document.querySelector('.excl-tax')
const taxAmount = document.querySelector('.tax-amount')

total.innerHTML = parseInt(amount).toFixed(2)
exclTax.innerHTML = (amount - amount * taxRate).toFixed(2)
taxAmount.innerHTML = (amount * taxRate).toFixed(2)

amountInput.addEventListener('blur', () => {
  amount = amountInput.value
  total.innerHTML = parseInt(amount).toFixed(2)
  exclTax.innerHTML = (amount - amount * taxRate).toFixed(2)
  taxAmount.innerHTML = (amount * taxRate).toFixed(2)
})
