'use client'
import { store } from '../store/store'

// access key get from env
export const access_key = process.env.NEXT_PUBLIC_ACCESS_KEY

// General Api
export const GET_SETTINGS = 'get_settings'
export const GET_CATEGORIES = 'get_category'
export const GET_LIVE_STREAMING = 'get_live_streaming'
export const GET_SUBCATEGORY_BY_CATEGORY = 'get_subcategory_by_category'
export const GET_TAG = 'get_tag'
export const GET_PAGES = 'get_pages'
export const GET_NOTIFICATIONS = 'get_notification'
export const GET_VIDEO = 'get_videos'
export const GET_FEATURE_SECTION = 'get_featured_sections'
export const GET_LOCATION = 'get_location'
export const SET_USER_CATEGORIES = 'set_user_category'
export const SET_LIKE_DISLIKE = 'set_like_dislike'
export const SET_FLAG = 'set_flag'

// User Api
export const GET_USER_BY_ID = 'get_user_by_id'
export const GET_USER_NOTIFICATION = 'get_user_notification'
export const USER_SIGNUP = 'user_signup'
export const UPDATE_PROFILE = 'update_profile'
export const DELETE_USER_NOTIFICATION = 'delete_user_notification'
export const DELETE_ACCOUNT = 'delete_user'

// News Api
export const GET_AD_SPACE_NEWS_DETAILS = 'get_ad_space_news_details'
export const GET_NEWS = 'get_news'
export const GET_BREAKING_NEWS = 'get_breaking_news'
export const SET_NEWS = 'set_news'
export const DELETE_IMAGES = 'delete_news_images'
export const DELETE_NEWS = 'delete_news'
export const SET_NEWS_VIEW = 'set_news_view'
export const SET_BREAKING_NEWS_VIEW = 'set_breaking_news_view'

// Languages Api
export const GET_LANGUAGE_LIST = 'get_languages_list'
export const GET_LANGUAGE_JSON_DATA = 'get_language_json_data'

// Comment Api
export const GET_COMMENT_BY_NEWS = 'get_comment_by_news'
export const SET_COMMENT = 'set_comment'
export const SET_COMMENT_LIKE_DISLIKE = 'set_comment_like_dislike'
export const DELETE_COMMENT = 'delete_comment'

// Bookmark Api
export const GET_BOOKMARK = 'get_bookmark'
export const SET_BOOKMARK = 'set_bookmark'

//get language from storage
export const getLanguage = () => {
  let language = store.getState().languages?.currentLanguage

  if (language) {
    return language
  }
  return false
}

// get user
export const getUser = () => {
  let user = store.getState().user
  if (user.data !== null) {
    return user.data.id
  }
}

// 1. languages
export const getLanguagesApi = () => {
  let { id: language_id } = getLanguage()
  return {
    url: `${GET_LANGUAGE_LIST}`,
    method: 'GET',
    params: {
      access_key: access_key,
      language_id: language_id
    },
    authorizationHeader: false
  }
}

// 2. get category (here:- language not get globally due create news)
export const getCategoriesApi = (offset, limit, language_id) => {
  return {
    url: `${GET_CATEGORIES}`,
    method: 'GET',
    params: {
      access_key: access_key,
      offset: offset,
      limit: limit,
      language_id: language_id
    },
    authorizationHeader: false
  }
}

// 3. user signup
export const userSignUpApi = (firebase_id, name, email, mobile, type, profile, status, fcm_id) => {
  return {
    url: `${USER_SIGNUP}`,
    method: 'POST',
    data: {
      access_key: access_key,
      firebase_id: firebase_id, //Firebase ID
      name: name,
      email: email,
      mobile: mobile,
      type: type, /// gmail / fb / apple / mobile
      profile: profile, //image url
      status: status, // 1 - Active & 0 Deactive
      fcm_id: fcm_id
    },
    authorizationHeader: true
  }
}

// 4. get languages json
export const getLanguageJsonDataApi = code => {
  return {
    url: `${GET_LANGUAGE_JSON_DATA}`,
    method: 'GET',
    params: {
      access_key: access_key,
      code: code
    },
    authorizationHeader: false
  }
}

// 5. set bookmark
export const setBookmarkApi = (news_id, status) => {
  let user = getUser()
  return {
    url: `${SET_BOOKMARK}`,
    method: 'POST',
    data: {
      access_key: access_key,
      user_id: user,
      news_id: news_id,
      status: status //1-bookmark, 0-unbookmark
    },
    authorizationHeader: true
  }
}

// 6. set comment
export const setCommentApi = (parent_id, news_id, message) => {
  let { id: language_id } = getLanguage()
  return {
    url: `${SET_COMMENT}`,
    method: 'POST',
    data: {
      access_key: access_key,
      parent_id: parent_id, //if not exists, set 0
      news_id: news_id,
      message: message,
      language_id: language_id
    },
    authorizationHeader: true
  }
}

// 7. delete comment
export const deleteCommentApi = comment_id => {
  let user = getUser()
  return {
    url: `${DELETE_COMMENT}`,
    method: 'POST',
    data: {
      access_key: access_key,
      user_id: user,
      comment_id: comment_id
    },
    authorizationHeader: true
  }
}

