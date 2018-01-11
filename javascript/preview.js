// Compute amounts
const amountInput = document.querySelector('input[name=amount]')
let amount = parseInt(amountInput.value)
const total = document.querySelector('.total')
const taxRateContainer = document.querySelector('.tax-rate')
let taxRate = taxRateContainer.innerHTML
const subTotal = document.querySelector('.sub-total')
const taxAmount = document.querySelector('.tax-amount')

subTotal.innerHTML = amount.toFixed(2)
taxAmount.innerHTML = (amount * (taxRate / 100)).toFixed(2)
total.innerHTML = (amount + amount * (taxRate / 100)).toFixed(2)

amountInput.addEventListener('keyup', () => {
  amount = parseInt(amountInput.value)
  subTotal.innerHTML = amount.toFixed(2)
  taxAmount.innerHTML = (amount * (taxRate / 100)).toFixed(2)
  total.innerHTML = (amount + amount * (taxRate / 100)).toFixed(2)
})

// Update tax rate on country change
const select = document.querySelector('select')

select.addEventListener('change', (e) => {
  select.disabled = true

  fetch('http://localhost:3000/compute_vat', {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount: amount, country: select.value })
  })
  .then(response => {
    return response.json()
  })
  .then(vat => {
    select.disabled = false

    // Compute amounts
    taxRate = vat.applied_rate
    taxRateContainer.innerHTML = taxRate
    taxAmount.innerHTML = (amount * (taxRate / 100)).toFixed(2)
    total.innerHTML = (amount + amount * (taxRate / 100)).toFixed(2)

    // Update tax_evidence id
    const tev = document.querySelector("input[name='tev_id']")
    tev.value = vat.id
  })
  .catch(error => {
    console.log(error)
    select.disabled = false
  })
})
