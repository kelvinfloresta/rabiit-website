window.addEventListener('load', () => {
  async function loadSVG (svgName) {
    const svgContainer = document.querySelector('.' + svgName)
    if (!svgContainer) {
      return
    }
    const { data } = await window.axios.get(`/assets/img/${svgName}.svg`)
    svgContainer.innerHTML = data
    svgContainer.classList.add('active')
  }

  const width = window.innerWidth > 0 ? window.innerWidth : screen.width
  if (width <= 1024) return

  loadSVG('notebook')
  loadSVG('smartphone')
  loadSVG('smartphone-2')
  loadSVG('floating-windows')
  loadSVG('processor')
})
