import { FC } from 'react'
// import { formatRelative, subDays } from 'date-fns'
import { BlogProps } from '../../types'

import PostCard from './PostCard'
import styles from './ListOfPosts.module.sass'

const ListOfPosts: FC<BlogProps> = ({ posts }) => {

  console.log(posts)

  const listOfPosts = posts.map(post =>
    <PostCard
      key={post.slug}
      date={post.date}
      title={post.title}
      body={post.body}
      image={post.image}
      author={post.author}
    />
  )

  return <div className={styles.listContainer}>
    {listOfPosts}
  </div>
}

export default ListOfPosts
