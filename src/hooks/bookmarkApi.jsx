import Api from 'src/api/AxiosInterceptors'
import { GET_BOOKMARK, SET_BOOKMARK } from 'src/utils/api'

export const bookmarkApi = {
  getBookmark: requestData => {
    const { language_id, offset, limit } = requestData
    return Api.post(GET_BOOKMARK, {
      language_id,
      offset,
      limit
    })
  },
  setBookmark: requestData => {
    const { news_id, status } = requestData
    return Api.post(SET_BOOKMARK, {
      news_id,
      status //1-bookmark, 0-unbookmark
    })
  }
}
