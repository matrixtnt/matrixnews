"use client"
import { FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'

const NotFound = () => {
  return (
      <div className='error_page morphisam'>
        <div className='image_error'>
          <img src='' alt='404' />
        </div>
        <div className='title_error'>
          <h1>{('Oops, looks like the page is lost')}</h1>
        </div>
        <div className='title_para'>
          <p>{('This is not a fault, just an accident that was not intentional')}</p>
        </div>
        <div className='error_button'>
          <Link href='/' className='btn btn-primary'>
            <i>
              <FaArrowLeft />
            </i>{' '}
            {('Back')}
          </Link>
        </div>
      </div>
  )
}

export default NotFound
