'use client'
import { useEffect, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import VideoPlayerModal from '../videoplayer/VideoPlayerModal'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { NoDataFound, placeholderImage, translate } from '../../utils'
import no_image from '../../../public/assets/images/placeholder.png'
import { useQuery } from '@tanstack/react-query'
import { getLanguage } from 'src/utils/api'
import Layout from '../layout/Layout'
import Card from '../skeletons/Card'
import LoadMoreBtn from '../view/loadMoreBtn/LoadMoreBtn'
import { settingsData } from 'src/store/reducers/settingsReducer'
import { getVideoNewsApi } from 'src/hooks/getVideoNewsApi'


const VideoNews = () => {
  const [Video_url, setVideo_url] = useState()
  const [modalShow, setModalShow] = useState(false)
  const [typeUrl, setTypeUrl] = useState(null)
  let { id: language_id } = getLanguage()
  const currentLanguage = useSelector(selectCurrentLanguage)

  const settings = useSelector(settingsData)

  const dataPerPage = 6;

  const [isLoading, setIsLoading] = useState({
    loading: false,
    loadMoreLoading: false
  })
  const [loadMore, setLoadMore] = useState(false)
  const [videoNewsData, setVideoNewsData] = useState([])
  const [offset, setOffset] = useState(0)
  const [totalData, setTotalData] = useState('')

  const handleLoadMore = () => {
    setLoadMore(true)
    setOffset(offset + 1)
  }

  // api call
  const getVideoNews = async () => {
    !loadMore ? setIsLoading({ loading: true }) : setIsLoading({ loadMoreLoading: true })
    try {
      const { data } = await getVideoNewsApi.getVideoNews({
        language_id: language_id,
        offset: offset * dataPerPage,
        limit: dataPerPage,
      })
      setTotalData(data.total)
      setIsLoading({ loading: false })
      setIsLoading({ loadMoreLoading: false })
      return data.data
    } catch (error) {
      console.log(error)
      setVideoNewsData([])
      setIsLoading({ loading: false })
    }
  }

  // react query
  const { data: Data } = useQuery({
    queryKey: ['getVideoNews', currentLanguage, offset],
    queryFn: getVideoNews,
  })

  useEffect(() => {
    if (Data && Data) {
      setVideoNewsData((prevData) => [...prevData, ...Data]);
    }
  }, [Data])

  useEffect(() => {

  }, [totalData, isLoading])

  const handleLiveNewsVideoUrl = url => {
    setModalShow(true)
    setVideo_url(url)
  }

  const TypeUrl = type => {
    setTypeUrl(type)
  }

  return (
    <Layout>
      <BreadcrumbNav SecondElement={translate('videoNews')} />

      <div id='LN-main' className='py-5 bg-white'>
        <div id='LN-content' className='container'>
          {isLoading.loading ? (
            <div className='row'>
              {[...Array(3)].map((_, index) => (
                <div className='col-md-4 col-12' key={index}>
                  <Card isLoading={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className='row live-news commonRowGap'>
              {videoNewsData && videoNewsData.length > 0 ? (
                videoNewsData.map(element => (
                  <div className='col-md-4 col-12' key={element.id}>
                    <div
                      id='LN-card'
                      className='card'
                      onClick={() => {
                        handleLiveNewsVideoUrl(element.content_value)
                        TypeUrl(element.type)
                      }}
                    >
                      <img
                        id='LN-card-image'
                        src={element.image ? element.image : no_image.src}
                        className='card-img'
                        alt={element?.title}
                        onError={placeholderImage}
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
                <>
                  {NoDataFound()}

                </>

              )}
              {totalData > dataPerPage && totalData !== videoNewsData.length ? (
                <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default VideoNews