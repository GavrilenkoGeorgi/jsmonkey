import axios from 'axios'
import { contactFormMessage } from '../types'

export const sendContactMsg = async (data: contactFormMessage) => {
  const url = `${process.env.NEXT_PUBLIC_EMAIL_BACKEND}`
  try {
    const mailerResponse = await axios.post(url, data)
    return mailerResponse
  } catch (error: any) {
    console.log(error)
    return error
  }
}
