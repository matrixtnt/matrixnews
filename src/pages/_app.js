// ** Next Imports
import Head from 'next/head'

// ** Store Imports
import { Provider } from 'react-redux'
import { store } from 'src/store/store'

import { Toaster } from 'react-hot-toast'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import dynamic from 'next/dynamic'
import PushNotificationLayout from 'src/components/firebaseNotification/PushNotification'

// CSS File Here
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/swiper-bundle.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-quill/dist/quill.snow.css'
import 'nprogress/nprogress.css'
import '../../public/assets/css/style.css'

const LayoutNoSSR = dynamic(() => import('src/components/layout/Layout'), { ssr: false })
// ** Configure JSS & ClassName
const App = ({ Component, pageProps, data }) => {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })

  return (
    <>
      <Head>
        <title>{`news`}</title>
        {/* <meta name='description' content={``} />
        <meta name='keywords' content={``} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      <link rel='shortcut icon' href={``} /> */}
      </Head>
      <Provider store={store}>
        <Toaster position='top-center' containerClassName='toast-custom' />
        <PushNotificationLayout>
          <LayoutNoSSR>
            <Component {...pageProps} />
          </LayoutNoSSR>
        </PushNotificationLayout>
      </Provider>
    </>
  )
}

export default App
