import axios from 'axios'

export const validateToken = (token: string) => {
  console.log('Token: ', token)

  console.log('Secret ', process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY)

  const url= 'https://www.google.com/recaptcha/api/siteverify'

  const data = {
    secret: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY,
    response: token
  }

  axios.post(url, data)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}
