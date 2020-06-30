window.addEventListener('load', () => {
  function loadSVG (svgName) {
    const svgContainer = document.querySelector('.' + svgName)
    if (!svgContainer) {
      return
    }

    window.axios.get(`/assets/img/${svgName}.svg`).then(response => {
      svgContainer.innerHTML = response.data
      svgContainer.classList.add('active')
    })
  }

  loadSVG('processor')
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width
  if (width <= 1024) return

  loadSVG('notebook')
  loadSVG('smartphone')
  loadSVG('smartphone-2')
  loadSVG('floating-windows')
})
