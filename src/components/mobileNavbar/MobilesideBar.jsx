'use client'
import React, { useRef } from 'react'
import { Button, Dropdown, Offcanvas } from 'react-bootstrap'
import { BiBell, BiUserCircle } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { profileimgError, translate, truncateText } from '../../utils'
import Link from 'next/link'
import {
  loadLanguageLabels,
  selectCurrentLanguage,
  selectLanguages,
  setCurrentLanguage
} from '../../store/reducers/languageReducer'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { getUserManageData, selectUser } from '../../store/reducers/userReducer'
import { settingsData } from '../../store/reducers/settingsReducer'
import { AiOutlineSearch } from 'react-icons/ai'
import { SetSearchPopUp } from '../../store/stateSlice/clickActionSlice'
import { store } from '../../store/store'
import usersvg from '../../../public/assets/images/user.svg'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { categoriesCacheData } from 'src/store/reducers/CatNavReducers'
import LanguageDropdown from '../view/Dropdowns/LanguagesDropdown'
import ProfileDropDown from '../view/Dropdowns/ProfileDropDown'
import { usePathname } from 'next/navigation'
import { checkNewsDataSelector } from 'src/store/reducers/CheckNewsDataReducer'
import MorePagesDropDown from '../view/Dropdowns/MorePagesDropDown'
import ThemeToggler from '../view/ThemeToggler'

