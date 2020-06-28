window.addEventListener('load', function () {
  const container = document.querySelector('.cards-row-container')
  const cardRows = document.querySelector('.cards-row')
  const arrowLeft = document.querySelector('.arrow-left')
  const arrowRight = document.querySelector('.arrow-right')
  const totalOfCards = cardRows.children.length

  const width = window.innerWidth > 0 ? window.innerWidth : screen.width
  const isMobile = width < 1280
  const maxAmountOfCards = isMobile ? 1 : 3
  const { fullCardWidth, margin } = getCardSizes()
  const maxContainerWidth = fullCardWidth * maxAmountOfCards - margin
  container.style['max-width'] = maxContainerWidth + 'px'

  arrowLeft.classList.add('disabled')

  let index = 0
  arrowLeft.addEventListener('click', function () {
    slideToLeft()
    translateCards()
  })

  arrowRight.addEventListener('click', function () {
    slideToRight()
    translateCards()
  })

  function translateCards () {
    cardRows.style.transform = `translateX(-${index * fullCardWidth}px)`
  }

  function slideToLeft () {
    if (index === 0) return
    if (--index === 0) arrowLeft.classList.add('disabled')
    arrowRight.classList.remove('disabled')
  }

  function slideToRight () {
    const limitOfDecrement = totalOfCards - maxAmountOfCards
    if (index === limitOfDecrement) return
    if (++index === limitOfDecrement) arrowRight.classList.add('disabled')
    arrowLeft.classList.remove('disabled')
  }

  function getCardSizes () {
    const card = cardRows.querySelector('.card')
    const cardStyle = getComputedStyle(card)
    const cardWidth = card.offsetWidth
    const cardMarginRight = parseInt(cardStyle.marginRight) || 0
    const fullCardWidth = cardWidth + cardMarginRight
    return { cardWidth, fullCardWidth, margin: cardMarginRight }
  }
})
