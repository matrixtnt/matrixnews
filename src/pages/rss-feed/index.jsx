import Head from 'next/head'
import React from 'react'
import dynamic from 'next/dynamic'
const RssFeeds = dynamic(() => import('src/components/RssFeed/RssFeeds'), { ssr: false })


const Index = () => {
    return (
        <>
            <Head>
                <title>Rss-Feeds</title>
            </Head>
            <RssFeeds />
        </>
    )
}

export default Index
