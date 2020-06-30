window.addEventListener('load', () => {
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width
  const isMobile = width < 1280
  if (isMobile) {
    return
  }
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
