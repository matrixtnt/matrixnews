import Api from 'src/api/AxiosInterceptors'
import { GET_BREAKING_NEWS, GET_BREAKING_NEWS_ID, SET_BREAKING_NEWS_VIEW } from 'src/utils/api'

export const AllBreakingNewsApi = {
  getBreakingNews: requestData => {
    const { language_id, access_key } = requestData
    return Api.get(GET_BREAKING_NEWS, {
      params: {
        language_id,
        access_key
      }
    })
  },
  getBreakingNewsId: requestData => {
    const { access_key, breaking_news_id, user_id, language_id } = requestData
    return Api.get(GET_BREAKING_NEWS_ID, {
      params: {
        access_key,
        breaking_news_id,
        user_id,
        language_id
      }
    })
  },
  setBreakingNewsView: requestData => {
    const { access_key, user_id, breaking_news_id } = requestData
    return Api.post(SET_BREAKING_NEWS_VIEW, {
      access_key,
      user_id,
      breaking_news_id
    })
  }
}
