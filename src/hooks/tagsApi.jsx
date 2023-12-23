import Api from 'src/api/AxiosInterceptors'
import { GET_NEWS_BY_TAG, GET_TAG } from 'src/utils/api'

export const getTagApi = {
  getTag: requestData => {
    const { access_key, language_id } = requestData
    return Api.get(GET_TAG, {
      params: {
        access_key,
        language_id
      }
    })
  },
  getNewsByTag: requestData => {
    const { access_key, tag_id, language_id, latitude, longitude } = requestData
    return Api.get(GET_NEWS_BY_TAG, {
      params: {
        access_key,
        tag_id,
        language_id,
        latitude,
        longitude
      }
    })
  }
}
