import React from 'react'
import Skeleton from 'react-loading-skeleton';
import CommonViewMoreDiv from '../features-Style/CommonViewMoreDiv';
import AdSpaceSkeleton from './AdSpaceSkeleton';
import CommonViewMoreSkeleton from './CommonViewMoreSkeleton';


const StyleFourSkeleton = () => {
    return (
        // Show skeleton loading when there are no news items
        <div id='rns-main' className='news_style_four mt-5'>
            <div className='container'>
            <AdSpaceSkeleton/>
                <div className='row'>
                    <div id='rns-cards-main' className=''>
                        <div className='row mb-5'>
                            <CommonViewMoreSkeleton/>
                            {[...Array(6)].map((_, index) => (
                                <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-6 col-12' key={index}>
                                    <div className='textSkeleton'>
                                        <Skeleton height={300} width={'100%'} />
                                        <div className='innerDiv'>
                                            <Skeleton height={30} width={'100%'} className='title' />
                                            <Skeleton height={40} width={100} className='categoryBadge' />
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StyleFourSkeleton
