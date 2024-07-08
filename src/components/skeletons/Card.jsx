import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Card = ({ catNav }) => {
  return (
    <div className='is-loading mb-4 border-0 px-2'>
      <div className='image'>
        <Skeleton height={catNav ? 105 : 200} />
      </div>
      <div className='content'>
        <h2>
          <Skeleton height={20} count={1} />
        </h2>
        <p>
          <Skeleton height={15}  />
        </p>
      </div>
    </div>

    // <div className='textSkeleton'>
    //   <Skeleton height={300} width={'100%'} />
    //   <div className='innerDiv'>
    //     <Skeleton height={30} width={60} className='categoryBadge' />
    //     <Skeleton height={30} width={'100%'} className='title' />
    //   </div>
    // </div>

  )
}

export default Card
