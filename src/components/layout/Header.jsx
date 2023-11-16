'use client'
import React, { useEffect, useState } from 'react'
import { BiBell, BiUserCircle } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button'
import { signOut } from 'firebase/auth'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Dropdown from 'react-bootstrap/Dropdown'
import {
  loadLanguageLabels,
  loadLanguages,
  selectCurrentLanguage,
  selectLanguages,
  setCurrentLanguage
} from '../../store/reducers/languageReducer'
import { useSelector } from 'react-redux'
import { categoriesApi } from '../../store/actions/campaign'
import {
  getSiblings,
  slideToggle,
  slideUp,
  getClosest,
  isLogin,
  translate,
  truncateText,
  profileimgError
} from '../../utils/index'
import { logoutUser, selectUser } from '../../store/reducers/userReducer'
import SignInModal from '../auth/SignInModal'
import { toast } from 'react-toastify'
import { webSettingsData } from '../../store/reducers/websettingsReducer'
import { counterData, loadNotification, loaduserNotification } from '../../store/reducers/notificationbadgeReducer'
import MobilesideBar from '../mobileNavbar/MobilesideBar'
import { settingsData } from '../../store/reducers/settingsReducer'
import { AiOutlineSearch } from 'react-icons/ai'
import { SetSearchPopUp } from '../../store/stateSlice/clickActionSlice'
import { store } from '../../store/store'
import FirebaseData from 'src/utils/Firebase'
import { useQuery } from '@tanstack/react-query'
import { getUserByIdApi } from 'src/hooks/getuserbyId'
import { access_key, getUser } from 'src/utils/api'

