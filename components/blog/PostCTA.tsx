import { FC } from 'react'

type postCTAProps = {
  id: string,
  date: string,
  title: string,
  body: string
}

const PostCTA: FC<postCTAProps> = (props) => {

  const { id, date, title, body } = props

  return <>
    <h2>{title}</h2>
    <p>{body}</p>
    <div>{date}</div>
  </>
}

export default PostCTA
