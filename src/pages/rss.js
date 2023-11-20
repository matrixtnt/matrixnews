"use client"
import generateRssFeed from "../../scripts/generaterRssFeed.mjs"

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

const rss = () => {
  return <div>rss</div>
}

export default rss
