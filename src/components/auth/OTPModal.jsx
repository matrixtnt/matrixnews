'use client'
import Modal from 'react-bootstrap/Modal'
import photo from '../../../public/assets/images/Login.jpg'
import React, { useEffect, useState } from 'react'
//otp
import OTPInput from 'react-otp-input'
import { translate } from '../../utils'

//firebase
import FirebaseData from '../../utils/Firebase'
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { loadMobileType, register } from '../../store/reducers/userReducer'
import { useSelector } from 'react-redux'
import { settingsData } from '../../store/reducers/settingsReducer'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { locationData } from 'src/store/reducers/settingsReducer'
import { registerFcmTokenApi } from 'src/store/actions/campaign'

const OTPModal = props => {
  const [OTP, setOTP] = useState('') // eslint-disable-next-line
  const { authentication } = FirebaseData()
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long
  const [error, setError] = useState(
    '',
    setTimeout(() => {
      if (error !== '') setError('')
    }, 5000)
  )

  const navigate = useRouter()

  const settings = useSelector(settingsData)

  const resendOTP = e => {
    e.preventDefault()
    if (props.phonenum !== null) {
      generateOTP(props.phonenum)
      toast.success('OTP resent successfully!')
    }
  }

  const generateRecaptcha = () => {
    if (typeof window !== 'undefined') {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
            callback: response => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
          },
          authentication
        )
      }
    }
  }

  useEffect(() => {
    generateRecaptcha()
    return () => {
      // Clear the recaptcha container
      const recaptchaContainer = document.getElementById('recaptcha-container')
      if (recaptchaContainer) {
        recaptchaContainer.innerHTML = ''
      }

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear()
      }
    }
  }, [])

  const generateOTP = phonenum => {
    // OTP Generation
    generateRecaptcha()
    let appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(authentication, phonenum, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult
        loadMobileType(true)
      })
      .catch(error => {
        console.log(error)
        let errorMessage = ''
        switch (error.code) {
          case 'auth/too-many-requests':
            errorMessage = 'Too many requests. Please try again later.'
            break
          case 'auth/invalid-phone-number':
            errorMessage = 'Invalid phone number. Please enter a valid phone number.'
            break
          default:
            errorMessage = 'An error occurred. Please try again.'
            break
        }
        // Display error message in a toast or alert
        toast.error(errorMessage)
      })
  }
  useEffect(() => {
    if (props.phonenum !== null) {
      generateOTP(props.phonenum)
    }
    // eslint-disable-next-line
  }, [props.phonenum])

  const submitOTP = async e => {
    e.preventDefault()

    let confirmationResult = window.confirmationResult

    try {
      const response = await confirmationResult.confirm(OTP)

      // User verified successfully.
      props.setIsLogout(true)
      props.onHide()

      register({
        firebase_id:response.user.uid,
        mobile:response.user.phoneNumber,
        type:'mobile',
        status:'1',
        fcm_id:location.fcmtoken,
        onSuccess:response => {
          setTimeout(async () => {
            await registerFcmTokenApi({
              token: response.data.fcm_id,
              latitude: storedLatitude,
              longitude: storedLongitude,
              onSuccess: async res => {
              },
              onError: async err => {
                console.log(err)
              }
            })
          }, [1000])
          if (response.data.is_login === '1') {
            // If new User then show the Update Profile Screen
            navigate.push('/profile-update')
          }
          props.setisloginloading(false)
        },
        onError:error => {
          toast.error(translate('deactiveMsg'))
        }
      }
      )
    } catch (error) {
      // User couldn't sign in (bad verification code?)
      setError(error.code)
    }
  }

  return (
    <>
      <div>
        <Modal
          {...props}
          size='xl'
          aria-labelledby='contained-modal-title-vcenter'
          centered
          dialogClassName='border-radius-2'
        >
          <div className='ModalWrapper55' id='ModalWrapper'>
            <div style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} id='login_img5'>
              <img className='ModalImg5' src={photo.src} alt='otp modal image' />
              <div className='logo-img-overlay'>
                <img src={settings && settings.web_setting.web_header_logo} alt='logo image' id='logo5' />
              </div>
            </div>

            <div id='modal-content'>
              <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>{translate('login')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='AC'>
                  <div className=''>
                    <h5>
                      <strong>{translate('otp-sent')} </strong>
                    </h5>
                    <div id='Welcom' style={{ fontSize: '14px' }}>
                      {' '}
                      {props.phonenum}{' '}
                    </div>
                  </div>
                  <form onClick={e => submitOTP(e)}
                  >
                    <div className='mb-3 my-3'>
                      <OTPInput
                        className='otp-container'
                        value={OTP}
                        onChange={setOTP}
                        autoFocus
                        numInputs={6}
                        disabled={false}
                        containerStyle={'otpbox'}
                        renderSeparator={<span className='space'></span>}
                        renderInput={props => <input {...props} className='custom-input-class'></input>}
                      />
                      <p className='error-msg'>{error}</p>
                      <div>
                        <button onClick={e => resendOTP(e)} id='resendbutton' className='btn ps-0'>
                          {translate('resendLbl')}
                        </button>
                      </div>
                    </div>

                    <div className='py-3'>
                      <button
                        type='submit'
                        className='btn   btn-lg  w-100'
                        id='submitbutton'
                       
                      >
                        {translate('submitBtn')}
                      </button>
                    </div>
                  </form>
                </div>
              </Modal.Body>
            </div>
          </div>
        </Modal>
        <div id='recaptcha-container' style={{ display: 'none' }}></div>
      </div>
    </>
  )
}

export default OTPModal
