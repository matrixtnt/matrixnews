import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CommonViewMoreSkeleton = () => {
    return (
        <div className='col-12 loading_data my-3 commonViewMoreSkeleton'>
            <Skeleton height={20} count={2} width={150} />
            <Skeleton height={30} width={100} />
        </div>
    )
}

export default CommonViewMoreSkeleton
