// imports
import { RSAA } from 'redux-api-middleware'
import { merge } from 'lodash'

// constants
const userSettingsUrl =
  'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/settings.json'
const defaultUserSettingsState = {
  id: null,
  profile: '',
  typePreference: null,
  ageRange: {
    min: 0,
    max: 20
  },
  error: null,
  locallyModified: false
}

// action types
export const GET_SETTINGS_REQUEST = 'GET_SETTINGS_REQUEST'
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS'
export const GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE'
export const SET_SETTINGS = 'SET_SETTINGS'

// action creators
export const setSettings = settings => ({
  type: SET_SETTINGS,
  settings
})

// API Middleware action handlers
export const getSettingsFromRemote = () => {
  return {
    [RSAA]: {
      endpoint: userSettingsUrl,
      method: 'GET',
      types: [GET_SETTINGS_REQUEST, GET_SETTINGS_SUCCESS, GET_SETTINGS_FAILURE]
    }
  }
}

// Reducer
const userSettingsReducer = (state = defaultUserSettingsState, action) => {
  const reducers = {
    [GET_SETTINGS_REQUEST]: (state, action) => {
      return state
    },
    [GET_SETTINGS_SUCCESS]: (state, action) => {
      return {
        ...action.payload,
        locallyModified: false
      }
    },
    [GET_SETTINGS_FAILURE]: (state, action) => {
      return {
        ...defaultUserSettingsState,
        error: 'Error getting user settings' // should be a more thorough error from the back-end
      }
    },
    [SET_SETTINGS]: (state, action) => {
      return merge({}, state, {
        ...action.settings,
        locallyModified: true
      })
    },
    DEFAULT: (state, action) => {
      return state
    }
  }
  return (reducers[action.type] || reducers.DEFAULT)(state, action)
}

export default userSettingsReducer
