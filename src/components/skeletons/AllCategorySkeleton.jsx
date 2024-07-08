import React from 'react'
import Skeleton from 'react-loading-skeleton'

const AllCategorySkeleton = () => {
    return (
        <div className='mt-3'>
            <div className='textSkeleton allCatSkeleton'>
                <Skeleton height={100} width={'100%'} />
                <div className='innerDiv'>
                    <Skeleton height={30} width={60} className='categoryBadge' />
                    <Skeleton height={30} width={40} className='title' />
                </div>
            </div>
        </div>
    )
}

export default AllCategorySkeleton
