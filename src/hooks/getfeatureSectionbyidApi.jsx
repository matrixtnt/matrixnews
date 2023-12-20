import Api from 'src/api/AxiosInterceptors'
import { GET_FEATURE_SECTION } from 'src/utils/api'

export const getFeatureSectionApi = {
  getFeatureSection: requestData => {
    const { access_key, language_id, offset, limit, slug, latitude, longitude } = requestData
    return Api.get(GET_FEATURE_SECTION, {
      params: {
        access_key,
        language_id,
        offset,
        limit,
        slug,
        latitude,
        longitude
      }
    })
  }
}
