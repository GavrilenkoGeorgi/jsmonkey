import { FC } from 'react'

import styles from './ContactForm.module.sass'
import globalStyles from '../../styles/Main.module.scss'

const ContactForm:FC = () => {

  return <div className={globalStyles.containerMd}>
    <h2 className={styles.title}>Send me a message</h2>
    <form
      action="/send-data-here"
      method="post"
      className={styles.form}
    >
      <label htmlFor="name">Your name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder='Your name'
        required
        minLength={2}
        maxLength={33}
      />
      <p className={styles.errorMsg}>This one is requred</p>
      <label htmlFor="last">Message</label>
      <textarea
        rows={5}
        id="message"
        name="message"
        placeholder='Message'
        required
        minLength={10}
        maxLength={350}
      />
      <p className={styles.errorMsg}>You forgot your message</p>
      <button type="submit">Submit</button>
    </form>
  </div>
}

export default ContactForm
