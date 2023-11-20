'use client'
import { FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('src/components/layout/Layout'), { ssr: false })
const NotFound = () => {
  return (
    <Layout>
      <section className='error_page'>
        <div className='container'>
          <div className='image_error'>
            <img src='' alt='404' />
          </div>
          <div className='title_error'>
            <h1>{'Oops, looks like the page is lost'}</h1>
          </div>
          <div className='title_para'>
            <p>{'This is not a fault, just an accident that was not intentional'}</p>
          </div>
          <div className='error_button'>
            <Link href='/' className='btn btn-primary'>
              <i>
                <FaArrowLeft />
              </i>{' '}
              {'Back'}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default NotFound
