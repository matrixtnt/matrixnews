'use client';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { AiOutlineLike, AiOutlineEye, AiFillLike } from 'react-icons/ai';
import { BsBookmark, BsFillBookmarkFill, BsFillPlayFill } from 'react-icons/bs';
import { FiCalendar } from 'react-icons/fi';
import RelatedNewsSection from '../../relatedNews/RelatedNewsSection.jsx';
import TagsSection from '../../tag/TagsSection.jsx';

import BreadcrumbNav from '../../breadcrumb/BreadcrumbNav.jsx';

import SignInModal from '../../auth/SignInModal.jsx';
import { setbookmarkApi, setlikedislikeApi } from '../../../store/actions/campaign.js';
import { getLanguage, getUser } from '../../../utils/api.jsx';
import { calculateReadTime, extractTextFromHTML, isLogin, placeholderImage, translate, NoDataFound } from '../../../utils/index.jsx';
import VideoPlayerModal from '../../videoplayer/VideoPlayerModal.jsx';
import { selectCurrentLanguage } from '../../../store/reducers/languageReducer';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { selectUser } from '../../../store/reducers/userReducer.js';
import { settingsData } from '../../../store/reducers/settingsReducer';
import { GoTag } from 'react-icons/go';
import { BiTime } from 'react-icons/bi';
import LightBox from '../../gallery/LightBox.jsx';
import { FaImages } from 'react-icons/fa';
import { useRouter } from 'next/router.js';
import { useQuery } from '@tanstack/react-query';
import { getNewsApi } from 'src/hooks/newsApi.jsx';
import { getAdsSpaceNewsDetailsApi } from 'src/hooks/adSpaceApi';
import Layout from 'src/components/layout/Layout.jsx';
import toast from 'react-hot-toast';
import CommentsView from 'src/components/comment/CommentsView.jsx';
import Surveys from 'src/components/survey/Surveys.jsx';
import AdSpaces from '../../view/adSpaces/AdSpaces.jsx';
import WithoutSeoShare from 'src/components/view/SocialMediaShares/WithoutSeoShare.jsx';
import SeoShare from 'src/components/view/SocialMediaShares/SeoShare.jsx';
import { store } from 'src/store/store.js';
import { SetSearchPopUp } from 'src/store/stateSlice/clickActionSlice.js';

