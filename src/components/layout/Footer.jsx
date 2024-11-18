'use client'
import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'
import moment from 'moment/moment'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { placeholderImage, translate } from '../../utils'
import { settingsData } from '../../store/reducers/settingsReducer'
import { CategoriesApi } from 'src/hooks/categoriesApi'
import { useQuery } from '@tanstack/react-query'
import { FaLocationDot, FaSquareXTwitter } from 'react-icons/fa6'
import { catNavSelector, categoriesCacheData } from 'src/store/reducers/CatNavReducers'
import { checkNewsDataSelector } from 'src/store/reducers/CheckNewsDataReducer'
import { IoMdMail } from 'react-icons/io'
import { MdCall } from 'react-icons/md'
import Image from 'next/image'
import { IoLogoRss } from "react-icons/io";

import playStore from '../../../public/assets/images/playStore.svg'
import appleStore from '../../../public/assets/images/appleStore.svg'
import { themeSelector } from 'src/store/reducers/CheckThemeReducer'

const Footer = () => {

  const settings = useSelector(settingsData)

  const categories = useSelector(categoriesCacheData)

  const categoriesData = categories

  const checkNewsData = useSelector(checkNewsDataSelector)

  const darkThemeMode = useSelector(themeSelector);

  const currentLanguage = useSelector(selectCurrentLanguage)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section id='footer'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-12'>
              <div className='News'>
                <Link href='/' title={settings && settings?.web_setting?.web_name}>
                  <img id='NewsLogo' src={darkThemeMode ? settings && settings?.web_setting?.dark_footer_logo : settings && settings?.web_setting?.light_footer_logo} onError={placeholderImage} alt='footer logo image' />
                </Link>
              </div>
              <div className='Lorem-text'>
                <p className='lorem'>
                  {settings && settings?.web_setting?.web_footer_description}
                  <br />
                </p>
              </div>
              <div className='footerMediasWrapper'>
                <span className='followUs'>{translate('followus')}</span>
                <div className='mediaIconsWrapper'>
                  {
                    settings?.social_media?.length > 0 && settings?.social_media?.map((data) => {
                      return <Link
                        target='_blank'
                        title='social
                          -media'
                        className='btn btn-outline-white'
                        href={data?.link}
                        rel='noreferrer'
                        key={data?.id}
                      >
                        <img src={data?.image} alt="social-media-icon" className='socialMediaIcon' onError={placeholderImage} />
                      </Link>

                    })
                  }
                  <Link href={'/rss-feed'} title='rss-feed'>
                    <IoLogoRss className='rssIcon'/>
                  </Link>
                </div>
              </div>
            </div>

            <div className='col-lg-3 col-12 navigationWrapper'>
              <p id='footer-nav'>{translate('navigations')}</p>
              <ul className='useL'>
                <li className='nav-item'>
                  <Link href='/' onClick={() => scrollToTop()} title={translate('home')}>
                    {translate('home')}
                  </Link>
                </li>
                {
                  settings && settings.live_streaming_mode === '1' && checkNewsData && checkNewsData?.data?.isLiveNewsData ?
                    <li className='nav-item'>
                      <Link href={{ pathname: `/live-news`, query: { language_id: currentLanguage?.id } }} onClick={() => scrollToTop()} title={translate('livenews')}>
                        {translate('livenews')}
                      </Link>
                    </li>
                    : null
                }

                {
                  settings && settings.breaking_news_mode === '1' && checkNewsData && checkNewsData?.data?.isBreakingNewsData ?
                    <li className='nav-item'>
                      <Link href={{ pathname: `/all-breaking-news`, query: { language_id: currentLanguage?.id } }}  onClick={() => scrollToTop()} title={translate('breakingnews')}>
                        {translate('breakingnews')}
                      </Link>
                    </li>
                    : null
                }
                <li className='nav-item'>
                  <Link href={{ pathname: `/about-us`, query: { language_id: currentLanguage?.id } }} onClick={() => scrollToTop()} title={translate('aboutus')}>
                    {translate('aboutus')}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href={{ pathname: `/contact-us`, query: { language_id: currentLanguage?.id } }} onClick={() => scrollToTop()} title={translate('contactus')}>
                    {translate('contactus')}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href={{ pathname: `/video-news`, query: { language_id: currentLanguage?.id } }} onClick={() => scrollToTop()} title={translate('videosLbl')}>
                  {translate('videosLbl')}
                  </Link>
                </li>

              </ul>
            </div>

            {/* <div className='col-lg-3 col-12'>
              <p id='footer-nav'>{translate('contactinfo')}</p>
              <ul className='useL contactInfo'>
                <li className='nav-item'>
                  <a>
                    <span className='contactIcons'><FaLocationDot /></span>
                    New S.Sales Road,Toronto,CA,65040
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    target='_blank'
                    className=''
                    href={process.env.NEXT_PUBLIC_FACEBOOK}
                    rel='noreferrer'
                  >
                    <span className='contactIcons'><IoMdMail /></span>
                    newsweb@gmail.com
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    target='_blank'
                    className=''
                    href={process.env.NEXT_PUBLIC_FACEBOOK}
                    rel='noreferrer'
                  >
                    <span className='contactIcons'><MdCall /></span>
                    0123456789
                  </a>
                </li>


              </ul>
            </div> */}
            {categoriesData && categoriesData.length > 0 ? (
              <div className='col-lg-3 col-12'>
                <p id='footer-nav'>{translate('categories')}</p>
                <ul className='newscate'>
                  {categoriesData.map((element, index) => {
                    return (
                      // element.sub_categories.length > 0 ? (
                      <li key={index}>
                        <Link
                          href={{
                            pathname: `/categories-news/${element.slug}`,
                            // query: {
                            //   category_id: element.id
                            // }
                          }}
                          title={element.category_name}
                          onClick={scrollToTop}
                        >
                          {element.category_name}{' '}
                        </Link>
                      </li>
                      // ): null
                    )
                  })}
                </ul>
              </div>
            ) : null}

            {
              settings && settings?.web_setting?.android_app_link || settings && settings?.web_setting?.ios_app_link ?

                <div className='col-lg-3 col-12'>
                  <p id='footer-nav'>{translate('downloadapp')}</p>
                  <ul className='useL contactInfo'>
                    <li className='nav-item magicofapp'>
                      {translate('magicofapp')}
                    </li>

                    <div className='appWrapper'>
                      {
                        settings?.web_setting?.android_app_link ?
                          <Link href={settings?.web_setting?.android_app_link} target='_blank' title='play-store'>
                            <Image src={playStore} height={0} width={0} alt='play-store-img' />
                          </Link> : null
                      }
                      {
                        settings?.web_setting?.ios_app_link ?
                          <Link href={settings?.web_setting?.ios_app_link} target='_blank' title='apple-store'>
                            <Image src={appleStore} height={0} width={0} alt='apple-store-img' />
                          </Link> : null
                      }
                    </div>
                  </ul>
                </div> : null
            }

          </div>
        </div>
        <div className='copyRightWrapper'>
          <div className='container d-flex copyright'>
            <div>
              <p id='footer-Copyright' className='h6 p-2'>
                {translate('copyright')} © {moment().year()} {translate('allrights')}{' '}
                <span className='webName'>{settings && settings?.web_setting?.web_name}</span>
              </p>
            </div>
            <div className='ms-2'>
              <Link
                title={translate('termsandcondition')}
                // href='/policy-page/terms-condition'
                href={{ pathname: `/policy-page/terms-condition`, query: { language_id: currentLanguage?.id } }}
              > {translate('termsandcondition')} |
              </Link>
              <Link
                title={translate('priPolicy')}
                // href='/policy-page/privacy-policy'
                href={{ pathname: `/policy-page/privacy-policy`, query: { language_id: currentLanguage?.id } }}
              >
                {translate('priPolicy')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
