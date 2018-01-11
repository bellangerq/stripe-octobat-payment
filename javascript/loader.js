const form = document.querySelector('form')
const button = document.querySelector("input[type='submit']")
const loader = document.querySelector('.loader')

form.addEventListener('submit', () => {
  loader.style.display = 'block'
  button.value = ''
})
