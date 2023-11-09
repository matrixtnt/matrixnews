'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getnewsbycategoryApi } from '../../store/actions/campaign'
import { translate, truncateText } from '../../utils'
import Skeleton from 'react-loading-skeleton'

const RelatedNewsSection = props => {
  const [Data, setData] = useState([])
  const catid = props.Cid
  const [loading, setLoading] = useState(true)

  const storedLatitude = localStorage.getItem('latitude')
  const storedLongitude = localStorage.getItem('longitude')
  useEffect(() => {
    getnewsbycategoryApi(
      catid,
      '',
      '0',
      '10',
      storedLatitude && storedLatitude ? storedLatitude : null,
      storedLongitude && storedLongitude ? storedLongitude : null,
      response => {
        // Filter out elements with the same id as props.Cid
        const filteredData = response.data.filter(element => element.id !== props.Nid)
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
    // eslint-disable-next-line
  }, [catid, props.Nid])

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
        <div id='RNews-main'>
          <div id='RNews-cat-nav' className='navbar'>
            <h4 id='nav-logo' className='mb-0'>
              <b>{translate('related-news')}</b>
            </h4>
          </div>
          {Data &&
            Data.map(element => (
              <Link id='Link-all' href={`/news/${element.id}`} key={element.id}>
                <div id='RNews-card' className='card' onClick={() => scrollToTop()}>
                  <img id='RNews-image' src={element.image} className='card-img-top' alt='...' />
                  <div id='RNews-card-body' className='RNews-card-body'>
                    <button id='btnRNewsCatagory' className='btn btn-sm' type='button'>
                      {element.category_name}
                    </button>
                    <h6 id='RNews-card-text' className='card-text'>
                      {truncateText(element.title, 100)}
                    </h6>
                  </div>
                  {}
                </div>
              </Link>
            ))}
        </div>
      ) : null}
    </div>
  )
}

export default RelatedNewsSection
