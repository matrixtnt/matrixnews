'use client'
import { useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import VideoPlayerModal from '../../videoplayer/VideoPlayerModal'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../../store/reducers/languageReducer'
import Skeleton from 'react-loading-skeleton'
import { translate } from '../../../utils'
import BreadcrumbNav from '../../breadcrumb/BreadcrumbNav'
import no_image from '../../../../public/assets/images/no_image.jpeg'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getFeatureSectionByIdApi } from 'src/hooks/getfeatureSectionbyidApi'
import { access_key, getLanguage, getUser } from 'src/utils/api'

const VideoNewsview = () => {
  const [Video_url, setVideo_url] = useState()
  const [modalShow, setModalShow] = useState(false)
  const [typeUrl, setTypeUrl] = useState(null)
  const router = useRouter()
  const query = router.query
  const catid = query.slug
  const currentLanguage = useSelector(selectCurrentLanguage)
  const storedLatitude = localStorage.getItem('latitude')
  const storedLongitude = localStorage.getItem('longitude')
  let user = getUser()
  let { id: language_id } = getLanguage()

  // api call
  const getFeatureSectionById = async () => {
    try {
      const { data } = await getFeatureSectionByIdApi.getFeatureSectionById({
        access_key: access_key,
        section_id: catid,
        language_id: language_id,
        user_id: user,
        offset: '',
        limit: '10',
        latitude: storedLatitude && storedLatitude ? storedLatitude : null,
        longitude: storedLongitude && storedLongitude ? storedLongitude : null
      })
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, data: Data } = useQuery({
    queryKey: ['getFeatureSectionById', catid, currentLanguage],
    queryFn: getFeatureSectionById
  })

  const handleLiveNewsVideoUrl = url => {
    setModalShow(true)
    setVideo_url(url)
  }

  const TypeUrl = type => {
    setTypeUrl(type)
  }

  return (
    <>
      <BreadcrumbNav SecondElement={'Video News'} ThirdElement='0' />
      <div className='py-5 video_section_all'>
        <div className='container'>
          {isLoading ? (
            <div>
              <Skeleton height={200} count={3} />
            </div>
          ) : (
            <div className='row'>
              {Data && Data[0].videos?.length > 0 ? (
                Data[0].videos.map(element => (
                  <div className='col-md-4 col-12' key={element.id}>
                    <div
                      id='vnv-card'
                      className='card'
                      onClick={() => {
                        handleLiveNewsVideoUrl(element.content_value)
                        TypeUrl(element.type)
                      }}
                    >
                      <img
                        id='vnv-card-image'
                        src={element.image ? element.image : no_image}
                        className='card-img'
                        alt='...'
                      />
                      <div className='card-image-overlay' id='vnv-btnVideo'>
                        <BsFillPlayFill id='vnv-btnVideo-logo' className='pulse' fill='white' size={50} />
                      </div>

                      <div id='vnv-card-body' className='card-body'>
                        {/* <button id='vnv-btnCatagory' className='btn btn-sm' type="button" >{element.category_name}</button> */}
                        <h5 id='vnv-card-title' className='card-title'>
                          {element.title}
                        </h5>
                        {/* <Link id='btnvnvRead' className='btn overlay' type="button" href="/news-view" ><IoArrowForwardCircleSharp size={50}/></Link> */}
                      </div>
                    </div>
                    <VideoPlayerModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      // backdrop="static"
                      keyboard={false}
                      url={Video_url}
                      type_url={typeUrl}
                      // title={Data[0].title}
                    />

                    {/* </Link> */}
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

export default VideoNewsview
