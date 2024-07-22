import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Your component function or class

const StyleSixSkeleton = () => {
    return (
        <div>
            <div className='container my-5'>
                <div id='style-six-body-section'>
                    <div className='row loading_data'>
                        {[...Array(4)].map((_, index) => (
                            <div className="col-12 col-lg-3 col-md-6" key={index}>
                                <div className='textSkeleton styleSix_textSkeleton'>
                                    <Skeleton height={300} width={'100%'} />
                                    <div className='innerDiv'>
                                        <Skeleton height={25} width={80} className='categoryBadge' />

                                        <div>
                                            <Skeleton height={10} width={60} className='categoryBadge' />
                                            <Skeleton height={30} width={'100%'} className='title' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StyleSixSkeleton
