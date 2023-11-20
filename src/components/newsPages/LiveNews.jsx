'use client'
import { useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import VideoPlayerModal from '../videoplayer/VideoPlayerModal'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import Skeleton from 'react-loading-skeleton'
import { translate } from '../../utils'
import no_image from '../../../public/assets/images/no_image.jpeg'
import { useQuery } from '@tanstack/react-query'
import { getLiveStreamingApi } from 'src/hooks/getliveStreamApi'
import { access_key, getLanguage } from 'src/utils/api'
import Layout from '../layout/Layout'

const LiveNews = () => {
  const [Video_url, setVideo_url] = useState()
  const [modalShow, setModalShow] = useState(false)
  const [typeUrl, setTypeUrl] = useState(null)
  let { id: language_id } = getLanguage()
  const currentLanguage = useSelector(selectCurrentLanguage)
  // api call
  const getLiveStreaming = async () => {
    try {
      const { data } = await getLiveStreamingApi.getLiveStreaming({
        access_key: access_key,
        language_id: language_id
      })
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, data: Data } = useQuery({
    queryKey: ['getliveStreaming',currentLanguage],
    queryFn: getLiveStreaming
  })

  const handleLiveNewsVideoUrl = url => {
    setModalShow(true)
    setVideo_url(url)
  }

  const TypeUrl = type => {
    setTypeUrl(type)
  }

  return (
    <Layout>
      <BreadcrumbNav SecondElement={translate('livenews')} ThirdElement='0' />

      <div id='LN-main' className='py-5 bg-white'>
        <div id='LN-content' className='container'>
          {isLoading ? (
            <div>
              <Skeleton height={200} count={3} />
            </div>
          ) : (
            <div className='row live-news'>
              {Data && Data.length > 0 ? (
                Data.map(element => (
                  <div className='col-md-4 col-12' key={element.id}>
                    <div
                      id='LN-card'
                      className='card'
                      onClick={() => {
                        handleLiveNewsVideoUrl(element.url)
                        TypeUrl(element.type)
                      }}
                    >
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
    </Layout>
  )
}

export default LiveNews
