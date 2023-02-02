import { FC } from 'react'
import { format } from 'date-fns'
import { blogProps } from '../../types'

import PostCard from './PostCard'
import styles from './ListOfPosts.module.sass'

const ListOfPosts: FC<blogProps> = ({ posts }) => {

  const listOfPosts = posts.map(post =>
    <PostCard
      key={post.slug}
      slug={post.slug}
      date={format(new Date(post.date), 'MMMM do yyyy')}
      title={post.title}
      body={post.body}
      image={post.image}
      author={post.author}
    />
  )

  return <section className={styles.postsListSection}>
    <div className={styles.listContainer}>
      {listOfPosts}
    </div>
  </section>
}

export default ListOfPosts
