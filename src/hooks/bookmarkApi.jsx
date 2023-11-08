import Api from 'src/api/AxiosInterceptors'
import { GET_BOOKMARK, SET_BOOKMARK } from 'src/utils/api'

export const bookmarkApi = {
  getBookmark: requestData => {
    const { access_key, user_id, language_id, offset, limit } = requestData
    return Api.post(GET_BOOKMARK, {
      access_key,
      user_id,
      language_id,
      offset,
      limit
    })
  },
  setBookmark: requestData => {
    const { access_key, user_id, news_id, status } = requestData
    return Api.post(SET_BOOKMARK, {
      access_key,
      user_id,
      news_id,
      status  //1-bookmark, 0-unbookmark
    })
  },
}
