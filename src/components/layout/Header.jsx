'use client'
import React, { useEffect, useState } from 'react'
import { BiBell, BiUserCircle } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button'
import { getAuth, signOut } from 'firebase/auth'
import {
  loadLanguageLabels,
  loadLanguages,
  selectCurrentLanguage,
  selectLanguages,
  setCurrentLanguage
} from '../../store/reducers/languageReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSiblings,
  slideToggle,
  slideUp,
  getClosest,
  isLogin,
  translate,
  truncateText,
  profileimgError,
  profileimg,
  placeholderImage
} from '../../utils/index'
import { getUserManageData, loadGetUserByIdApi, logoutUser, selectUser } from '../../store/reducers/userReducer'
import SignInModal from '../auth/SignInModal'
import MobilesideBar from '../mobileNavbar/MobilesideBar'
import { settingsData } from '../../store/reducers/settingsReducer'
import { AiOutlineSearch } from 'react-icons/ai'
import { SetSearchPopUp } from '../../store/stateSlice/clickActionSlice'
import { store } from '../../store/store'
import FirebaseData from 'src/utils/Firebase'
import { useQuery } from '@tanstack/react-query'
import { getUserByIdApi } from 'src/hooks/getuserbyId'
import { getUser } from 'src/utils/api'
import { CategoriesApi } from 'src/hooks/categoriesApi'
import toast from 'react-hot-toast'
import { accountDeleteApi } from 'src/store/actions/campaign'
import { Modal } from 'antd'
import { loadCatNavData } from 'src/store/reducers/CatNavReducers'
import { checkNewsDataSelector } from 'src/store/reducers/CheckNewsDataReducer'
import MorePagesDropDown from '../view/Dropdowns/MorePagesDropDown'
import { usePathname } from 'next/navigation';
import ProfileDropDown from '../view/Dropdowns/ProfileDropDown'
import { themeSelector } from 'src/store/reducers/CheckThemeReducer'

const { confirm } = Modal