const News = () => {
  let user = getUser();
  const currentLanguage = useSelector(selectCurrentLanguage);
  const userData = useSelector(selectUser);
  const SettingsData = useSelector(settingsData);
  const router = useRouter();
  const currentUrL = `${process.env.NEXT_PUBLIC_WEB_URL}${router?.asPath}`;

  const decodedURL = decodeURI(currentUrL)

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
  const [CheckLike, setCheckLike] = useState(false);
  const [Like, setLike] = useState(CheckLike); // eslint-disable-next-line
  const [Bookmark, setBookmark] = useState(false); // eslint-disable-next-line
  const [FontSize, setFontSize] = useState(18); // eslint-disable-next-line
  const [Video_url, setVideo_url] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [VideomodalShow, setVideoModalShow] = useState(false);
  const [typeUrl, setTypeUrl] = useState(null);
  const query = router.query;
  const newsSlug = query.slug;


  // eslint-disable-next-line
  const [islogout, setIsLogout] = useState(false); // eslint-disable-next-line
  const [isloginloading, setisloginloading] = useState(true); // eslint-disable-next-line
  let { id: language_id } = getLanguage();
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [whatsappImageLoaded, setWhatsappImageLoaded] = useState(false);

  const [newsViewsIncreament, setNewsViewsIncreament] = useState(false)

  // console.log(query, 'quryy')

  // api call
  const getNewsById = async () => {
    if (currentLanguage) {

      try {
        const { data } = await getNewsApi.getNews({
          slug: newsSlug,
          language_id: query.language_id ? query.language_id : currentLanguage.id
        });

        if (data.data[0].bookmark === 0) {
          setBookmark(false);
        } else {
          setBookmark(true);
        }

        if (data.data[0].like === 0) {
          setLike(false);
        } else {
          setLike(true);
        }
        return data.data;
      } catch (error) {
        // console.log(error)
        if (error === 'No Data Found') {
          router.push('/');
        }
      }
    }
  };

  // api call
  const setNewsView = async () => {
    if (isLogin() && Data && !newsViewsIncreament) {
      // console.log('setNewsView called')
      try {
        const { data } = await getNewsApi.setNewsView({
          news_id: Data[0]?.id,
          language_id: '',
        });
        // console.log('newViewResponse =>', data.error)
        if (data?.error === false) {
          setNewsViewsIncreament(true)
          // console.log('data.error =>', data.error)
        }
        else {
          // console.log('newsView Err =>', data.error)

        }
        return data.data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  // api call
  const getAdsSpaceNewsDetails = async () => {
    try {
      const { data } = await getAdsSpaceNewsDetailsApi.getAdsSpaceNewsDetails({
        language_id: language_id
      });
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  // react query
  const { data: sponsoredads } = useQuery({
    queryKey: ['getadsspacenews'],
    queryFn: getAdsSpaceNewsDetails
  });

  const {
    refetch,
    isLoading,
    isError,
    data: Data,
    error,
    status
  } = useQuery({
    queryKey: ['getNewsbyId', newsSlug, currentLanguage.id],
    queryFn: getNewsById,

  });

  const { } = useQuery({
    queryKey: ['setNewsView', Data],
    queryFn: setNewsView,
    staleTime: 0
  });


  useEffect(() => { }, [userData.data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // set like dislike
  const setLikeDislikeData = async (id, status) => {
    if (user !== null) {
      setlikedislikeApi({
        news_id: id,
        status: status,
        onSuccess: async response => {
          await refetch();
          setLike(!Like);
        },
        onError: error => {
          console.log(error);
        }
      });
    } else {
      setModalShow(true);
    }
  };

  // set bookmark
  const setbookmarkData = async (id, status) => {
    if (user !== null) {
      // console.log('id: ',id,'status:',status)
      setbookmarkApi({
        news_id: id,
        status: status,
        onStart: async response => {
          await refetch();
          setBookmark(!Bookmark);
        },
        onSuccess: res => {
          toast.success(res.message);
        },
        onError: error => {
          console.log(error);
        }
      });
    } else {
      setModalShow(true);
    }
  };

  const handleVideoUrl = url => {
    setVideoModalShow(true);
    setVideo_url(url);
  };

  const TypeUrl = type => {
    setTypeUrl(type);
  };

  // tags
  const tagSplit = tag => {
    let tags = tag?.split(',');
    // console.log(tags)
    return tags;
  };

  // const readTime = calculateReadTime(text);

  const text = extractTextFromHTML(Data && Data[0]?.description);

  // Calculate read time
  const readTime = calculateReadTime(text);

  const galleryPhotos = Data && Data[0]?.images;

  const openLightbox = index => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const closeSearchPopUp = () => {
    store.dispatch(SetSearchPopUp(false))
  }



  useEffect(() => {
    closeSearchPopUp()
  }, [newsSlug])


  useEffect(() => {
    // console.log('newsViewsIncreament', newsViewsIncreament)
  }, [newsViewsIncreament])



  return (
    <Layout>
      {isLoading ? (
        <div>
          <Skeleton height={200} count={3} />
        </div>
      ) : Data && Data.length > 0 ? (
        <>
          <BreadcrumbNav SecondElement={translate('newsDetails')} ThirdElement={Data && Data[0]?.title} />
          <div className='news-deatail-section'>
            <div id='nv-main' className='container news_detail'>
              {/* ad spaces */}
              {sponsoredads && sponsoredads.ad_spaces_top ? (
                <>
                  <AdSpaces ad_url={sponsoredads && sponsoredads.ad_spaces_top.ad_url} ad_img={sponsoredads && sponsoredads.ad_spaces_top.web_ad_image} style_web='' />
                </>
              ) : null}
              <div id='nv-page' className='row'>
                <div id='nv-body' className='col-lg-8 col-12'>
                  <button id='btnnvCatagory' className='btn btn-sm' type='button'>
                    {Data && Data[0]?.category?.category_name}
                  </button>
                  <h1 id='nv-title'>{Data && Data[0]?.title}</h1>

                  <div id='nv-Header' className=''>
                    <div id='nv-left-head'>
                      <p id='head-lables'>
                        <FiCalendar size={18} id='head-logos' /> {new Date(Data && Data[0]?.published_date).toLocaleString('en-us', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                      <p id='head-lables'>
                        <AiOutlineLike size={18} id='head-logos' /> {Data && Data[0]?.total_like} {translate('likes')}
                      </p>

                      <p id='head-lables' className='eye_icon'>
                        <AiOutlineEye size={18} id='head-logos' /> {newsViewsIncreament ? Data && Data[0]?.total_views + 1 : Data && Data[0]?.total_views}
                      </p>
                      <p id='head-lables' className='minute_Read'>
                        <BiTime size={18} id='head-logos' />
                        {readTime && readTime > 1
                          ? ' ' + readTime + ' ' + translate('minutes') + ' ' + translate('read')
                          : ' ' + readTime + ' ' + translate('minute') + ' ' + translate('read')}
                      </p>
                    </div>
                    {process.env.NEXT_PUBLIC_SEO === 'true' ? (

                      <SeoShare url={decodedURL} title={`${Data && Data[0]?.title} - ${SettingsData && SettingsData?.web_setting?.web_name}`} hashtag={`${SettingsData && SettingsData?.web_setting?.web_name}`} handleCopyUrl={handleCopyUrl} setWhatsappImageLoaded={setWhatsappImageLoaded} />

                    ) :

                      <WithoutSeoShare url={decodedURL} title={SettingsData && SettingsData?.web_setting?.web_name} hashtag={`${SettingsData && SettingsData?.web_setting?.web_name}`} handleCopyUrl={handleCopyUrl} />
                    }
                  </div>
                  <div id='vps-body-left'>
                    <div className='vps-img-div'>
                      <img id='nv-image' src={Data && Data[0]?.image} alt={Data && Data[0]?.title} onError={placeholderImage} />
                      <div className='seeAllPhoto'>
                        {galleryPhotos && galleryPhotos.length > 0 ? (
                          <button onClick={() => openLightbox(0)}>
                            <FaImages size={25} style={{ color: '#fff' }} />
                          </button>
                        ) : null}
                      </div>
                      <LightBox
                        photos={galleryPhotos}
                        viewerIsOpen={viewerIsOpen}
                        currentImage={currentImage}
                        onClose={closeLightbox}
                        setCurrentImage={setCurrentImage}
                        title_image={Data && Data[0]?.image}
                      />
                    </div>
                    {Data && Data[0]?.content_value ? (
                      <div className='text-black'>
                        <div
                          id='vps-btnVideo'
                          onClick={() => {
                            handleVideoUrl(Data && Data[0]?.content_value);
                            TypeUrl(Data && Data[0]?.type);
                          }}
                        >
                          <BsFillPlayFill id='vps-btnVideo-logo' fill='white' size={50} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {/* <CarouselSection images={Data[0].image}/> */}

                  <div id='nv-functions' className='custom-font'>
                    <div id='nv-functions-left' className='col-md-10 col-12'>
                      <Form.Label id='nv-font-lable'>{translate('fontsize')}</Form.Label>
                      <Form.Range
                        id='nv-FontRange'
                        min={14}
                        max={24}
                        step={2}
                        value={FontSize}
                        onChange={e => setFontSize(e.target.value)}
                      />
                      <div className='d-flex justify-content-between'>
                        <Form.Label id='nv-FontRange-labels'>14px</Form.Label>
                        <Form.Label id='nv-FontRange-labels'>16px</Form.Label>
                        <Form.Label id='nv-FontRange-labels'>18px</Form.Label>
                        <Form.Label id='nv-FontRange-labels'>20px</Form.Label>
                        <Form.Label id='nv-FontRange-labels'>22px</Form.Label>
                        <Form.Label id='nv-FontRange-labels'>24px</Form.Label>
                      </div>
                      {/* <h1>{FontSize}</h1> */}
                    </div>
                    {isLogin() ? (
                      <div id='nv-functions-right' className='col-md-2 col-12'>
                        <div id='nv-function-pair'>
                          <button
                            id='nv-function'
                            className='btn'
                            onClick={() => setbookmarkData(Data && Data[0]?.id, !Bookmark ? 1 : 0)}
                          >
                            {Data[0].bookmark !== 0 ? <BsFillBookmarkFill size={23} /> : <BsBookmark size={23} />}
                          </button>
                          <p id='nv-function-text'>{translate('saveLbl')}</p>
                        </div>
                        <div id='nv-function-pair'>
                          <button
                            id='nv-function'
                            className='btn'
                            onClick={() => setLikeDislikeData(Data && Data[0]?.id, !Like ? 1 : 0)}
                          >
                            {Like ? <AiFillLike size={23} /> : <AiOutlineLike size={23} />}
                          </button>

                          <p id='nv-function-text'>{translate('likes')}</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <p
                      id='nv-description'
                      style={{ fontSize: `${FontSize}px`, wordWrap: 'break-word' }}
                      dangerouslySetInnerHTML={{ __html: Data && Data[0]?.description }}
                    ></p>
                  </div>

                  {/* tags */}
                  {Data[0].tag_name ? (
                    <div className='tags_section_outer'>
                      <div className='inner_tag'>
                        <div className='tag_icon'>
                          <GoTag />
                        </div>
                        <div className='tag_name'>{translate('tagLbl')} :</div>
                        <div className='tag_data'>
                          <span className='tags_section'>
                            {
                              Data[0].tag.map((tag, index) => {
                                return <p
                                  key={index}
                                  className='mb-0 me-2 new-view-tags'
                                  onClick={() => router.push(`/tag/${tag.slug}`)}
                                >
                                  {tag.tag_name}
                                </p>
                              })
                            }
                            {/* {tagSplit(Data[0].tag_name).map((tag, index) => (
                              <p
                                key={index}
                                className='mb-0 me-2 new-view-tags'
                                onClick={() => router.push(`/tag/${tag.slug}`)}
                              >
                                {tag}
                              </p>
                            ))} */}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* // <p id='nv-description' dangerouslySetInnerHTML={{__html: Data[0].description}}></p> */}
                  {/* <CommentSection Nid={Data && Data[0]?.id} /> */}
                  {SettingsData && SettingsData.comments_mode === '1' ? (
                    <CommentsView Nid={Data && Data[0]?.id} />
                  ) : (
                    null
                  )}
                </div>

                <div id='nv-right-section' className='col-lg-4 col-12'>
                  {Data && Data[0]?.category_id ? (
                    <RelatedNewsSection  newsSlug={newsSlug}
                    categorySlug={Data && Data[0]?.category?.slug}
                    />
                  ) : null}
                  <TagsSection />
                  {
                    isLogin() ?
                      <Surveys /> : null
                  }
                </div>
              </div>
              <VideoPlayerModal
                show={VideomodalShow}
                onHide={() => setVideoModalShow(false)}
                // backdrop="static"
                keyboard={false}
                url={Video_url}
                type_url={typeUrl}
              // title={Data[0].title}
              />
              <SignInModal
                setIsLogout={setIsLogout}
                setisloginloading={setisloginloading}
                show={modalShow}
                setLoginModalShow={setModalShow}
                onHide={() => setModalShow(false)}
              />
              {/* ad spaces */}
              {sponsoredads && sponsoredads.ad_spaces_bottom ? (
                <>
                  <AdSpaces ad_url={sponsoredads && sponsoredads.ad_spaces_bottom.ad_url} ad_img={sponsoredads && sponsoredads.ad_spaces_bottom.web_ad_image} style_web='' />

                </>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <>
          {NoDataFound()}

        </>
      )}
    </Layout>
  );
};

export default News;
