import React from 'react'
import Skeleton from 'react-loading-skeleton';

const StyleFiveSkeleton = () => {

    return (
        <div>
            <div id='bns-main' className='news_style_five'>
                <div className='container custom-card'>
                    <div className='row'>
                        <div className='col-md-4 col-12'>
                            <div className=''>
                                <div className='textSkeleton styleFive_textSkeleton'>
                                    <Skeleton height={300} width={'100%'} />
                                    <div className='innerDiv'>
                                        <Skeleton height={30} width={110} className='title' />
                                        <Skeleton height={35} width={120} className='categoryBadge' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8 col-12'>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-12">
                                    <div id='bns-rest-cards'>
                                        <div className='textSkeleton'>
                                            <Skeleton height={300} width={'100%'} />
                                            <div className='innerDiv'>
                                                <Skeleton height={30} width={'100%'} className='title' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-12 col-md-4 d-none d-sm-none d-md-block">
                                    <div id='bns-rest-cards'>
                                    <div className='textSkeleton'>
                                            <Skeleton height={300} width={'100%'} />
                                            <div className='innerDiv'>
                                                <Skeleton height={30} width={'100%'} className='title' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-12 col-md-4 d-none d-sm-none d-md-block d-lg-block">
                                    <div id='bns-rest-cards'>
                                    <div className='textSkeleton'>
                                            <Skeleton height={300} width={'100%'} />
                                            <div className='innerDiv'>
                                                <Skeleton height={30} width={'100%'} className='title' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-12 d-none d-md-none d-sm-none d-lg-block">
                                    <div id='bns-rest-cards'>
                                    <div className='textSkeleton'>
                                            <Skeleton height={300} width={'100%'} />
                                            <div className='innerDiv'>
                                                <Skeleton height={30} width={'100%'} className='title' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StyleFiveSkeleton
