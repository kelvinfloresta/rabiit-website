window.addEventListener('load', () => {
  const menu = document.querySelector('.menu')
  const links = document.querySelector('.links')
  if (!menu || !links) {
    return
  }

  menu.addEventListener('click', () => {
    menu.classList.toggle('active')
    links.classList.toggle('active')
    document.body.classList.toggle('no-overflow')
  })
})
