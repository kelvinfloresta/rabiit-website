window.addEventListener('load', () => {
  const menu = document.querySelector('.menu')
  const links = document.querySelector('.links')
  if (!menu || !links) {
    return
  }

  menu.addEventListener('click', toggleMenu)

  const width = window.innerWidth > 0 ? window.innerWidth : screen.width
  const isTablet = width <= 768
  if (isTablet) {
    links
      .querySelectorAll('a')
      .forEach(el => el.addEventListener('click', toggleMenu))
  }

  function toggleMenu () {
    menu.classList.toggle('active')
    links.classList.toggle('active')
    document.body.classList.toggle('no-overflow')
  }
})
