import Head from 'next/head'

const Meta = ({ title, description, keywords, ogImage, pathName,schema }) => {
    return (
        <Head>
            <title>{title}</title>
            {/*<meta name="description" content={description} />*/}

            {/*<!-- Google / Search Engine Tags -->*/}
            <meta name="name" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="image" content={ogImage} />
            <meta property="og:type" content="website" />

            {/*<!-- Facebook Meta Tags -->*/}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="1080" />
            <meta property="og:image:height" content="608" />
            <meta property="og:url" content={pathName} />
            <meta property="og:type" content="website" />

            {/*<!-- Twitter Meta Tags -->*/}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel='canonical' href={`${process.env.NEXT_PUBLIC_WEB_URL}`} />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <meta name='robots' content='index, follow,max-snippet:-1,max-video-preview:-1,max-image-preview:large' />
            <script
          key='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        </Head>
    )
}

export default Meta
