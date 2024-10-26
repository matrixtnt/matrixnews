import Api from 'src/api/AxiosInterceptors'
import { GET_BREAKING_NEWS, SET_BREAKING_NEWS_VIEW } from 'src/utils/api'

export const AllBreakingNewsApi = {
  getBreakingNews: requestData => {
    const { language_id, slug, offset, limit } = requestData
    return Api.post(GET_BREAKING_NEWS, {
        language_id,
        slug,
        offset,
        limit
      }
    )
  },
  
  setBreakingNewsView: requestData => {
    const { breaking_news_id } = requestData
    return Api.post(SET_BREAKING_NEWS_VIEW, {
      // user_id,
      breaking_news_id
    })
  }
}