// 8. get notification
export const getNotificationsApi = (offset, limit) => {
  let { id: language_id } = getLanguage()
  return {
    url: `${GET_NOTIFICATIONS}`,
    method: 'GET',
    params: {
      access_key: access_key,
      offset: offset,
      limit: limit,
      language_id: language_id
    },
    authorizationHeader: true
  }
}

// 9. set likedislike
export const setLikeDisLikeApi = (news_id, status) => {
  let user = getUser()
  return {
    url: `${SET_LIKE_DISLIKE}`,
    method: 'POST',
    data: {
      access_key: access_key,
      user_id: user,
      news_id: news_id,
      status: status // 1=like, 2=dislike, 0=none
    },
    authorizationHeader: true
  }
}

// 10. get user notification
export const getUserNotificationApi = (offset, limit) => {
  let user = getUser()
  return {
    url: `${GET_USER_NOTIFICATION}`,
    method: 'GET',
    params: {
      access_key: access_key,
      user_id: user,
      offset: offset,
      limit: limit
    },
    authorizationHeader: true
  }
}

// 11. delete user notification
export const DeleteUserNotificationApi = id => {
  return {
    url: `${DELETE_USER_NOTIFICATION}`,
    method: 'POST',
    data: {
      access_key: access_key,
      id: id
    },
    authorizationHeader: true
  }
}

// 12. set user categories
export const setUserCategoriesApi = category_id => {
  let user = getUser()
  return {
    url: `${SET_USER_CATEGORIES}`,
    method: 'POST',
    data: {
      access_key: access_key,
      user_id: user,
      category_id: category_id
    },
    authorizationHeader: true
  }
}

// 14. get settings
export const getSettingsApi = type => {
  return {
    url: `${GET_SETTINGS}`,
    method: 'GET',
    params: {
      access_key: access_key,
      type: type //optional
    },
    authorizationHeader: false
  }
}

// 16. update profile image
export const updateProfileApi = (name,mobile,email,image) => {
  let data = new FormData()
  data.append('access_key', access_key)
  data.append('name', name)
  data.append('mobile', mobile)
  data.append('email', email)
  data.append('image', image)
  return {
    url: `${UPDATE_PROFILE}`,
    method: 'POST',
    data,
    authorizationHeader: true
  }
}

// 17. set news
export const setnewsApi = (
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
) => {
  let user = getUser()
  let data = new FormData()
  let createToEdit = store.getState().createNews.createToEdit
  let news_id = createToEdit ? createToEdit.id : null
  data.append('access_key', access_key)
  if (action_type === 2) {
    data.append('news_id', news_id)
  }
  data.append('action_type', action_type) //1-add, 2-update if action_type- 2 => news_id:1
  data.append('user_id', user)
  data.append('category_id', category_id)
  data.append('subcategory_id', subcategory_id)
  data.append('tag_id', tag_id)
  data.append('title', title)
  data.append('content_type', content_type)
  data.append('content_data', content_data)
  data.append('description', description)
  data.append('image', image)
  ofile.forEach(element => {
    data.append('ofile[]', element)
  })
  data.append('show_till', show_till)
  data.append('language_id', language_id)
  data.append('location_id', location_id)
  return {
    url: `${SET_NEWS}`,
    method: 'POST',
    data,
    authorizationHeader: true
  }
}

// 18. delete image for news
export const deleteimageApi = image_id => {
  return {
    url: `${DELETE_IMAGES}`,
    method: 'POST',
    data: {
      access_key: access_key,
      id: image_id
    },
    authorizationHeader: true
  }
}

// 19. delete news
export const deletenewsApi = news_id => {
  return {
    url: `${DELETE_NEWS}`,
    method: 'POST',
    data: {
      access_key: access_key,
      id: news_id
    },
    authorizationHeader: true
  }
}

// 20. subcatgory by category
export const getsubcategorybycategoryApi = category_id => {
  let { id: language_id } = getLanguage()
  return {
    url: `${GET_SUBCATEGORY_BY_CATEGORY}`,
    method: 'GET',
    params: {
      access_key: access_key,
      category_id: category_id,
      language_id: language_id
    },
    authorizationHeader: true
  }
}

// 21. set comment like dislike
export const set_comment_like_dislike_Api = (comment_id, status) => {
  let { id: language_id } = getLanguage()
  let user = getUser()
  return {
    url: `${SET_COMMENT_LIKE_DISLIKE}`,
    method: 'POST',
    data: {
      access_key: access_key,
      user_id: user,
      comment_id: comment_id,
      status: status, // 1=like, 2=dislike, 0=none
      language_id: language_id
    },
    authorizationHeader: true
  }
}

// 22. set flag
export const set_flag_Api = (comment_id, news_id, message) => {
  let user = getUser()
  return {
    url: `${SET_FLAG}`,
    method: 'POST',
    data: {
      access_key: access_key,
      comment_id: comment_id,
      user_id: user,
      news_id: news_id, // 1=like, 2=dislike, 0=none
      message: message
    },
    authorizationHeader: true
  }
}

// 24. acccount delete
export const accountdeleteApi = () => {
  let user = getUser()
  return {
    url: `${DELETE_ACCOUNT}`,
    method: 'POST',
    data: {
      access_key: access_key,
      user_id: user
    },
    authorizationHeader: true
  }
}
