'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { getbreakingNewsApi } from '../../store/actions/campaign'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { translate } from '../../utils'
import Skeleton from 'react-loading-skeleton'

const RelatedBreakingNews = props => {
  const [Data, setData] = useState([])
  const currentLanguage = useSelector(selectCurrentLanguage)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getbreakingNewsApi(
      response => {
        const responseData = response.data
        const filteredData = responseData.filter(element => element.id !== props.id)
        setData(filteredData)
        setLoading(false)
      },
      error => {
        if (error === 'No Data Found') {
          setData('')
          setLoading(false)
        }
      }
    )
  }, [currentLanguage, props.id])
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {loading ? (
        <div>
          <Skeleton height={200} count={3} />
        </div>
      ) : Data && Data.length > 0 ? (
        <div id='rbn-main'>
          <div id='rbn-cat-nav' className='navbar'>
            <h4 id='nav-logo' className='mb-0'>
              <b>{translate('related-news')}</b>
            </h4>
          </div>
          {Data &&
            Data.map(element => (
              <div key={element.id}>
                <Link id='Link-all' href={`/breaking-news/${element.id}`} onClick={scrollToTop}>
                  <div id='rbn-card' className='card'>
                    <img id='rbn-image' src={element.image} className='card-img-top' alt='...' />
                    <div id='rbn-card-body' className='rbn-card-body'>
                      <div id='btnrbnCatagory' className='btn btn-sm' type='button'>
                        {translate('breakingnews')}
                      </div>
                      <h6 id='rbn-card-text' className='card-text'>
                        {element.title.slice(0, 40)}...
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  )
}

export default RelatedBreakingNews
