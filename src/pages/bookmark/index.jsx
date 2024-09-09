import dynamic from 'next/dynamic'
const BookmarkSection = dynamic(() => import('src/components/bookmark/BookmarkSection'), { ssr: false })

const index = () => {
  return (
    <>
      <BookmarkSection />
    </>
  )
}

export default index
