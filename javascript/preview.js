// Compute amounts
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

// Update tax rate depending on country
const select = document.querySelector('select')

select.addEventListener('change', (e) => {
  let country = select.value
  console.log(country)

  select.disabled = true

  // Call API
  const XHR = XMLHttpRequest()
  XHR.url = 'http://localhost:3000/computeVAT'
  XHR.method = 'POST'
  XHR.success = vat => {
    document.getElementById('VAT').innerHTML = vat
    select.disabled = false
  }
  XHR.failure = error => {
    alert(error)
    select.disabled = false
  }
})
