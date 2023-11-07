// ** React Import
// ** Next Import
import { Html, Head, Main, NextScript } from 'next/document'

const CustomDocument = () => {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default CustomDocument
