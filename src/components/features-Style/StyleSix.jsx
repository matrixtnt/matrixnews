import { BsFillPlayFill } from 'react-icons/bs'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Skeleton from 'react-loading-skeleton'
import { stripHtmlTags, truncateText } from '../../utils'
import { useEffect, useState } from 'react'
import VideoPlayerModal from '../videoplayer/VideoPlayerModal'
import { getfeaturesectionbyidApi } from '../../store/actions/campaign'

SwiperCore.use([Navigation, Pagination, Autoplay])

const StyleSix = ({ isLoading, Data, setIsLoading }) => {
  const [Video_url, setVideo_url] = useState()
  const [modalShow, setModalShow] = useState(false)
  const [sliderData, setSliderData] = useState()
  const [typeUrl, setTypeUrl] = useState(null)

  const Newbreakpoints = {
    320: {
      slidesPerView: 1
    },
    375: {
      slidesPerView: 1.5
    },
    576: {
      slidesPerView: 1.5
    },
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 3
    },
    1400: {
      slidesPerView: 4
    }
  }
  const swiperOptionUpdate = {
    loop: false,
    speed: 750,
    spaceBetween: 10,
    slidesPerView: 4,
    navigation: false,
    breakpoints: Newbreakpoints,
    autoplay: {
      delay: 2000000,
      disableOnInteraction: false
    }
    // pagination: { clickable: true },
  }

  // console.log(Data)

  const handleVideoUrl = url => {
    setModalShow(true)
    setVideo_url(url)
  }

  const storedLatitude = localStorage.getItem('latitude')
  const storedLongitude = localStorage.getItem('longitude')

  useEffect(() => {
    getfeaturesectionbyidApi(
      Data.id,
      '',
      '',
      storedLatitude && storedLatitude ? storedLatitude : null,
      storedLongitude && storedLongitude ? storedLongitude : null,
      response => {
        setSliderData(response?.data[0])
        setIsLoading(false)
      },
      error => {
        if (error === 'No Data Found') {
          setSliderData('')
          setIsLoading(false)
        }
      }
    )
    // eslint-disable-next-line
  }, [])

  const TypeUrl = type => {
    setTypeUrl(type)
  }

  return (
    <div id='first-section'>
      {/* ad spaces */}
      {Data.ad_spaces && Data.id === Data.ad_spaces.ad_featured_section_id && Data.news_type === 'videos' ? (
        <div className='ad_spaces'>
          <div className='container'>
            <div target='_blank' onClick={() => window.open(Data.ad_spaces.ad_url, '_blank')}>
              {Data.ad_spaces.web_ad_image && <img className='adimage' src={Data.ad_spaces.web_ad_image} alt='ads' />}
            </div>
          </div>
        </div>
      ) : null}

      {/* video section */}
      {sliderData && sliderData.videos?.length > 0 ? (
        <div className='container'>
          <div id='style-six-body-section'>
            <Swiper {...swiperOptionUpdate} className='custom-swiper'>
              {isLoading ? (
                // Show skeleton loading when data is being fetched
                <div className='col-12 loading_data'>
                  <Skeleton height={20} count={22} />
                </div>
              ) : (
                sliderData.videos.map(item => (
                  <SwiperSlide key={item.id}>
                    <Link href={`/news/${item.id}`}>
                      <div className='card fs-Newscard'>
                        <img src={item.image} alt='' className='fs-Newscard-image h-auto' id='fs-Newscard-image01' />
                        <div className='card-img-overlay'>
                          {item && item.category_name ? (
                            <Link
                              id='btnCatagory'
                              className='btn'
                              type='button'
                              href={`/categories-news/${item.category_id}`}
                            >
                              {truncateText(item.category_name, 25)}
                            </Link>
                          ) : null}

                          <div className='video_slider_button' onClick={() => {handleVideoUrl(item.content_value); TypeUrl(item.type)}}>
                            <BsFillPlayFill className='pulse' fill='white' size={50} />
                          </div>

                          {sliderData.videos_type === 'news' ? (
                            <div id='Top-Deatils'>
                              {item && item.date ? (
                                <p id='Top-Posttime01'>
                                  {item.date
                                    ? new Date(item.date).toLocaleString('en-us', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                      })
                                    : ''}
                                </p>
                              ) : null}

                              <Link href={`/news/${item.id}`} id='Top-Title01'>
                                {truncateText(item.title, 30)} <br />
                                {stripHtmlTags(item.description.slice(0, 600))} ...
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              )}
              <VideoPlayerModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                // backdrop="static"
                keyboard={false}
                url={Video_url}
                type_url={typeUrl}
                // title={Data[0].title}
              />
            </Swiper>
          </div>
        </div>
      ) : null}

      {/* ad spaces */}
      {Data.ad_spaces && Data.id === Data.ad_spaces.ad_featured_section_id && Data.news_type === 'news' ? (
        <div className='ad_spaces'>
          <div className='container'>
            <div target='_blank' onClick={() => window.open(Data.ad_spaces.ad_url, '_blank')}>
              {Data.ad_spaces.web_ad_image && <img className='adimage' src={Data.ad_spaces.web_ad_image} alt='ads' />}
            </div>
          </div>
        </div>
      ) : null}

      {/* news section */}
      {sliderData && sliderData.news?.length > 0 ? (
        <div className='container'>
          <div id='style-six-body-section'>
            <Swiper {...swiperOptionUpdate} className='custom-swiper'>
              {isLoading ? (
                // Show skeleton loading when data is being fetched
                <div className='col-12 loading_data'>
                  <Skeleton height={20} count={22} />
                </div>
              ) : (
                sliderData.news.map(item => (
                  <SwiperSlide key={item.id}>
                    <Link href={`/news/${item.id}`}>
                      <div className='card fs-Newscard'>
                        <img src={item.image} alt='' className='fs-Newscard-image h-auto' id='fs-Newscard-image01' />
                        <div className='card-img-overlay'>
                          <Link
                            id='btnCatagory'
                            className='btn'
                            type='button'
                            href={`/categories-news/${item.category_id}`}
                          >
                            {truncateText(item.category_name, 25)}
                          </Link>
                          <div id='Top-Deatils'>
                            <p id='Top-Posttime01'>
                              {item.date
                                ? new Date(item.date).toLocaleString('en-us', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })
                                : ''}
                            </p>
                            <Link href={`/news/${item.id}`} id='Top-Title01'>
                              {truncateText(item.title, 30)}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              )}
              <VideoPlayerModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                // backdrop="static"
                keyboard={false}
                url={Video_url}
                type_url={typeUrl}
                // title={Data[0].title}
              />
            </Swiper>
          </div>
        </div>
      ) : null}

      {/* ad spaces */}
      {Data.ad_spaces && Data.id === Data.ad_spaces.ad_featured_section_id && Data.news_type === 'breaking_news' ? (
        <div className='ad_spaces'>
          <div className='container'>
            <div target='_blank' onClick={() => window.open(Data.ad_spaces.ad_url, '_blank')}>
              {Data.ad_spaces.web_ad_image && <img className='adimage' src={Data.ad_spaces.web_ad_image} alt='ads' />}
            </div>
          </div>
        </div>
      ) : null}

      {/* breaking news section */}
      {sliderData && sliderData.breaking_news?.length > 0 ? (
        <div className='container'>
          <div id='style-six-body-section'>
            <Swiper {...swiperOptionUpdate} className='custom-swiper'>
              {isLoading ? (
                // Show skeleton loading when data is being fetched
                <div className='col-12 loading_data'>
                  <Skeleton height={20} count={22} />
                </div>
              ) : (
                sliderData.breaking_news.map(item => (
                  <SwiperSlide key={item.id}>
                    {/* <Link href={item.content_value ? '#' : `/breaking-news/${item.id}`}> */}
                    <div className='card fs-Newscard'>
                      <img src={item.image} alt='' className='fs-Newscard-image h-auto' id='fs-Newscard-image01' />
                      <div className='card-img-overlay'>
                        {item.content_value ? (
                          <div className='video_slider_button' onClick={() => {handleVideoUrl(item.content_value); TypeUrl(item.type)}}>
                            <BsFillPlayFill className='pulse' fill='white' size={50} />
                          </div>
                        ) : null}
                        <div id='Top-Deatils'>
                          <Link href={`/breaking-news/${item.id}`} id='Top-Title01'>
                            {truncateText(item.title, 30)}
                            {stripHtmlTags(item.description.slice(0, 600))} ...
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* </Link> */}
                  </SwiperSlide>
                ))
              )}
              <VideoPlayerModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                // backdrop="static"
                keyboard={false}
                url={Video_url}
                type_url={typeUrl}
                // title={Data[0].title}
              />
            </Swiper>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default StyleSix
