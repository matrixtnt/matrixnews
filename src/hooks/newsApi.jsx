import Api from 'src/api/AxiosInterceptors'
import { GET_NEWS, GET_NEWS_BY_ID, SET_NEWS_VIEW } from 'src/utils/api'

export const getNewsApi = {
  getNews: requestData => {
    const {
      access_key,
      offset,
      limit,
      user_id,
      get_user_news,
      search, // {optional}
      language_id,
      latitude,
      longitude
    } = requestData
    return Api.post(GET_NEWS, {
      access_key,
      offset,
      limit,
      user_id,
      get_user_news,
      search, // {optional}
      language_id,
      latitude,
      longitude
    })
  },
  getNewsById: requestData => {
    const { access_key, news_id, user_id, language_id } = requestData
    return Api.post(GET_NEWS_BY_ID, {
      access_key,
      news_id,
      user_id,
      language_id
    })
  },
  setNewsView: requestData => {
    const { access_key, news_id, user_id } = requestData
    return Api.post(SET_NEWS_VIEW, {
      access_key,
      user_id,
      news_id,
    })
  }
}
