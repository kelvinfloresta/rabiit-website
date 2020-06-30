window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.Home-products .cards-row .card')
  cards.forEach(card => card.addEventListener('click', selectProduct(card)))

  function selectProduct (card) {
    return () => {
      const { name } = card.dataset
      const checkbox = document.querySelector(`.form #${name}`)
      checkbox.checked = !checkbox.checked
      card.classList.toggle('active')
    }
  }
})
