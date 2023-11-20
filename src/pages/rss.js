'use client'
import { useEffect } from 'react'
import generateRssFeed from '../../scripts/generaterRssFeed.mjs'
import { useRouter } from 'next/router'

export const getStaticProps = async () => {
  await generateRssFeed()
  return {
    props: {}
  }
}

// export async function getStaticProps({ params }) {
//   let data = null;
//   try {
//     data = await generateRssFeed(params.slug);
//   } catch (err) { };

//   return {
//     props: {
//       data,
//     },
//   };
// }

const Rss = () => {
  const router = useRouter()
  // client side rendering route get
  useEffect(() => {
    // Check if the slug is present in the URL
    if (process.env.NEXT_PUBLIC_SEO === 'false') {
      if (router.pathname) {
        router.replace(window.location.pathname + window.location.search)
      }
    }
  }, [])
  return <div>rss</div>
}

export default Rss
