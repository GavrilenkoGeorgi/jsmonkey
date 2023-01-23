import { FC } from 'react'
import { format } from 'date-fns'
import { BlogProps } from '../../types'

import PostCard from './PostCard'
import styles from './ListOfPosts.module.sass'

const ListOfPosts: FC<BlogProps> = ({ posts }) => {

  const listOfPosts = posts.map(post =>
    <PostCard
      key={post.slug}
      date={format(new Date(post.date), 'MMMM do yyyy')}
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
