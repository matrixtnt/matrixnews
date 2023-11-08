// ** Store Imports
import { Provider } from 'react-redux'
import { store } from 'src/store/store'
import { Toaster } from 'react-hot-toast'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import dynamic from 'next/dynamic'
import PushNotificationLayout from 'src/components/firebaseNotification/PushNotification'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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

// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20000,
      refetchOnWindowFocus: false, // default: true
    },
  },
})

// ** Configure JSS & ClassName
const App = ({ Component, pageProps }) => {

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
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Toaster position='top-center' containerClassName='toast-custom' />
            <PushNotificationLayout>
              <LayoutNoSSR>
                <Component {...pageProps} />
              </LayoutNoSSR>
            </PushNotificationLayout>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
