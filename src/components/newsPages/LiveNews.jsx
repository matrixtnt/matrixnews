'use client'
import { useState } from 'react'
import { useEffect } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import VideoPlayerModal from '../videoplayer/VideoPlayerModal'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { getlivestreamApi } from '../../store/actions/campaign'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import Skeleton from 'react-loading-skeleton'
import { translate } from '../../utils'
import no_image from '../../../public/assets/images/no_image.jpeg'

const LiveNews = () => {
  const [Data, setData] = useState([])
  const [Video_url, setVideo_url] = useState()
  const [modalShow, setModalShow] = useState(false)
  const currentLanguage = useSelector(selectCurrentLanguage)
  const [loading, setLoading] = useState(true)
  const [typeUrl, setTypeUrl] = useState(null)

  useEffect(() => {
    getlivestreamApi(
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
  }, [currentLanguage])

  const handleLiveNewsVideoUrl = url => {
    setModalShow(true)
    setVideo_url(url)
  }

  const TypeUrl = type => {
    setTypeUrl(type)
  }

  return (
    <>
      <BreadcrumbNav SecondElement={translate('liveNews')} ThirdElement='0' />

      <div id='LN-main' className='py-5 bg-white'>
        <div id='LN-content' className='container'>
          {loading ? (
            <div>
              <Skeleton height={200} count={3} />
            </div>
          ) : (
            <div className='row live-news'>
              {Data.length > 0 ? (
                Data.map(element => (
                  <div className='col-md-4 col-12' key={element.id}>
                    <div id='LN-card' className='card' onClick={() => {handleLiveNewsVideoUrl(element.url); TypeUrl(element.type)}}>
                      <img
                        id='LN-card-image'
                        src={element.image ? element.image : no_image}
                        className='card-img'
                        alt='...'
                      />
                      <div className='card-image-overlay'>
                        <BsFillPlayFill className='line-news-circle pulse' fill='white' size={50} />
                      </div>

                      <div id='LN-card-body' className='card-body'>
                        <h5 id='LN-card-title' className='card-title'>
                          {element.title}
                        </h5>
                      </div>
                    </div>
                    <VideoPlayerModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      keyboard={false}
                      url={Video_url}
                      type_url={typeUrl}
                    />
                  </div>
                ))
              ) : (
                <div className='text-center my-5'>{translate('nodatafound')}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default LiveNews
