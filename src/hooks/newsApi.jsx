import Api from 'src/api/AxiosInterceptors'
import { GET_NEWS } from 'src/utils/api'

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
  }
}
