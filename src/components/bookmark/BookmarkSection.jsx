"use client"
import bookmarkIMG from '../../../public/assets/images/bookmark.png';
import { FiCalendar } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav';
import { translate } from '../../utils';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/navigation';
import { bookmarkApi } from 'src/hooks/bookmarkApi';
import { useQuery } from '@tanstack/react-query';
import { access_key, getLanguage, getUser } from 'src/utils/api';

const BookmarkSection = () => {
  const { id: language_id } = getLanguage();
  const user = getUser();
  const navigate = useRouter();

  // api call
  const getbookmarkApi = async () => {
    try {
      const { data } = await bookmarkApi.getBookmark({
        access_key: access_key,
        user_id: user,
        language_id: language_id,
        offset: 0,
        limit: '',
      });
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const setbookmarkApi = async (news_id, status) => {
    try {
      const { data } = await bookmarkApi.setBookmark({
        access_key: access_key,
        user_id: user,
        news_id: news_id,
        status: status,
      });
      refetch()
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  // react query
  const { refetch,isLoading, isError, data } = useQuery({
    queryKey: ['getbookmark', access_key, user, language_id],
    queryFn: getbookmarkApi,
  });

  const { } = useQuery({
    queryKey: ['setbookmark'],
    queryFn: getbookmarkApi,
  });

  if (isLoading) {
    return (
      <div className="col-12 loading_data">
        <Skeleton height={20} count={22} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="col-12 no_data mt-5">
        <div id="bs-no-main">
          <img id="bs-no-image" src={bookmarkIMG.src} alt="" />
          <p id="bs-no-title">
            <b>{translate('addbookmark')}</b>
          </p>
          <p id="bs-no-text">{translate('dontforgetbookmark')}</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <BreadcrumbNav SecondElement={translate('bookmarkLbl')} ThirdElement='0' />

      <div id='bs-main' className='py-5 bookmark_page'>
        <div id='bs-content' className='container'>
          <div className='row'>
            {data &&
              data.map(element => (
                <div className='col-md-6 col-lg-4 col-12' key={element.id}>
                  <div id='bs-card' className='card'>
                    <div className='bs_image_card'>
                      <img
                        id='bs-card-image'
                        src={element.image}
                        className='card-img'
                        alt='...'
                        onClick={() => navigate.push(`/news/${element.news_id}`)}
                      />
                      <button id='bs-btnBookmark' className='btn' onClick={e => setbookmarkApi(element.news_id, '0')}>
                        <BsTrash id='bs-bookmark-logo' size={18} />
                      </button>
                    </div>
                    <div id='bs-card-body' className='card-body'>
                      <button
                        id='bs-btnCatagory'
                        className='btn btn-sm'
                        type='button'
                        onClick={() => navigate.push(`/news/${element.news_id}`)}
                      >
                        {element.category_name}
                      </button>
                      <h5
                        id='bs-card-title'
                        className='card-title'
                        onClick={() => navigate.push(`/news/${element.news_id}`)}
                      >
                        {element.title}
                      </h5>
                      <p id='bs-card-date'>
                        <FiCalendar size={18} id='bs-logoCalendar' />
                        {element.date.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BookmarkSection
