'use client'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import cookiesIconLightTheme from '../../../public/assets/images/CookieIcon.svg'
import cookiesIconDarTheme from '../../../public/assets/images/CookieIconDarkTheme.svg'
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/store/reducers/CheckThemeReducer';
import { isLogin } from 'src/utils';
import { selectUser } from 'src/store/reducers/userReducer';

const CookiesComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const darkTheme = useSelector(themeSelector)

  const userData = useSelector(selectUser)

  // console.log('userData => ',userData)



  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

   useEffect(() => {
   const storedUsername = Cookies.get('user-name');
    if (isLogin) {
      console.log('cookiesStoredUsername', storedUsername);
    }
  }, [isLogin,showPopup]);


  const expirationDays = 7;

  const handleAccept = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: expirationDays });
    setShowPopup(false);
    handleSaveData()
  };

  const handleDecline = () => {
    Cookies.set('cookie-consent', 'declined', { expires: expirationDays });
    setShowPopup(false);
  };

  if (!showPopup) return null;

  const handleSaveData = () => {
    Cookies.set('user-name', userData?.data?.name, { expires: expirationDays })
    Cookies.set('user-email', userData?.data?.email, { expires: expirationDays })
    Cookies.set('user-number', userData?.data?.mobile, { expires: expirationDays })
    Cookies.set('user-token', userData?.data?.token, { expires: expirationDays })
    Cookies.set('user-fcmId', userData?.data?.fcm_id, { expires: expirationDays })
    Cookies.set('user-loginType', userData?.data?.type, { expires: expirationDays })
  }



  return (
    <div className='cookiesComponent'>
      <div className="imgWrapper">
        <Image src={darkTheme ? cookiesIconDarTheme : cookiesIconLightTheme} height={0} width={0} />
      </div>

      <div className='content'>
        <span>Do you allow us to use cookies?</span>
        <span>We use cookies to learn where you struggle when you're navigating our website and fix them for your future visit.</span>
      </div>

      <div className="btnsWrapper">
        <button onClick={handleDecline}>Decline Cookies</button>
        <button onClick={handleAccept}>Accept Cookies</button>
      </div>
    </div>
  );
};


export default CookiesComponent;
