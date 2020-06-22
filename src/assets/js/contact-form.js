window.addEventListener('load', function() {
  window.emailjs.init(null)
  var serviceId = 'gmail'
  var templateName = 'contact-form'
  var forms = document.querySelectorAll('.contact-form')

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault()
      window.emailjs.sendForm(serviceId, templateName, this)
    })
  })
}
