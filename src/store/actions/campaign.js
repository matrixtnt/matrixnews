import {
  accountdeleteApi,
  deleteCommentApi,
  getBookmarkApi,
  getBreakingNewsApi,
  getCategoriesApi,
  getCommentByNewsApi,
  getLiveStreamingApi,
  getNewsApi,
  getPagesApi,
  getTagApi,
  getVideoApi,
  setBookmarkApi,
  setCommentApi,
  setLikeDisLikeApi,
  DeleteUserNotificationApi,
  getFeatureSectionApi,
  setUserCategoriesApi,
  getUserCategoriesApi,
  getUserByIdApi,
  setNewsViewApi,
  setBreakingNewsViewApi,
  getAdsSpaceNewsDetailsApi,
  setnewsApi,
  deleteimageApi,
  deletenewsApi,
  getsubcategorybycategoryApi,
  set_comment_like_dislike_Api,
  set_flag_Api,
  register_token_api,
  getlocationapi
} from '../../utils/api'
import { store } from '../store'
import { apiCallBegan } from './apiActions'

// 1. get categories
export const categoriesApi = ({
  offset = '',
  limit = '',
  language_id = '',
  onSuccess = () => {},
  onError = () => {},
  onStart = () => {}
}) => {
  store.dispatch(
    apiCallBegan({
      ...getCategoriesApi(offset, limit, language_id),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 10. set bookmark
export const setbookmarkApi = ({
  news_id = '',
  status = '',
  onSuccess = () => {},
  onError = () => {},
  onStart = () => {}
}) => {
  store.dispatch(
    apiCallBegan({
      ...setBookmarkApi(news_id, status),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 11. set comment
export const setcommentApi = ({
  parent_id = '',
  news_id = '',
  message = '',
  onSuccess = () => {},
  onError = () => {},
  onStart = () => {}
}) => {
  store.dispatch(
    apiCallBegan({
      ...setCommentApi(parent_id, news_id, message),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

//13. delete comment
export const deletecommentApi = ({ comment_id = '', onSuccess = () => {}, onError = () => {}, onStart = () => {} }) => {
  store.dispatch(
    apiCallBegan({
      ...deleteCommentApi(comment_id),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 15. set likedislike
export const setlikedislikeApi = ({
  news_id = '',
  status = '',
  onSuccess = () => {},
  onError = () => {},
  onStart = () => {}
}) => {
  store.dispatch(
    apiCallBegan({
      ...setLikeDisLikeApi(news_id, status),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 17. delete user notification
export const deleteusernotificationApi = ({
  id = '',
  onSuccess = () => {},
  onError = () => {},
  onStart = () => {}
}) => {
  store.dispatch(
    apiCallBegan({
      ...DeleteUserNotificationApi(id),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 20. set user categories
export const setusercategoriesApi = ({
  category_id = '',
  onSuccess = () => {},
  onError = () => {},
  onStart = () => {}
}) => {
  store.dispatch(
    apiCallBegan({
      ...setUserCategoriesApi(category_id),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 22. get user by id
export const getuserbyidApi = ({ onSuccess = () => {}, onError = () => {}, onStart = () => {} }) => {
  store.dispatch(
    apiCallBegan({
      ...getUserByIdApi(),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 26. set news
export const setNewsApi = ({
  action_type = '',
  category_id = '',
  subcategory_id = '',
  tag_id = '',
  title = '',
  content_type = '',
  content_data = '',
  description = '',
  image = '',
  ofile = '',
  show_till = '',
  language_id = '',
  location_id = '',
  onSuccess = () => {},
  onError = () => {},
  onStart = () => {}
}) => {
  store.dispatch(
    apiCallBegan({
      ...setnewsApi(
        action_type,
        category_id,
        subcategory_id,
        tag_id,
        title,
        content_type,
        content_data,
        description,
        image,
        ofile,
        show_till,
        language_id,
        location_id
      ),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 27. delete new images
export const deleteImageApi = ({ image_id = '', onSuccess = () => {}, onError = () => {}, onStart = () => {} }) => {
  store.dispatch(
    apiCallBegan({
      ...deleteimageApi(image_id),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 28. delete news
export const deleteNewsApi = ({ news_id = '', onSuccess = () => {}, onError = () => {}, onStart = () => {} }) => {
  store.dispatch(
    apiCallBegan({
      ...deletenewsApi(news_id),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 29. subcategory by category
export const getSubcategoryByCategoryApi = ({
  category_id = '',
  onSuccess = () => {},
  onError = () => {},
  onStart = () => {}
}) => {
  store.dispatch(
    apiCallBegan({
      ...getsubcategorybycategoryApi(category_id),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 30. set comment like dislike
export const setCommentLikeDislikeApi = ({
  comment_id = '',
  status = '',
  onSuccess = () => {},
  onError = () => {},
  onStart = () => {}
}) => {
  store.dispatch(
    apiCallBegan({
      ...set_comment_like_dislike_Api(comment_id, status),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 31. set flag
export const setFlagApi = (comment_id, news_id, message, onSuccess, onError, onStart) => {
  store.dispatch(
    apiCallBegan({
      ...set_flag_Api(comment_id, news_id, message),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 32. register_token
export const setRegisterTokenApi = (token, latitude, longitude, onSuccess, onError, onStart) => {
  store.dispatch(
    apiCallBegan({
      ...register_token_api(token, latitude, longitude),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 34. get tags
export const getLocationApi = (onSuccess, onError, onStart) => {
  store.dispatch(
    apiCallBegan({
      ...getlocationapi(),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}

// 35. delete account
export const accountDeleteApi = (onSuccess, onError, onStart) => {
  store.dispatch(
    apiCallBegan({
      ...accountdeleteApi(),
      displayToast: false,
      onStart,
      onSuccess,
      onError
    })
  )
}
