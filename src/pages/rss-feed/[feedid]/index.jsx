import dynamic from 'next/dynamic'
import React from 'react'
const FeedDetail = dynamic(() => import('src/components/RssFeed/FeedDetail'), { ssr: false })
import RSSParser from 'rss-parser';


const RssFeedDetail = () => {
    return (
        <div>
            <FeedDetail />
        </div>
    )
}

export default RssFeedDetail

// export async function getServerSideProps() {
//     const parser = new RSSParser();
//     const feed = await parser.parseURL('https://www.cbsnews.com/latest/rss/science');
//     return {
//         props: {
//             items: feed.items,
//         },
//     };
// }