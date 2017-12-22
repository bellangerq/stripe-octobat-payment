const amount = document.querySelector('input[name=amount]')
const total = document.querySelector('.total')

total.innerHTML = amount.value

amount.addEventListener('keyup', () => {
  total.innerHTML = amount.value
})
