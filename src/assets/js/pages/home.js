window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.Home-products .cards-row .card')
  cards.forEach(card => card.addEventListener('click', selectProduct(card)))
  const checkboxes = document.querySelectorAll('.contact-form input[type="checkbox"]')
  checkboxes.forEach(checkbox => checkbox.addEventListener('click', selectCard(checkbox)))

  function selectProduct (card) {
    return () => {
      const { name } = card.dataset
      const checkbox = document.querySelector(`.form #${name}`)
      checkbox.checked = !checkbox.checked
      card.classList.toggle('active')
    }
  }

  function selectCard (checkbox) {
    return () => {
      const card = document.querySelector(`.Home-products .cards-row .card[data-name=${checkbox.id}]`)
      card.classList.toggle('active')
    }
  }
})
