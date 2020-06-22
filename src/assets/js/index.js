window.addEventListener('load', () => {
  const menu = document.querySelector('.menu')
  if (menu) {
    menu.addEventListener('click', () => menu.classList.toggle('active'))
  }
})
