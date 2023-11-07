'use client'

import { FiCalendar } from 'react-icons/fi'
import { useState } from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import BreadcrumbNav from '../../breadcrumb/BreadcrumbNav'
import { getnewsbycategoryApi } from '../../../store/actions/campaign'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../../store/reducers/languageReducer'
import Skeleton from 'react-loading-skeleton'
import { translate } from '../../../utils'
import { useRouter } from 'next/router.js'

const CategoryNews = () => {
  const [Data, setData] = useState([])
  const router = useRouter()
  const query = router.query
  const catId = query.slug
  const [loading, setLoading] = useState(true)
  const currentLanguage = useSelector(selectCurrentLanguage)
  const storedLatitude = localStorage.getItem('latitude')
  const storedLongitude = localStorage.getItem('longitude')
  useEffect(() => {
    getnewsbycategoryApi(
      catId,
      '',
      '0',
      '10',
      storedLatitude && storedLatitude ? storedLatitude : null,
      storedLongitude && storedLongitude ? storedLongitude : null,
      response => {
        setData(response.data)
        setLoading(false)
      },
      error => {
        if (error === 'No Data Found') {
          setData('')
          setLoading(false)
        }
      }
    )
    // eslint-disable-next-line
  }, [catId, currentLanguage])

  return (
    <section className='categoryview_Section'>
      <BreadcrumbNav SecondElement={'category' ? 'category' : ''} ThirdElement='0' />
      <div id='cv-main' className='bg-white py-5'>
        <div id='cv-content' className='my-5 container'>
          {loading ? (
            <div>
              <Skeleton height={200} count={3} />
            </div>
          ) : (
            <div className='row'>
              {Data.length > 0 ? (
                Data.map(element => (
                  <div className='col-lg-3 col-md-4 col-12 ' key={element.id}>
                    <Link id='Link-all' href={`/news/${element.id}`}>
                      <div id='cv-card' className='card'>
                        <img id='cv-card-image' src={element.image} className='card-img' alt='...' />
                        <div id='cv-card-body' className='card-body'>
                          <button id='cv-btnCatagory' className='btn btn-sm' type='button'>
                            {element.category_name}
                          </button>
                          <p id='cv-card-title' className='card-title'>
                            {element.title}
                          </p>
                          <p id='cv-card-date'>
                            <FiCalendar size={18} id='cv-logoCalendar' />
                            {element.date}
                          </p>
                          {/* <Link id='btncvRead' className='btn overlay' type="button" href="/news-view" ><IoArrowForwardCircleSharp size={50}/></Link> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className='text-center my-5'>{translate('nodatafound')}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CategoryNews
