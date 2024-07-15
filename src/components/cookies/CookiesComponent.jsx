import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import cookiesIcon from '../../../public/assets/images/Cookie Icon.svg'

const CookiesComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
    setShowPopup(false);
  };

  const handleDecline = () => {
    Cookies.set('cookie-consent', 'declined', { expires: 365 });
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className='cookiesComponent'>
      <div className="imgWrapper">
        <Image src={cookiesIcon} height={0} width={0} />
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
