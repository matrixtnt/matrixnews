'use client'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import TagsSection from '../../tag/TagsSection'
import {
  FacebookIcon,
  WhatsappIcon,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
  XIcon
} from 'react-share'
import BreadcrumbNav from '../../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../../store/reducers/languageReducer'
import { calculateReadTime, extractTextFromHTML, isLogin, placeholderImage, translate } from '../../../utils'
import { BsFillPlayFill, BsLink45Deg } from 'react-icons/bs'
import { AiOutlineEye } from 'react-icons/ai'
import VideoPlayerModal from '../../videoplayer/VideoPlayerModal'
import Skeleton from 'react-loading-skeleton'
import { BiTime } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { AllBreakingNewsApi } from 'src/hooks/allBreakingNewsApi'
import { getLanguage, getUser } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import { getAdsSpaceNewsDetailsApi } from 'src/hooks/adSpaceApi'
import Layout from 'src/components/layout/Layout'
import { settingsData } from 'src/store/reducers/settingsReducer'
import { getBreakingNewsApi } from 'src/store/actions/campaign'
import AdSpaces from '../../view/adSpaces/AdSpaces.jsx'
import toast from 'react-hot-toast'
import SeoShare from 'src/components/view/SocialMediaShares/SeoShare'
import WithoutSeoShare from 'src/components/view/SocialMediaShares/WithoutSeoShare'
import { store } from 'src/store/store'
import { SetSearchPopUp } from 'src/store/stateSlice/clickActionSlice'