const MobilesideBar = ({
  name,
  logout,
  deleteAccount,
  onClickHandler,
  modalShow,
  setModalShow,
  islogout,
  setIsLogout,
  handleShow,
  show,
  isMenuOpen,
  handleClose,
  ProfileModal,
  ...props
}) => {
  const userData = useSelector(selectUser)
  const userRoleStatus = useSelector(getUserManageData)

  const router = usePathname();

  const categories = useSelector(categoriesCacheData)

  const currentLanguage = useSelector(selectCurrentLanguage)

  const languagesData = useSelector(selectLanguages)

  const settingsOnOff = useSelector(settingsData)

  const checkNewsData = useSelector(checkNewsDataSelector)

  // console.log('routerPathName => ',navigate)

  // language change
  const languageChange = (name, code, id) => {
    loadLanguageLabels({ code: code })
    setCurrentLanguage(name, code, id)
  }

  const closeRef = useRef()

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

  const searchPopUp = useSelector(state => state.clickAction.searchPopUp)
  const actionSearch = () => {
    store.dispatch(SetSearchPopUp(!searchPopUp))
  }

  const navigate = useRouter()

  const handleSubCategoryChange = (slug) => {
    // console.log(categories.sub_categories)
    if (slug) {
      navigate.push(`/categories-news/sub-category/${slug}`)
      handleClose()
    }
  }

  return (
    <>
      <button className='btn' onClick={handleShow}>
        <GiHamburgerMenu />
      </button>

      <Offcanvas id='Nav-Offcanvas' className='headermodal' show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton ref={closeRef}>
          <Offcanvas.Title>
            <li id='Nav-btns'>
              {islogout && checkUserData(userData) ? (
                <ProfileDropDown userName={userName} userData={userData} userRole={userRoleStatus} isLogin={islogout} profileimg={usersvg.src} profileimgError={profileimgError} logout={logout} checkUserData={checkUserData(userData)} handleClose={handleClose} />
              ) : (
                <Button variant='danger' onClick={() => setModalShow(true)} id='btnSignIn' className='' type='button'>
                  <BiUserCircle size={23} id='btnLogo' />
                  {translate('login')}
                </Button>
              )}
            </li>

            {
              router === '/' && languagesData?.length > 1 ?
                <li id='Nav-btns'>
                  <LanguageDropdown currentLanguage={currentLanguage} languagesData={languagesData} languageChange={languageChange} handleClose={handleClose} />
                </li> : null}
            <li id='Nav-btns'>
              {islogout && checkUserData(userData) ? (
                <Link
                  href='/personal-notification'
                  id='btnNotification'
                  type='button'
                  className='btn'
                  onClick={handleClose}
                  title='notification'
                >
                  <BiBell size={23} />
                  <span className='noti_badge_data'></span>
                </Link>
              ) : null}
            </li>
            {/* searchbar */}
            <li id='Nav-btns' className='mt-2'>
              <div
                id='btnNotification'
                type='button'
                className='btn'
                onClick={() => {
                  actionSearch()
                  handleClose()
                }}
              >
                <AiOutlineSearch size={23} />
              </div>
            </li>
            <li id='Nav-btns'>
              <ThemeToggler />
            </li>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
                  onClick={handleClose}
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
                  href={{ pathname: `/about-us`, query: { language_id: currentLanguage?.id } }}
                  onClick={handleClose}
                  title={translate('aboutus')}
                >
                  {translate('aboutus')}
                </Link>
              </b>
            </li>
            {settingsOnOff && settingsOnOff.live_streaming_mode === '1' && checkNewsData && checkNewsData?.data?.isLiveNewsData ? (
              <li id='NavHover' className='nav-item'>
                <b>
                  <Link
                    id='nav-links'
                    activeclassname='active'
                    exact='true'
                    className={`headerDropdownItem link-color ${router === '/live-news' ? 'navLinkActive' : ''}`}
                    aria-current='page'
                    href={{ pathname: `/live-news`, query: { language_id: currentLanguage?.id } }}
                    onClick={handleClose}
                    title={translate('livenews')}
                  >
                    {translate('livenews')}
                  </Link>
                </b>
              </li>
            ) : null}
            {settingsOnOff && settingsOnOff.breaking_news_mode === '1' && checkNewsData && checkNewsData?.data?.isBreakingNewsData ? (
              <li id='NavHover' className='nav-item'>
                <b>
                  <Link
                    id='nav-links'
                    activeclassname='active'
                    exact='true'
                    className={`headerDropdownItem link-color ${router === '/all-breaking-news' ? 'navLinkActive' : ''}`}
                    aria-current='page'
                    href={{ pathname: `/all-breaking-news`, query: { language_id: currentLanguage?.id } }}
                    onClick={handleClose}
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
                  className={`headerDropdownItem link-color ${router === '/contact-us' ? 'navLinkActive' : ''}`}
                  aria-current='page'
                  href={{ pathname: `/contact-us`, query: { language_id: currentLanguage?.id } }}
                  onClick={handleClose}
                  title={translate('contactus')}
                >
                  {translate('contactus')}
                </Link>
              </b>
            </li>

            <li id='NavHover' className='nav-item'>
              <MorePagesDropDown handleClose={handleClose} />
            </li>
            {settingsOnOff && settingsOnOff.category_mode === '1' ? (
              <li className='nav-item has-children'>
                {categories && categories.length > 0 ? (
                  <span className='menu-toggle' onClick={onClickHandler}>
                    <b>
                      <p id='nav-links' className=''>
                        {translate('categories')}
                      </p>
                    </b>
                    <i className=''>
                      {/* <FaAngleDown /> */}
                      {!isMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </i>
                  </span>
                ) : null}
                <ul className='sub-menu mobile_catogories'>
                  {categories &&
                    categories.map((element, index) => (
                      <li className='nav-item' key={index}>
                        {
                          element?.sub_categories?.length > 0 && settingsOnOff && settingsOnOff.subcategory_mode === '1'?
                            <Dropdown className='subCatdrop'>
                              <Dropdown.Toggle className=''>
                                {element.category_name}<FaAngleDown />
                              </Dropdown.Toggle>

                              <Dropdown.Menu >
                                {
                                  element.sub_categories.map((data, index) => {
                                    return (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => handleSubCategoryChange(data.slug)}
                                      >
                                        {data.subcategory_name}
                                      </Dropdown.Item>
                                    )
                                  })}
                              </Dropdown.Menu>
                            </Dropdown> :
                            <Link
                              className='catNav-links'
                              key={index}
                              href={{
                                pathname: `/categories-news/${element.slug}`,
                                query: {
                                  category_id: element.id
                                }
                              }}
                              onClick={handleClose}
                              title={element.category_name}
                            >
                              {' '}
                              <b>{element.category_name}</b>{' '}
                            </Link>
                        }

                      </li>
                    ))}
                  {/* {categories && categories.length > 10 && (
                    <li className='nav-item'>
                      <Link className='catNav-links' href={'/all-categories'} onClick={handleClose}>
                        {' '}
                        <b>{translate('More >>')}</b>{' '}
                      </Link>
                    </li>
                  )} */}
                </ul>
              </li>
            ) : null}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default MobilesideBar
