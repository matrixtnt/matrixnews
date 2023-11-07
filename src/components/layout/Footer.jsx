'use client'
import React, { useState, useEffect } from 'react'
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaTwitterSquare } from 'react-icons/fa'
import Link from 'next/link'
import moment from 'moment/moment'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { categoriesApi } from '../../store/actions/campaign'
import { translate } from '../../utils'
import { webSettingsData } from '../../store/reducers/websettingsReducer'

const Footer = () => {
  const [Data, setData] = useState([])

  const currentLanguage = useSelector(selectCurrentLanguage)

  const websettings = useSelector(webSettingsData)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    categoriesApi(
      '0',
      '8',
      currentLanguage.id,
      response => {
        const responseData = response.data
        setData(responseData)
      },
      error => {
        // console.log(error);
      }
    )
  }, [currentLanguage])

  return (
    <>
      <section id='footer'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-12'>
              <div className='News'>
                <Link href='/'>
                  <img id='NewsLogo' src={websettings && websettings.web_footer_logo} alt='' />
                </Link>
              </div>
              <div className='Lorem-text'>
                <p className='lorem'>
                  {websettings && websettings.web_footer_description}
                  <br />
                </p>
              </div>
            </div>
            <div className='col-lg-3 col-12'>
              <p id='footer-nav'>{translate('newscategories')}</p>
              {Data && Data.length > 0 ? (
                <ul className='newscate'>
                  {Data.map((element, index) => {
                    return (
                      <li key={index}>
                        <Link href={`/categories-news/${element.id}`} onClick={scrollToTop}>
                          {element.category_name}{' '}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </div>

            <div className='col-lg-3 col-12'>
              <p id='footer-nav'>{translate('usefulllinks')}</p>
              <ul className='useL'>
                <li className='nav-item'>
                  <Link href='/' onClick={() => scrollToTop()}>
                    {translate('home')}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href='/live-news' onClick={() => scrollToTop()}>
                    {translate('livenews')}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href='/all-breaking-news' onClick={() => scrollToTop()}>
                    {translate('breakingnews')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className='col-lg-3 col-12'>
              <p id='footer-nav'>{translate('followus')} </p>
              <div className='social_media'>
                {process.env.NEXT_PUBLIC_FACEBOOK ? (
                  <a
                    target='_blank'
                    id='social_platforms'
                    className='btn btn-outline-white'
                    href={process.env.NEXT_PUBLIC_FACEBOOK}
                    rel='noreferrer'
                  >
                    <FaFacebookSquare /> {translate('facebook')}
                  </a>
                ) : null}
                {process.env.NEXT_PUBLIC_INSTAGRAM ? (
                  <a
                    target='_blank'
                    id='social_platforms'
                    className='btn btn-outline-white'
                    href={process.env.NEXT_PUBLIC_INSTAGRAM}
                    rel='noreferrer'
                  >
                    <FaInstagram /> {translate('instagram')}
                  </a>
                ) : null}
                {process.env.NEXT_PUBLIC_LINKEDIN ? (
                  <a
                    target='_blank'
                    id='social_platforms'
                    className='btn btn-outline-white'
                    href={process.env.NEXT_PUBLIC_LINKEDIN}
                    rel='noreferrer'
                  >
                    <FaLinkedin /> {translate('linkedin')}
                  </a>
                ) : null}
                {process.env.NEXT_PUBLIC_TWITTER ? (
                  <a
                    target='_blank'
                    id='social_platforms'
                    className='btn btn-outline-white'
                    href={process.env.NEXT_PUBLIC_TWITTER}
                    rel='noreferrer'
                  >
                    <FaTwitterSquare /> {translate('twitter')}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <hr className='hr_line' />

          <div className='d-flex copyright' id='copyright1'>
            <p id='footer-Copyright' className='h6 p-2'>
              {translate('copyright')} © {moment().year()} {translate('allrights')}{' '}
              {websettings && websettings.web_name}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
