import axios from 'axios'

export const validateToken = (token: string) => {

  const url = `${process.env.NEXT_PUBLIC_CAPTCHA_BACKEND}`
  const data = {
    token
  }

  axios.post(url, data)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}
