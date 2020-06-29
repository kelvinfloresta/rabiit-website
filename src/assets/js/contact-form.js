window.addEventListener('load', () => {
  window.emailjs.init('user_R0NEWeYzCUgpRUWj41SUv')
  const serviceId = 'gmail'
  const templateName = 'contact-form'
  const forms = document.querySelectorAll('.contact-form')

  forms.forEach(form => {
    form.addEventListener('submit', onSubmit(form))
  })

  function onSubmit (form) {
    const errorContainer = form.querySelector('.error')
    bindErrorEvents(form)
    const successContainer = form.querySelector('.success')
    const submitBtn = form.querySelector('.btn')

    return async e => {
      e.preventDefault()
      setLoading(true)
      try {
        await window.emailjs.sendForm(serviceId, templateName, form)
        onSuccess()
      } catch (e) {
        onError(e)
      }
    }

    function onSuccess () {
      setLoading(false)
      setError(null)
      successContainer.classList.add('active')
      form.classList.add('hidden')
    }

    function onError (error) {
      setLoading(false)
      setError(error)
    }

    function setLoading (isLoading) {
      if (isLoading) {
        form.classList.add('loading')
        submitBtn.classList.add('loading')
        return
      }
      submitBtn.classList.remove('loading')
      form.classList.remove('loading')
    }

    function setError (exception) {
      if (!exception) {
        form.classList.remove('hidden')
        errorContainer.classList.remove('active')
        return
      }
      // window.Sentry.captureException(exception);
      form.classList.add('hidden')
      errorContainer.classList.add('active')
    }
  }

  function bindErrorEvents (form) {
    const errorContainer = form.querySelector('.error')
    const backButton = form.querySelector('.error .light-button')

    const cleanForm = () => {
      errorContainer.classList.remove('active')
      form.classList.remove('hidden')
    }

    backButton.addEventListener('click', cleanForm)
    const retryButton = form.querySelector('.btn-primary')
    retryButton.addEventListener('click', () => {
      cleanForm()
      form.querySelector('.btn[type=submit]').click()
    })
  }
})
