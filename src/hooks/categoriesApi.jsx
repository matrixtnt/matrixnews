import Api from 'src/api/AxiosInterceptors'
import { GET_CATEGORIES } from 'src/utils/api'

export const CategoriesApi = {
  getCategories: requestData => {
    const { access_key, offset, limit, language_id } = requestData
    return Api.post(GET_CATEGORIES, {
      access_key,
      offset,
      limit,
      language_id
    })
  }
}

