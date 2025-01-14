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

  )
}

export default Card