const Header = () => {
  const userData = useSelector(selectUser)
  const { authentication } = FirebaseData()
  const [Data, setData] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [islogout, setIsLogout] = useState(false) // eslint-disable-next-line
  const [isloginloading, setisloginloading] = useState(true) // eslint-disable-next-line
  const [profileModal, setProfileModal] = useState(false)
  const [isuserRole, setisuserRole] = useState(false)
  let user = getUser()
  const navigate = useRouter()

  const counterBadgeData = useSelector(counterData)
  // console.log(counterBadgeData)
  const languagesData = useSelector(selectLanguages)

  const currentLanguage = useSelector(selectCurrentLanguage)

  const websettings = useSelector(webSettingsData)

  const settings = useSelector(settingsData)

  // user roles api call
  const getUserById = async () => {
    try {
      const { data } = await getUserByIdApi.getUserById({
        access_key: access_key,
        user_id: user
      })
      const Role = data.data.map(elem => elem.role)
      if (Role[0] !== '0') {
        setisuserRole(true)
      }
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const {} = useQuery({
    queryKey: ['userRoles'],
    queryFn: getUserById
  })

  useEffect(() => {
    // get categories
    categoriesApi(
      '0',
      '16',
      currentLanguage.id,
      response => {
        setData(response.data)
        // console.log(Data)
      },
      error => {
        if (error === 'No Data Found') {
          setData('')
        }
      }
    )

    // language laod
    loadLanguages(
      response => {
        if (currentLanguage.code == null) {
          // eslint-disable-next-line
          // eslint-disable-next-line
          let index =
            response &&
            response.data.filter(data => {
              if (data.code === settings.default_language[0].code) {
                return { code: data.code, name: data.language, id: data.id }
              }
            })

          setCurrentLanguage(index[0].language, index[0].code, index[0].id)
        }
      },
      error => {
        console.log(error)
      }
    )

    // eslint-disable-next-line
  }, [currentLanguage])

  // language change
  const languageChange = (name, code, id) => {
    loadLanguageLabels(code)
    setCurrentLanguage(name, code, id)
  }

  useEffect(() => {
    if (userData.data !== null) {
      setIsLogout(true)
      setisloginloading(false)
    } else {
      setIsLogout(false)
      setisloginloading(true)
    } // eslint-disable-next-line
  }, [])

  // user notification
  const getusernotification = () => {
    loaduserNotification(
      '0',
      '',
      response => {},
      error => {}
    )
  }

  const getnotification = () => {
    loadNotification(
      '0',
      '',
      response => {},
      error => {}
    )
  }

  useEffect(() => {
    // Make API calls here based on route change
    if (window.location.pathname === '/') {
      getusernotification()
    } else if (window.location.pathname === '/persnol-notification') {
      getusernotification()
    } else if (window.location.pathname === '/news-notification') {
      getnotification()
    } // eslint-disable-next-line
  }, [window.location.pathname, isLogin()])

  const logout = () => {
    handleClose()

    confirmAlert({
      title: 'Logout',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            signOut(authentication)
              .then(() => {
                logoutUser()
                window.recaptchaVerifier = null
                setIsLogout(false)
                navigate.push('/')
              })
              .catch(error => {
                toast.error(error)
                // An error happened.
              })
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }

  const onClickHandler = e => {
    const target = e.currentTarget
    const parentEl = target.parentElement
    if (parentEl?.classList.contains('menu-toggle') || target.classList.contains('menu-toggle')) {
      const element = target.classList.contains('icon') ? parentEl : target
      const parent = getClosest(element, 'li')
      const childNodes = parent.childNodes
      const parentSiblings = getSiblings(parent)
      parentSiblings.forEach(sibling => {
        const sibChildNodes = sibling.childNodes
        sibChildNodes.forEach(child => {
          if (child.nodeName === 'UL') {
            slideUp(child, 1000)
          }
        })
      })
      childNodes.forEach(child => {
        if (child.nodeName === 'UL') {
          slideToggle(child, 1000)
        }
      })
    }
  }

  let userName = ''

  const checkUserData = userData => {
    if (userData.data && userData.data.name !== '') {
      return (userName = userData.data.name)
    } else if (userData.data && userData.data.email !== '') {
      return (userName = userData.data.email)
    } else if (userData.data && (userData.data.mobile !== null || userData.data.mobile !== '')) {
      return (userName = userData.data.mobile)
    }
  }

  // set rtl
  const selectedLang = languagesData && languagesData.find(lang => lang.code === currentLanguage.code)
  useEffect(() => {
    if (selectedLang && selectedLang.isRTL === '1') {
      console.log('RTLLL', document.documentElement.dir)
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = `${selectedLang && selectedLang.code}`
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = `${selectedLang && selectedLang.code}`
    }
  }, [selectedLang])

  const searchPopUp = useSelector(state => state.clickAction.searchPopUp)
  const actionSearch = () => {
    store.dispatch(SetSearchPopUp(!searchPopUp))
  }

  return (
    <div className='Newsbar'>
      <div className='container'>
        <div className='navbar_content'>
          <div id='News-logo' className='News-logo'>
            <Link href='/' activeclassname='active' exact='true'>
              <img id='NewsLogo' src={websettings && websettings.web_header_logo} alt='logo' />
            </Link>
          </div>

          <div className='Manu-links'>
            <ul className=''>
              <li id='NavHover' className='nav-item'>
                <b>
                  <Link
                    id='nav-links'
                    activeclassname='active'
                    exact='true'
                    className='link-color'
                    aria-current='page'
                    href='/'
                  >
                    {translate('home')}
                  </Link>
                </b>
              </li>
              {settings && settings.live_streaming_mode === '1' ? (
                <li id='NavHover' className='nav-item'>
                  <b>
                    <Link
                      id='nav-links'
                      activeclassname='active'
                      exact='true'
                      className='link-color'
                      aria-current='page'
                      href='/live-news'
                    >
                      {translate('livenews')}
                    </Link>
                  </b>
                </li>
              ) : null}
              {settings && settings.breaking_news_mode === '1' ? (
                <li id='NavHover' className='nav-item'>
                  <b>
                    <Link
                      id='nav-links'
                      activeclassname='active'
                      exact='true'
                      className='link-color'
                      aria-current='page'
                      href='/all-breaking-news'
                    >
                      {translate('breakingnews')}
                    </Link>
                  </b>
                </li>
              ) : null}
              <li id='NavHover' className='nav-item'>
                <b>
                  <Link
                    id='nav-links'
                    activeclassname='active'
                    exact='true'
                    className='link-color'
                    aria-current='page'
                    href='/more-pages'
                  >
                    {translate('More Pages')}
                  </Link>
                </b>
              </li>
              <li id='Nav-btns' className='d-flex'>
                {isLogin() && checkUserData(userData) ? (
                  <Dropdown>
                    <Dropdown.Toggle id='btnSignIn' className='me-2'>
                      <img
                        className='profile_photo'
                        src={userData.data && userData.data.profile}
                        onError={profileimgError}
                        alt='profile'
                      />
                      {truncateText(userName, 10)}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ backgroundColor: '#1A2E51' }}>
                      <Dropdown.Item id='btnLogout'>
                        <Link id='btnBookmark' href='/bookmark'>
                          {translate('bookmark')}
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item id='btnLogout'>
                        <Link id='btnBookmark' href='/user-based-categories'>
                          {translate('managePreferences')}
                        </Link>
                      </Dropdown.Item>

                      {isuserRole ? (
                        <>
                          <Dropdown.Item id='btnLogout'>
                            <Link id='btnBookmark' href='/create-news'>
                              {translate('createNewsLbl')}
                            </Link>
                          </Dropdown.Item>

                          <Dropdown.Item id='btnLogout'>
                            <Link id='btnBookmark' href='/manage-news'>
                              {translate('manageNewsLbl')}
                            </Link>
                          </Dropdown.Item>
                        </>
                      ) : null}
                      <Dropdown.Item id='btnLogout'>
                        <Link id='btnBookmark' href='/profile-update'>
                          {translate('update-profile')}
                        </Link>
                      </Dropdown.Item>
                      {/*<Dropdown.Item id='btnLogout' onClick={changePassword}>*/}
                      {/*    Change Password*/}
                      {/*</Dropdown.Item>*/}
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={logout} id='btnLogout' className=''>
                        {translate('logout')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Button
                    variant='danger'
                    onClick={() => setModalShow(true)}
                    id='btnSignIn'
                    className='me-2'
                    type='button'
                  >
                    <BiUserCircle size={23} id='btnLogo' />
                    {translate('loginLbl')}
                  </Button>
                )}

                {/* notifiaction */}
                {isLogin() ? (
                  <Link href='/personal-notification' id='btnNotification' type='button' className='btn'>
                    <BiBell size={23} />
                    <span className='noti_badge_data'>{counterBadgeData && counterBadgeData.counter}</span>
                  </Link>
                ) : null}

                {/* searchbar */}
                <div id='btnNotification' type='button' className='btn ms-2' onClick={actionSearch}>
                  <AiOutlineSearch size={23} />
                </div>
              </li>
            </ul>

            <SignInModal
              setIsLogout={setIsLogout}
              setisloginloading={setisloginloading}
              show={modalShow}
              setLoginModalShow={setModalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <div className='hamburger-manu'>
            {['end'].map((placement, idx) => (
              <MobilesideBar
                key={idx}
                isuserRole={isuserRole}
                languageChange={languageChange}
                placement={placement}
                name={placement}
                logout={logout}
                onClickHandler={onClickHandler}
                Data={Data}
                modalShow={modalShow}
                setModalShow={setModalShow}
                islogout={islogout}
                setIsLogout={setIsLogout}
                handleShow={handleShow}
                show={show}
                handleClose={handleClose}
                ProfileModal={setProfileModal}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
