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

  loadSVG('notebook');
  loadSVG('smartphone')
  loadSVG('smartphone-2')
  loadSVG('floating-windows')
  loadSVG('processor')
})
