import React from 'react'
import Skeleton from 'react-loading-skeleton';
import AdSpaceSkeleton from './AdSpaceSkeleton';
import CommonViewMoreSkeleton from './CommonViewMoreSkeleton';

const StyleThreeSkeleton = () => {
    return (
        <div className='mt-5'>

            <div id='vps-main' className='news_style_three'>
                <div className='container'>
                    <AdSpaceSkeleton />
                    <div className='row'>
                        <CommonViewMoreSkeleton/>
                        <div className='col-lg-6 col-12'>
                            <div id='vps-body-left'>
                                <div className='textSkeleton'>
                                    <Skeleton height={600} width={'100%'} />
                                    <div className='innerDiv'>
                                        <Skeleton height={30} width={60} className='categoryBadge' />
                                        <Skeleton height={30} width={'100%'} className='title' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12'>
                            <div id='vps-body-right'>
                                <div className='textSkeleton'>
                                    <Skeleton height={300} width={'100%'} />
                                    <div className='innerDiv'>
                                        <Skeleton height={30} width={60} className='categoryBadge' />
                                        <Skeleton height={30} width={'100%'} className='title' />
                                    </div>
                                </div>
                                <div className='textSkeleton'>
                                    <Skeleton height={300} width={'100%'} />
                                    <div className='innerDiv'>
                                        <Skeleton height={30} width={60} className='categoryBadge' />
                                        <Skeleton height={30} width={'100%'} className='title' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Skeleton count={5} height={300} width={'100%'} /> */}

        </div>
    )
}

export default StyleThreeSkeleton