const Header = () => {
  const userData = useSelector(selectUser)
  const userRoleStatus = useSelector(getUserManageData)
  const { authentication } = FirebaseData()
  const [modalShow, setModalShow] = useState(false)
  const [islogout, setIsLogout] = useState(false) // eslint-disable-next-line
  const [isloginloading, setisloginloading] = useState(true) // eslint-disable-next-line
  const [profileModal, setProfileModal] = useState(false)
  const [isuserRole, setisuserRole] = useState(false)
  let user = getUser()
  const router = usePathname();
  const navigate = useRouter()
  const auth = getAuth()

  const dispatch = useDispatch()

  const languagesData = useSelector(selectLanguages)

  const currentLanguage = useSelector(selectCurrentLanguage)

  const settings = useSelector(settingsData)

  const checkNewsData = useSelector(checkNewsDataSelector);

  const darkThemeMode = useSelector(themeSelector);

  // language change
  const languageChange = (name, code, id) => {
    loadLanguageLabels({ code: code })
    setCurrentLanguage(name, code, id)
  }

  useEffect(() => {
    loadLanguages({
      onSuccess: response => {
        if (currentLanguage?.code === null) {
          // eslint-disable-next-line
          // eslint-disable-next-line
          let index =
            response &&
            response.data.filter(data => {
              if (data.code === settings.default_language.code) {
                return { code: data.code, name: data.language, id: data.id }
              }
            })

          setCurrentLanguage(index[0].language, index[0].code, index[0].id)
        }
      },
      onError: error => {
        console.log(error)
      }
    })
  }, [currentLanguage])

  useEffect(() => {
    // console.log(userData.data.role, 'userData')
    if (userData.data !== null) {
      setIsLogout(true)
      setisloginloading(false)
    } else {
      setIsLogout(false)
      setisloginloading(true)
    } // eslint-disable-next-line

  }, [])


  const logout = async () => {
    confirm({
      title: 'Logout',
      content: translate('logoutTxt'),
      centered: true,
      async onOk() {
        try {
          await new Promise((resolve, reject) => {
            signOut(authentication)
              .then(() => {
                logoutUser()
                window.recaptchaVerifier = null
                setIsLogout(false)
                navigate.push('/')
                toast.success(translate('loginOutMsg'))
                resolve() // Resolve the promise when signOut is successful
              })
              .catch(error => {
                toast.error(error)
                reject(error) // Reject the promise if there's an error
              })
          })
        } catch (e) {
          console.log('Oops errors!')
        }
      },
      onCancel() { }
    })
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      setIsMenuOpen(!isMenuOpen);
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
  const selectedLang = languagesData && languagesData.find(lang => lang.code === currentLanguage?.code)
  useEffect(() => {
    if (selectedLang && selectedLang.isRTL === 1) {
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

  // delete account
  const deleteAccount = async e => {
    e.preventDefault()
    confirm({
      title: translate('deleteAcc'),
      content: (
        <div>
          <p className='fw-bold'>{translate('deleteAccWarning')}</p>
          <li className='fw-bold' style={{ listStyle: 'disc' }}>{translate('profileInfo')}</li>
          <li className='fw-bold' style={{ listStyle: 'disc' }}>{translate('settings')}</li>
          <li className='fw-bold' style={{ listStyle: 'disc' }}>{translate('associatedContent')}</li>
        </div>
      ),
      centered: true,
      okText: translate('deleteTxt'),
      cancelText: translate('cancelBtn'),
      okButtonProps: {
        style: { background: 'red', borderColor: 'red' },
      },
      async onOk() {
        try {
          await new Promise((resolve, reject) => {
            const user = auth.currentUser

            if (user) {
              user
                .delete()
                .then(() => {
                  accountDeleteApi({
                    onSuccess: res => {
                      signOut(authentication)
                        .then(() => {
                          logoutUser()
                          window.recaptchaVerifier = null
                          setIsLogout(false)
                          navigate.push('/')
                          toast.success(translate('deletedAcc'))
                        })
                        .catch(error => {
                          toast.error(error.message || 'An error occurred while signing out.')
                        })
                    },
                    onError: err => {
                      console.log(err)
                    }
                  })
                })
                .catch(error => {
                  console.error('Error deleting user account:', error)

                  // Check if the error is "auth/requires-recent-login"
                  if (error.code === 'auth/requires-recent-login') {
                    toast.error('Authentication error: Please log in again before deleting your account.')
                  } else {
                    toast.error('An error occurred while deleting user account.')
                  }
                })
            }
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          })
        } catch (error) {
          console.log(error)
        }
      },
      onCancel() { }
    })
  }

  return (
    <div className='Newsbar'>
      <div className='container'>
        <div className='navbar_content'>
          <div id='News-logo' className='News-logo'>
            <Link href='/' activeclassname='active' exact='true' title={settings && settings?.web_setting?.web_name}>
              <img id='NewsLogo' src={settings && darkThemeMode ? settings?.web_setting?.dark_header_logo : settings?.web_setting?.light_header_logo} onError={placeholderImage} alt='logo' />
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
                    aria-current='page'
                    href='/'
                    className={`headerDropdownItem link-color ${router === '/' ? 'navLinkActive' : ''}`}
                    title={translate('home')}
                  >
                    {translate('home')}
                  </Link>
                </b>
              </li>
              <li id='NavHover' className='nav-item'>
                <b>
                  <Link
                    id='nav-links'
                    activeclassname='active'
                    exact='true'
                    className={`headerDropdownItem link-color ${router === '/about-us' ? 'navLinkActive' : ''}`}
                    aria-current='page'
                    // href={`/about-us`}
                    href={{ pathname: `/about-us`, query: { language_id: currentLanguage?.id } }}
                    title={translate('aboutus')}
                  >
                    {translate('aboutus')}
                  </Link>
                </b>
              </li>
              {settings && settings.live_streaming_mode === '1' && checkNewsData && checkNewsData?.data?.isLiveNewsData ? (
                <li id='NavHover' className='nav-item'>
                  <b>
                    <Link
                      id='nav-links'
                      activeclassname='active'
                      exact='true'
                      className={`headerDropdownItem link-color ${router === '/live-news' ? 'navLinkActive' : ''}`}
                      aria-current='page'
                      href={{ pathname: `/live-news`, query: { language_id: currentLanguage?.id } }}
                      title={translate('livenews')}
                    >
                      {translate('livenews')}
                    </Link>
                  </b>
                </li>
              ) : null}
              {settings && settings.breaking_news_mode === '1' && checkNewsData && checkNewsData?.data?.isBreakingNewsData ? (
                <li id='NavHover' className='nav-item'>
                  <b>
                    <Link
                      id='nav-links'
                      activeclassname='active'
                      exact='true'
                      className={`headerDropdownItem link-color ${router === '/all-breaking-news' ? 'navLinkActive' : ''}`}
                      aria-current='page'
                      href={{ pathname: `/all-breaking-news`, query: { language_id: currentLanguage?.id } }}
                      title={translate('breakingnews')}
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
                    className={`headerDropdownItem link-color ${router === '/video-news' ? 'navLinkActive' : ''}`}
                    aria-current='page'
                    href={{ pathname: `/video-news`, query: { language_id: currentLanguage?.id } }}
                    title={translate('videosLbl')}
                  >
                    {translate('videosLbl')}
                  </Link>
                </b>
              </li>
              <li id='NavHover' className='nav-item'>
                <b>
                  <Link
                    id='nav-links'
                    activeclassname='active'
                    exact='true'
                    className={`headerDropdownItem link-color ${router === '/contact-us' ? 'navLinkActive' : ''}`}
                    aria-current='page'
                    href={{ pathname: `/contact-us`, query: { language_id: currentLanguage?.id } }}
                    title={translate('contactus')}
                  >
                    {translate('contactus')}
                  </Link>
                </b>
              </li>

              <li id='NavHover' className='nav-item'>
                <MorePagesDropDown />
              </li>

              <li id='Nav-btns' className='profileDropDownWrapper'>
                {isLogin() && checkUserData(userData) ? (
                  <>
                    <ProfileDropDown userName={userName} userData={userData} userRole={userRoleStatus} isLogin={isLogin} profileimg={profileimg} deleteAccount={deleteAccount} profileimgError={profileimgError} logout={logout} checkUserData={checkUserData(userData)} />
                  </>
                ) : (
                  <Button
                    variant='danger'
                    onClick={() => setModalShow(true)}
                    id='btnSignIn'
                    className='me-2 commonBtn'
                    type='button'
                  >
                    <BiUserCircle size={23} id='btnLogo' />
                    {translate('loginLbl')}
                  </Button>
                )}

                {/* notifiaction */}
                {isLogin() ? (
                  <Link href='/personal-notification' id='btnNotification' type='button' className='btn' title='notification'>
                    <BiBell size={23} />
                    <span className='noti_badge_data'></span>
                  </Link>
                ) : null}

                {/* searchbar */}
                <div id='btnNotification' type='button' className='btn' onClick={actionSearch}>
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
                languageChange={languageChange}
                placement={placement}
                name={placement}
                logout={logout}
                deleteAccount={deleteAccount}
                onClickHandler={onClickHandler}
                isMenuOpen={isMenuOpen}
                // Data={Data}
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