const BreakingNews = () => {
  const [FontSize, setFontSize] = useState(14)
  const [Video_url, setVideo_url] = useState()
  const [modalShow, setModalShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [DetailsPageData, setDetailsPageData] = useState([])
  const router = useRouter()
  const query = router.query
  const SettingsData = useSelector(settingsData)
  const currentUrL = `${process.env.NEXT_PUBLIC_WEB_URL}${router?.asPath}`

  const decodedURL = decodeURI(currentUrL)
  const [whatsappImageLoaded, setWhatsappImageLoaded] = useState(false);

  const handleCopyUrl = async (e) => {
    e.preventDefault();
    // Get the current URL from the router
    try {
      // Use the Clipboard API to copy the URL to the clipboard
      await navigator.clipboard.writeText(decodedURL);
      toast.success("URL copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const breakingNewsSlug = query.slug

  const [newsViewsIncreament, setNewsViewsIncreament] = useState(false)



  let { id: language_id } = getLanguage()
  let user = getUser()
  const currentLanguage = useSelector(selectCurrentLanguage)
  const handleVideoUrl = url => {
    setModalShow(true)
    setVideo_url(url)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    getBreakingNewsApi({
      slug: breakingNewsSlug,
      language_id: query.language_id ? query.language_id : currentLanguage.id,
      onSuccess: (res) => {
        const data = res.data[0]
        setDetailsPageData(data)
        setIsLoading(false)

      },
      onError: (err) => {
        setDetailsPageData([])
        setIsLoading(false)
        router.push('/')
      }
    })

  }, [currentLanguage.id])

  useEffect(() => {
  }, [DetailsPageData])


  useEffect(() => {
    // console.log('newsViewsIncreament =>', newsViewsIncreament)
  }, [newsViewsIncreament])


  // api call
  const setBreakingNewsViewApi = async () => {
    if (isLogin() && DetailsPageData && !newsViewsIncreament) {

      try {
        const { data } = await AllBreakingNewsApi.setBreakingNewsView({
          // user_id: user,
          breaking_news_id: DetailsPageData?.id
        })

        if (data?.error === false) {
          setNewsViewsIncreament(true)
          console.log('data.error =>', data.error)
        }
        else {
          console.log('data.error =>', data.error)
        }

        return data.data ?? null
      } catch (error) {
      }
    }
  }

  // api call
  const getAdsSpaceNewsApi = async () => {
    try {
      const { data } = await getAdsSpaceNewsDetailsApi.getAdsSpaceNewsDetails({
        language_id: language_id
      })
      return data.data ?? null
    } catch (error) {
      console.log(error)
    }
  }


  const { } = useQuery({
    queryKey: ['setBreakingNewsView', DetailsPageData, user, currentLanguage],
    queryFn: setBreakingNewsViewApi
  })

  const { data: adsdata } = useQuery({
    queryKey: ['getAdsSpaceDetails', currentLanguage],
    queryFn: getAdsSpaceNewsApi,
    staleTime: 1 * 60 * 1000, cacheTime: 5 * 60 * 1000


  })

  const text = extractTextFromHTML(DetailsPageData && DetailsPageData?.description)

  // Calculate read time
  const readTime = calculateReadTime(text)

  const closeSearchPopUp = () => {
    store.dispatch(SetSearchPopUp(false))
  }

  useEffect(() => {
    closeSearchPopUp()
  }, [breakingNewsSlug])

  return (
    <Layout>
      {DetailsPageData ? (
        <>
          {isLoading ? (
            // Show skeleton loading when data is being fetched
            <div className='col-12 loading_data'>
              <Skeleton height={20} count={22} />
            </div>
          ) : (
            <>
              <BreadcrumbNav SecondElement={translate('breakingNewsLbl')} ThirdElement={DetailsPageData?.title} />

              <div className='breaking-news-section'>
                <div id='B_NV-main' className='breaking_news_detail'>
                  <div id='B_NV-page' className='container'>
                    {/* ad spaces */}
                    {adsdata && adsdata.ad_spaces_top ? (
                      <>
                        <AdSpaces ad_url={adsdata && adsdata.ad_spaces_top.ad_url} ad_img={adsdata && adsdata.ad_spaces_top.web_ad_image} style_web='' />
                      </>
                    ) : null}
                    <div className='row'>
                      <div className='col-md-7 col-12'>
                        <div id='B_NV-body'>
                          <p id='btnB_NVCatagory' className='btn btn-sm mb-0'>
                            {translate('breakingnews')}
                          </p>
                          <h1 id='B_NV-title'>{DetailsPageData?.title}</h1>

                          <div id='B_NV-Header' className=''>
                            <div id='nv-left-head'>
                              <p id='head-lables' className='eye_icon'>
                                <AiOutlineEye size={18} id='head-logos' /> {newsViewsIncreament ? DetailsPageData?.total_views + 1 : DetailsPageData?.total_views}
                              </p>
                              <p id='head-lables' className='minute_Read'>
                                <BiTime size={18} id='head-logos' />
                                {readTime && readTime > 1
                                  ? ' ' + readTime + ' ' + translate('minutes') + ' ' + translate('read')
                                  : ' ' + readTime + ' ' + translate('minute') + ' ' + translate('read')}
                              </p>
                            </div>
                            {process.env.NEXT_PUBLIC_SEO === 'true' ? (

                              <SeoShare url={decodedURL} title={`${DetailsPageData && DetailsPageData[0]?.title} - ${SettingsData && SettingsData?.web_setting?.web_name}`} hashtag={`${SettingsData && SettingsData?.web_setting?.web_name}`} handleCopyUrl={handleCopyUrl} setWhatsappImageLoaded={setWhatsappImageLoaded} />

                            ) :

                              <WithoutSeoShare url={decodedURL} title={SettingsData && SettingsData?.web_setting?.web_name} hashtag={`${SettingsData && SettingsData?.web_setting?.web_name}`} handleCopyUrl={handleCopyUrl} />
                              // <div id='nv-right-head'>
                              //   <h6 id='nv-Share-Label'>{translate('shareLbl')}:</h6>
                              //   <button onClick={handleCopyUrl} className='copy_url'>
                              //     <BsLink45Deg size={30} />
                              //   </button>
                              // </div>
                            }
                          </div>
                          <div id='vps-body-left'>
                            <img id='B_NV-image' src={DetailsPageData?.image} alt={DetailsPageData?.title} onError={placeholderImage} />
                            {DetailsPageData && DetailsPageData?.content_value ? (
                              <div className='text-black'>
                                <div id='vps-btnVideo' onClick={() => handleVideoUrl(DetailsPageData?.content_value)}>
                                  <BsFillPlayFill id='vps-btnVideo-logo' className='pulse' fill='white' size={50} />
                                </div>
                              </div>
                            ) : null}
                          </div>

                          <div id='B_NV-functions' className=''>
                            <div id='B_NV-functions-left'>
                              <Form.Label id='B_NV-font-lable'>{translate('fontsize')}</Form.Label>
                              <Form.Range
                                id='B_NV-FontRange'
                                min={14}
                                max={24}
                                step={2}
                                value={FontSize}
                                onChange={e => setFontSize(e.target.value)}
                              />
                              <div className='d-flex justify-content-between'>
                                <Form.Label id='B_NV-FontRange-labels'>14px</Form.Label>
                                <Form.Label id='B_NV-FontRange-labels'>16px</Form.Label>
                                <Form.Label id='B_NV-FontRange-labels'>18px</Form.Label>
                                <Form.Label id='B_NV-FontRange-labels'>20px</Form.Label>
                                <Form.Label id='B_NV-FontRange-labels'>22px</Form.Label>
                                <Form.Label id='B_NV-FontRange-labels'>24px</Form.Label>
                              </div>
                            </div>
                            <div id='B_NV-functions-right'></div>
                          </div>
                          <p
                            id='B_NV-description'
                            style={{ fontSize: `${FontSize}px`, wordWrap: 'break-word' }}
                            dangerouslySetInnerHTML={{ __html: DetailsPageData?.description }}
                          ></p>
                        </div>
                      </div>
                      <div className='col-md-5 col-12'>
                        <div id='B_NV-right-section'>
                          {/* {DetailsPageData.length > 0 ? <RelatedBreakingNews id={DetailsPageData?.id} /> : null} */}
                          {/* <TagsSection /> */}
                        </div>
                      </div>
                    </div>
                    <VideoPlayerModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      // backdrop="static"
                      keyboard={false}
                      url={Video_url}
                      type_url={DetailsPageData?.type}
                    // title={data.title}
                    />
                    {/* ad spaces */}
                    {adsdata && adsdata?.ad_spaces_bottom ? (
                      <>
                        <AdSpaces ad_url={adsdata && adsdata?.ad_spaces_bottom?.ad_url} ad_img={adsdata && adsdata?.ad_spaces_bottom?.web_ad_image} style_web='' />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : null}
    </Layout>
  )
}

export default BreakingNews
