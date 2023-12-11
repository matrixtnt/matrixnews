import Api from 'src/api/AxiosInterceptors'
import { GET_FEATURE_SECTION_ID, GET_FEATURE_SECTION } from 'src/utils/api'

export const getFeatureSectionApi = {
  getFeatureSectionById: requestData => {
    const { access_key, section_id, language_id, user_id, offset, limit, latitude, longitude } = requestData
    return Api.get(GET_FEATURE_SECTION_ID, {
      params: {
      access_key,
      section_id,
      language_id,
      user_id,
      offset,
      limit,
      latitude,
      longitude
      }
    })
  },
  getFeatureSection: requestData => {
    const { access_key, language_id, user_id, offset, limit, latitude, longitude } = requestData
    return Api.get(GET_FEATURE_SECTION, {
      params: {
      access_key,
      language_id,
      user_id,
      offset,
      limit,
      latitude,
      longitude
      }
    })
  }
}
