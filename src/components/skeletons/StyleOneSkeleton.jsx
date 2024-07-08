import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CommonViewMoreSkeleton from './CommonViewMoreSkeleton';
import AdSpaceSkeleton from './AdSpaceSkeleton';

const StyleOneSkeleton = () => {
    return (
        <div className='styleOneSkeleton'>
            <>
                <div className='container'>
                    <AdSpaceSkeleton />
                    <div id='hns-head' className='row mb-3'>
                        <CommonViewMoreSkeleton />
                    </div>
                </div>

                <div id='fs-main' className='h-100 inner_custom_swiper news_style_one'>
                    <div id='body-first-section' className='container'>
                        <div className='row'>
                            <div className='col-xl-7 order-1 order-xl-0 col-12 d-flex'>
                                <div id='Left-first-section' className='my-auto'>
                                    <div className='textSkeleton'>
                                        <Skeleton height={400} width={'100%'} />
                                        <div className='innerDiv'>
                                            <Skeleton height={30} width={80} className='categoryBadge' />
                                            <Skeleton height={25} width={70} className='title' />
                                            <Skeleton height={25} width={70} className='title' />
                                            <Skeleton height={40} width={100} className='title' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-5 order-0 order-xl-1 col-12'>
                                <div id='right-first-section'>
                                    <div className='textSkeleton'>
                                        <Skeleton height={500} width={'100%'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default StyleOneSkeleton
