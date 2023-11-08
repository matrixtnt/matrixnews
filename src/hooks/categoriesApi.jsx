import Api from 'src/api/AxiosInterceptors'
import { GET_CATEGORIES, GET_NEWS_BY_CATEGORY } from 'src/utils/api'

export const CategoriesApi = {
  getCategories: requestData => {
    const { access_key, offset, limit, language_id } = requestData
    return Api.post(GET_CATEGORIES, {
      access_key,
      offset,
      limit,
      language_id
    })
  },
  getNewsByCategory: requestData => {
    const { access_key, category_id, subcategory_id, offset, limit, user_id, language_id, latitude, longitude } =
      requestData
    return Api.post(GET_NEWS_BY_CATEGORY, {
      access_key: access_key,
      category_id,
      subcategory_id,
      offset,
      limit,
      user_id,
      language_id,
      latitude,
      longitude
    })
  }
}
