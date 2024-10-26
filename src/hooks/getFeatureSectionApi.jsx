import Api from 'src/api/AxiosInterceptors'
import { GET_FEATURE_SECTION } from 'src/utils/api'

export const getFeatureSectionApi = {
  getFeatureSection: requestData => {
    const { language_id, offset, limit, slug, latitude, longitude, section_id } = requestData
    return Api.post(GET_FEATURE_SECTION, {
        language_id,
        offset,
        limit,
        slug,
        latitude,
        longitude,
        section_id
      })
  }
}
