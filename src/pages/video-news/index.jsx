import dynamic from 'next/dynamic'
import React from 'react'
import Meta from 'src/components/seo/Meta';
import { translate } from 'src/utils';
const VideoNews = dynamic(() => import('src/components/videoNews/VideoNews'), { ssr: false })

const Index = () => {

    const webName = process.env.NEXT_PUBLIC_WEB_NAME;

    return (
        <div>
            <Meta title={`${webName} | ${translate('videoNews')}`} description='' keywords='' ogImage='' pathName='' schema='' />
            <VideoNews />
        </div>
    )
}

export default Index