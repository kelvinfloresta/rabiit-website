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
    configurePhoneInput()

    return e => {
      e.preventDefault()
      setLoading(true)
      const data = { notes: [] }
      for (const el of form.elements) {
        if (!el.name) continue
        if (el.type === 'checkbox' && el.checked) {
          data.notes.push(el.name)
          continue
        }
        data[el.name] = el.value
      }
      data.notes = data.notes.join(', ')

      window.emailjs
        .send(serviceId, templateName, data)
        .then(onSuccess)
        .catch(onError)
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
      window.Sentry.captureException(exception)
      form.classList.add('hidden')
      errorContainer.classList.add('active')
    }

    function inputHandler (masks, max, event) {
      const c = event.target
      const v = c.value.replace(/\D/g, '')
      const m = c.value.length > max ? 1 : 0
      window.VMasker(c).unMask()
      window.VMasker(c).maskPattern(masks[m])
      c.value = window.VMasker.toPattern(v, masks[m])
    }

    function configurePhoneInput () {
      const telMask = ['(99) 9999-99999', '(99) 9 9999-9999']
      const tel = form.querySelector('#phone')
      window.VMasker(tel).maskPattern(telMask[0])
      tel.addEventListener(
        'input',
        inputHandler.bind(undefined, telMask, 14),
        false
      )
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
