import { FC, useCallback, useState } from 'react'
import { useReCaptcha } from 'next-recaptcha-v3'

import { sendContactMsg } from '../../utils/mailSender'
import { validateToken } from '../../utils/reCaptcha'
import { contactFormMessage } from '../../types'

import Button from '../layout/Button'
import styles from './ContactForm.module.sass'
import globalStyles from '../../styles/Main.module.scss'

const ContactForm:FC = () => {

  const { executeRecaptcha } = useReCaptcha()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = useCallback(async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)

    // Get form data
    const form = event.target
    const formData = new FormData(form)
    const formProps = Object.fromEntries(formData)

    const token = await executeRecaptcha('submit')
    const result = await validateToken(token)

    if (result && result.score < .5) { // minify this
      console.log('Sorry, score is too low.')
    } else {
      const msg: contactFormMessage = {
        email: String(formProps.email),
        message: String(formProps.message)
      }
      sendContactMsg(msg)
      form.reset()
      setSubmitting(false)
    }

  }, [executeRecaptcha])

  return <div className={globalStyles.containerMd}>
    <h2 className={styles.title}>Send me a message</h2>
    <form
      onSubmit={handleSubmit}
      method='post'
      className={styles.form}
    >
      <label htmlFor='email'>Your email</label>
      <input
        type='email'
        id='email'
        name='email'
        placeholder='Your email'
        required
        minLength={2}
        maxLength={33}
      />
      <p className={styles.errorMsg}>This one is requred</p>
      <label htmlFor='last'>Message</label>
      <textarea
        rows={5}
        id='message'
        name='message'
        placeholder='Message'
        required
        minLength={2}
        maxLength={500}
      />
      <p className={styles.errorMsg}>You forgot your message</p>
      <Button
        type='submit'
        label='Submit'
        submitting={submitting}
      />
    </form>
  </div>
}

export default ContactForm
