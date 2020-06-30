window.addEventListener('load', () => {
  function loadSVG (svgName) {
    const svgContainer = document.querySelector('.' + svgName)
    if (!svgContainer) {
      return
    }

    return window.axios.get(`/assets/img/${svgName}.svg`).then(response => {
      svgContainer.innerHTML = response.data
      return svgContainer
    })
  }

  loadSVG('processor')
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width
  if (width <= 1024) return

  Promise.all([
    loadSVG('notebook'),
    loadSVG('smartphone'),
    loadSVG('smartphone-2'),
    loadSVG('floating-windows')
  ])
    .then(list => {
      const [notebook, smartphone, smartphone2, windows] = list
      activeDelay(notebook, 500)
      activeDelay(windows, 1000)
      activeDelay(smartphone, 1000)
      activeDelay(smartphone2, 1500)
    })

  function activeDelay (el, delay) {
    setTimeout(() => {
      el.classList.add('active')
    }, delay)
  }
})
