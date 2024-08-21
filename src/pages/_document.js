// ** React Import
// ** Next Import
import { Html, Head, Main, NextScript } from 'next/document'

const CustomDocument = () => {
  return (
    <Html lang='en' version={process?.env?.NEXT_PUBLIC_WEB_VERSION}>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        {/* <link rel="shortcut icon" href="Favicon.svg" sizes="32x32" type="image/svg" /> */}
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
        <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link>
      </Head>

      {/* add to any script */}
      <script async src="https://static.addtoany.com/menu/page.js"></script>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default CustomDocument
