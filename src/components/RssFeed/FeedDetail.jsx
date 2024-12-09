import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { getRssFeedApi } from 'src/hooks/rssFeedApi';
import FeedCard from '../view/RssFeedCard';
import { useRouter } from 'next/router';
import Card from 'src/components/skeletons/Card'
import { NoDataFound } from '../../utils/index'

const FeedDetail = () => {
    const router = useRouter();
    const [feedData, setFeedData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        fetchRssDetail()
    }, [])

    const fetchRssDetail = async () => {
        setIsLoading(true);
        try {
            const feedId = router.query.feedid;
            const { data } = await getRssFeedApi.getRssFeedDetail({ feed_id: feedId });
            setFeedData(data?.data?.channel?.item)
            setIsLoading(false);
        } catch (error) {
            console.log("Error", error)
            setIsLoading(false);
        }
    }

    return (
        <Layout>
            <div className='container my-4'>
                {isLoading ? (
                    <div className='row'>
                        {[...Array(4)].map((_, index) => (
                            <div className='col-lg-3 col-sm-6 col-md-4 col-12' key={index}>
                                <Card isLoading={true} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='row commonRowGap '>
                        {feedData ? feedData.map((item, index) => (
                            <div className='col-lg-3 col-sm-6 col-md-4 col-12 ' key={index}>
                                <FeedCard element={item} />
                            </div>
                        )) : (
                            <>
                                {NoDataFound()}

                            </>
                        )}
                    </div>
                )}
            </div>

        </Layout>
    )
};

export default FeedDetail;

