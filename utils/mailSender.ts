import axios from 'axios'
import { contactFormMessage } from '../types'

export const sendContactMsg = async (data: contactFormMessage) => {
  const url = `${process.env.NEXT_PUBLIC_EMAIL_BACKEND}`
  try {
    return await axios.post(url, data)
  } catch (error) {
    console.log(error)
  }
}
