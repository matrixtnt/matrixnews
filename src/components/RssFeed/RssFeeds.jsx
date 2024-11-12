import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { IoLogoRss } from 'react-icons/io5';
import { getRssFeedApi } from 'src/hooks/rssFeedApi';
import { selectCurrentLanguage } from 'src/store/reducers/languageReducer';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { truncateText } from 'src/utils';
import Skeleton from 'react-loading-skeleton';
const RecentNews = dynamic(() => import('./RecentNews'), { ssr: false })

const RssFeeds = () => {

    const currentLanguage = useSelector(selectCurrentLanguage)

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    // api call 
    const getRssFeeds = async () => {
        setLoading(true)
        try {
            const { data } = await getRssFeedApi.getRssFeed({ language_id: currentLanguage.id, })
            console.log('rss', data.data)
            setData(data?.data)
            setLoading(false)
            return data.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (currentLanguage?.id) {
            getRssFeeds()
        }
    }, [currentLanguage])



    return (
        <Layout>
            <section className='rssFeedSect'>
                <div className='row container mainRow'>
                    <div className="col-lg-8">
                        <div className="row rssFeedsRow">
                            {
                                loading ? <div className="col-12 col-sm-6 col-md-4 col-xxl-3">
                                    <div className='loadingBox'> 
                                    <Skeleton height={30} width={30}/>
                                    <Skeleton height={20} width={115}/>
                                    </div>
                                </div> :
                                    data?.map((item) => {
                                        return <div className="col-12 col-sm-6 col-md-4 col-xxl-3">
                                            <Link href={item?.feed_url} title={item?.feed_name} target='_blank' className='rssFeedBox'>
                                                <span><IoLogoRss /></span>
                                                <h2>{truncateText(item?.feed_name, 14)}</h2>
                                            </Link>
                                        </div>
                                    })
                            }
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <RecentNews />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default RssFeeds
