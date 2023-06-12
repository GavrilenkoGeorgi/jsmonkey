import { FC, useCallback, useState } from 'react'
import { useReCaptcha } from 'next-recaptcha-v3'

import { sendContactMsg } from '../../utils/mailSender'
import { validateToken } from '../../utils/reCaptcha'
import { isError } from '../../utils'
import { contactFormMessage, toastTypes } from '../../types'

import Button from '../layout/Button'
import styles from './ContactForm.module.sass'
import globalStyles from '../../styles/Main.module.scss'

import { useToastMsgContext } from '../../context/toastMsgStore'

const ContactForm:FC = () => {

  const { setToastMsg } = useToastMsgContext()

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
    const tokenScore = await validateToken(token)

    // submit and show errors
    if (isError(tokenScore)) { // i guess we can move this somewhere
      setToastMsg({
        message: tokenScore.message,
        type: toastTypes.error
      })
    } else if (tokenScore.score < 0.5) {
      setToastMsg({
        message: `reCaptcha score is too low ${tokenScore.score}`,
        type: toastTypes.error
      })
    } else { // all ok
      const msg: contactFormMessage = {
        email: String(formProps.email),
        message: String(formProps.message)
      }
      const submit = await sendContactMsg(msg)
      if (isError(submit)) { // can't send email
        setToastMsg({
          message: submit.message,
          type: toastTypes.error
        })
      }
      form.reset()
      setToastMsg({
        message: 'Nice! )',
        type: toastTypes.success
      })
    }
    setSubmitting(false)

  }, [executeRecaptcha, setToastMsg])

  return <div className={globalStyles.containerMd}>
    <h2 className={styles.title}>Get in Touch</h2>
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
        placeholder='Your email*'
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
        placeholder='Message*'
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
