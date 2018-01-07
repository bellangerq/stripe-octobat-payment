const amountInput = document.querySelector('input[name=amount]')
let amount = parseInt(amountInput.value)
const total = document.querySelector('.total')
const taxRate = document.querySelector('.tax-rate').innerHTML / 100
const subTotal = document.querySelector('.sub-total')
const taxAmount = document.querySelector('.tax-amount')

subTotal.innerHTML = amount.toFixed(2)
taxAmount.innerHTML = (amount * taxRate).toFixed(2)
total.innerHTML = (amount + amount * taxRate).toFixed(2)

amountInput.addEventListener('keyup', () => {
  amount = parseInt(amountInput.value)
  subTotal.innerHTML = amount.toFixed(2)
  taxAmount.innerHTML = (amount * taxRate).toFixed(2)
  total.innerHTML = (amount + amount * taxRate).toFixed(2)
})
