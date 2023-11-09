import Api from 'src/api/AxiosInterceptors'
import { GET_NEWS_BY_TAG, GET_TAG } from 'src/utils/api'

export const getTagApi = {
  getTag: requestData => {
    const { access_key, language_id } = requestData
    return Api.post(GET_TAG, {
      access_key,
      language_id
    })
  },
  getNewsByTag: requestData => {
    const { access_key, user_id, tag_id, language_id, latitude, longitude } = requestData
    return Api.post(GET_NEWS_BY_TAG, {
      access_key,
      user_id,
      tag_id,
      language_id,
      latitude,
      longitude
    })
  }
}
