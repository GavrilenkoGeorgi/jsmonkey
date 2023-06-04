import axios from 'axios'
import { reCaptchaScore } from '../types'

export const validateToken = async (token: string) => {

  const url = `${process.env.NEXT_PUBLIC_CAPTCHA_BACKEND}`
  const data = {
    token
  }

  try {
    const score = await axios.post(url, data)
    const result: reCaptchaScore = score.data
    return result
  } catch (error: any) {
    return error
  }
}
