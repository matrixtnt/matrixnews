import { BsFillPlayFill } from 'react-icons/bs'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Skeleton from 'react-loading-skeleton'
import { placeholderImage, stripHtmlTags, translate, truncateText } from '../../utils'
import { useEffect, useState } from 'react'
import VideoPlayerModal from '../videoplayer/VideoPlayerModal'
import { useQuery } from '@tanstack/react-query'
import { getLanguage, getUser } from 'src/utils/api'
import { locationData } from 'src/store/reducers/settingsReducer'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { getFeatureSectionApi } from 'src/hooks/getFeatureSectionApi'
import AdSpaces from '../view/adSpaces/AdSpaces'
import CommonViewMoreDiv from './CommonViewMoreDiv'
import StyleSixSkeleton from '../skeletons/StyleSixSkeleton'
import toast from 'react-hot-toast'

SwiperCore.use([Navigation, Pagination, Autoplay])

const StyleSix = ({ Data, setIsLoading }) => {

  const [Video_url, setVideo_url] = useState()
  const [modalShow, setModalShow] = useState(false)
  const [typeUrl, setTypeUrl] = useState(null)
  let user = getUser()
  let { id: language_id } = getLanguage()
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long
  const router = useRouter()

  const dataPerPage = 6;

  const [loadMore, setLoadMore] = useState(false)
  const [offset, setOffset] = useState(0)

  const [swiperNewsData, setSwiperNewsData] = useState([])
  const [totalData, setTotalData] = useState('')

  const [swiperVideoNewsData, setSwiperVideoNewsData] = useState([])
  const [swiperVideoNewType, setSwiperVideoNewType] = useState(null)
  const [totalVideoNewsData, setTotalVideoNewsData] = useState('')

  const [swiperBreakingNewsData, setSwiperBreakingNewsData] = useState([])
  const [totalBreakingNewsData, setTotalBreakingNewsData] = useState('')

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
    },
    onReachEnd: () => {
      if (totalData > dataPerPage && totalData !== swiperNewsData.length) {
        setLoadMore(true)
        setOffset(offset + 1)
      }
    }
    // pagination: { clickable: true },
  }

  const VideoNewsSwiperOptionUpdate = {
    loop: false,
    speed: 750,
    spaceBetween: 10,
    slidesPerView: 4,
    navigation: false,
    breakpoints: Newbreakpoints,
    autoplay: {
      delay: 2000000,
      disableOnInteraction: false
    },
    onReachEnd: () => {
      if (totalVideoNewsData > dataPerPage && totalVideoNewsData !== swiperVideoNewsData.length) {
        setLoadMore(true)
        setOffset(offset + 1)
      }
    }
    // pagination: { clickable: true },
  }

  const breakingNewsSwiperOptionUpdate = {
    loop: false,
    speed: 750,
    spaceBetween: 10,
    slidesPerView: 4,
    navigation: false,
    breakpoints: Newbreakpoints,
    autoplay: {
      delay: 2000000,
      disableOnInteraction: false
    },
    onReachEnd: () => {
      if (totalBreakingNewsData > dataPerPage && totalBreakingNewsData !== swiperBreakingNewsData.length) {
        setLoadMore(true)
        setOffset(offset + 1)
      }
    }
    // pagination: { clickable: true },
  }

  const handleVideoUrl = url => {
    setModalShow(true)
    setVideo_url(url)
  }

  const getFeatureSectionById = async () => {

    !loadMore ? setIsLoading(true) : setIsLoading(false)

    try {
      const { data } = await getFeatureSectionApi.getFeatureSection({
        offset: offset * dataPerPage,
        limit: dataPerPage,
        section_id: Data?.id,
        language_id: language_id,
        latitude: storedLatitude,
        longitude: storedLongitude
      })
      setIsLoading(false)
      return data.data
    } catch (error) {
      console.log(error)
      setSwiperNewsData([])
      setIsLoading(false)
    }
  }

  // react query
  const { data: sliderData } = useQuery({
    queryKey: ['styleSixFeature', location, Data?.id, offset],
    queryFn: getFeatureSectionById
  })

  useEffect(() => {
    if (sliderData && sliderData[0].news?.length > 0) {
      loadMore ? setSwiperNewsData((prevData) => [...prevData, ...sliderData[0]?.news]) :
        setSwiperNewsData(sliderData[0].news);
    }
    if (sliderData && sliderData[0].videos?.length > 0) {
      loadMore ? setSwiperVideoNewsData((prevData) => [...prevData, ...sliderData[0]?.videos]) :
        setSwiperVideoNewsData(sliderData[0].videos);
      setSwiperVideoNewType(sliderData[0]?.videos_type)
    }
    if (sliderData && sliderData[0].breaking_news?.length > 0) {
      loadMore ? setSwiperBreakingNewsData((prevData) => [...prevData, ...sliderData[0]?.breaking_news]) :
        setSwiperBreakingNewsData(sliderData[0].breaking_news);
    }

    if (sliderData && sliderData[0]?.news) {
      setTotalData(sliderData[0]?.news_total)
    }
    if (sliderData && sliderData[0]?.breaking_news) {
      setTotalBreakingNewsData(sliderData[0]?.breaking_news_total)
    }
    if (sliderData && sliderData[0]?.videos) {
      setTotalVideoNewsData(sliderData[0]?.videos_total)
    }

  }, [sliderData])



  const TypeUrl = type => {
    setTypeUrl(type)
  }


  return (
    <div id='first-section'>
      {/* ad spaces */}
      {Data.ad_spaces && Data.id == Data.ad_spaces.ad_featured_section_id && Data.news_type === 'videos' ? (
        <>
          <AdSpaces ad_url={Data.ad_spaces.ad_url} ad_img={Data.ad_spaces.web_ad_image} style_web='six' />
        </>
      ) : null}

      {/* video section */}
      {swiperVideoNewsData?.length > 0 ? (
        <div className='container'>
          <div id='style-six-body-section'>
            <CommonViewMoreDiv title={Data && Data.title} desc={Data && Data.short_description} link={`/view-all/${Data.slug}`} styleSix={true} />
            <Swiper {...VideoNewsSwiperOptionUpdate} className='custom-swiper'>
              {
                swiperVideoNewsData.map(item => (
                  <SwiperSlide key={item.id}>
                    <Link
                      href={{ pathname: `/news/${item.slug}`, query: { language_id: item.language_id } }}
                      // as={`/news/${item.slug}`}
                    >
                      <div className='card fs-Newscard'>
                        <img
                          src={item.image}
                          alt={item.title}
                          className='fs-Newscard-image h-auto'
                          id='fs-Newscard-image01'
                          onError={placeholderImage}
                        />
                        <div className='card-img-overlay'>
                          {item && item.category_name ? (
                            <div
                              onClick={() =>
                                router.push({
                                  pathname: `/categories-news/${item.slug}`,
                                  query: { category_id: item.id }
                                })
                              }
                              id='btnCatagory'
                              className='btn'
                              type='button'
                            >
                              {truncateText(item.category_name, 25)}
                            </div>
                          ) : null}

                          <div
                            className='video_slider_button'
                            onClick={() => {
                              handleVideoUrl(item.content_value)
                              TypeUrl(item.type)
                            }}
                          >
                            <BsFillPlayFill className='pulse' fill='white' size={50} />
                          </div>

                          {swiperVideoNewType === 'news' ? (
                            <div id='Top-Deatils'>
                              {item && item?.published_date ? (
                                <p id='Top-Posttime01'>
                                  {item?.published_date
                                    ? new Date(item?.published_date).toLocaleString('en-us', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric'
                                    })
                                    : ''}
                                </p>
                              ) : null}

                              <div
                                id='Top-Title01'
                              >
                                {truncateText(item.title, 35)} <br />
                                {stripHtmlTags(item.description.slice(0, 600))} ...
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              }
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
      {Data.ad_spaces && Data.id == Data.ad_spaces.ad_featured_section_id && Data.news_type === 'news' ? (
        <>
          <AdSpaces ad_url={Data.ad_spaces.ad_url} ad_img={Data.ad_spaces.web_ad_image} style_web={'six'} />
        </>
      ) : null}

      {/* news section */}
      {
        swiperNewsData?.length > 0 ? (
          <div className='container'>

            <div id='style-six-body-section'>
              <CommonViewMoreDiv title={Data && Data.title} desc={Data && Data.short_description} link={`/view-all/${Data.slug}`} styleSix={true} />
              <Swiper {...swiperOptionUpdate} className='custom-swiper'>
                {

                  swiperNewsData?.map(item => (
                    <SwiperSlide key={item.id}>
                      <Link
                        href={{ pathname: `/news/${item.slug}`, query: { language_id: item.language_id } }}
                        // as={`/news/${item.slug}`}
                      >
                        <div className='card fs-Newscard'>
                          <img
                            src={item.image}
                            alt={item.title}
                            className='fs-Newscard-image h-auto'
                            id='fs-Newscard-image01'
                            onError={placeholderImage}
                          />
                          <div className='card-img-overlay'>
                            <div
                              id='btnCatagory'
                              className='btn'
                            // onClick={() =>
                            //   router.push({
                            //     pathname: `/categories-news/${item.slug}`,
                            //     query: { category_id: item.id }
                            //   })
                            // }
                            >
                              {truncateText(item.category_name, 25)}
                            </div>
                            <div id='Top-Deatils'>
                              <p id='Top-Posttime01'>
                                {item?.published_date
                                  ? new Date(item?.published_date).toLocaleString('en-in', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })
                                  : ''}
                              </p>
                              <div
                                id='Top-Title01'
                              >
                                {truncateText(item.title, 35)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))
                }

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
      {Data.ad_spaces && Data.id == Data.ad_spaces.ad_featured_section_id && Data.news_type === 'breaking_news' ? (
        <>
          <AdSpaces ad_url={Data.ad_spaces.ad_url} ad_img={Data.ad_spaces.web_ad_image} style_web={'six'} />
        </>
      ) : null}

      {/* breaking news section */}
      {swiperBreakingNewsData?.length > 0 ? (
        <div className='container'>
          <div id='style-six-body-section'>
            <CommonViewMoreDiv title={Data && Data.title} desc={Data && Data.short_description} link={`/view-all/${Data.slug}`} styleSix={true} />
            <Swiper {...breakingNewsSwiperOptionUpdate} className='custom-swiper'>
              {
                swiperBreakingNewsData.map(item => (
                  <SwiperSlide key={item.id}>
                    {/* <Link href={item.content_value ? '#' : `/breaking-news/${item.slug}`}> */}
                    <div className='card fs-Newscard'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='fs-Newscard-image h-auto'
                        id='fs-Newscard-image01'
                        onError={placeholderImage}
                      />
                      <div className='card-img-overlay'>
                        {item.content_value ? (
                          <div
                            className='video_slider_button'
                            onClick={() => {
                              handleVideoUrl(item.content_value)
                              TypeUrl(item.type)
                            }}
                          >
                            <BsFillPlayFill className='pulse' fill='white' size={50} />
                          </div>
                        ) : null}
                        <div id='Top-Deatils'>
                          <Link
                            href={{ pathname: `/breaking-news/${item.slug}`, }}
                            id='Top-Title01'
                          >
                            {truncateText(item.title, 35)}
                            {stripHtmlTags(item.description.slice(0, 600))} ...
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* </Link> */}
                  </SwiperSlide>
                ))
              }
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
