import Api from 'src/api/AxiosInterceptors'
import { GET_FEATURE_SECTION_ID } from 'src/utils/api'

export const getFeatureSectionByIdApi = {
  getFeatureSectionById: requestData => {
    const { access_key, section_id, language_id, user_id, offset, limit, latitude, longitude } = requestData
    return Api.post(GET_FEATURE_SECTION_ID, {
      access_key,
      section_id,
      language_id,
      user_id,
      offset,
      limit,
      latitude,
      longitude
    })
  }
}
