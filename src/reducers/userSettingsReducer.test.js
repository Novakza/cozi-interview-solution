import userSettingsReducer, {
  GET_SETTINGS_REQUEST,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,
  SET_SETTINGS
} from './userSettingsReducer'

const baseState = {
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

const fullState = {
  id: 1010,
  profile: 'test profile',
  typePreference: 'dog',
  ageRange: {
    min: 0,
    max: 5
  },
  error: null,
  locallyModified: false
}

const locallyModifiedState = {
  ...fullState,
  locallyModified: true
}

describe('saved pets reducer', () => {
  it('should return the initial state', () => {
    expect(userSettingsReducer(undefined, {})).toEqual(baseState)
  })

  describe('should merge manual edits intelligently', () => {
    it('merges values, preserves unset values', () => {
      expect(
        userSettingsReducer(fullState, {
          type: SET_SETTINGS,
          settings: {
            typePreference: 'cat'
          }
        })
      ).toEqual({
        ...locallyModifiedState,
        typePreference: 'cat'
      })
    })
    it('preserves max if only min is changed', () => {
      expect(
        userSettingsReducer(fullState, {
          type: SET_SETTINGS,
          settings: {
            ageRange: {
              min: 5
            }
          }
        })
      ).toEqual({
        ...locallyModifiedState,
        ageRange: {
          min: 5,
          max: 5
        }
      })
    })
    it('sets locally modified', () => {
      expect(
        userSettingsReducer(fullState, {
          type: SET_SETTINGS,
          settings: {}
        })
      ).toEqual(locallyModifiedState)
    })
  })

  describe('GET_SETTINGS_REQUEST should not mutate the state', () => {
    const action = {
      type: GET_SETTINGS_REQUEST
    }
    it('does not mutate base', () => {
      expect(userSettingsReducer(baseState, action)).toEqual(baseState)
    })
    it('does not mutate full', () => {
      expect(userSettingsReducer(fullState, action)).toEqual(fullState)
    })
    it('does not mutate garbage', () => {
      const garbageState = {
        thisIs: 'garbage'
      }
      expect(userSettingsReducer(garbageState, action)).toEqual(garbageState)
    })
  })

  describe('GET_SETTINGS_SUCCESS', () => {
    const action = {
      type: GET_SETTINGS_SUCCESS,
      payload: { ...fullState }
    }
    it('sets the state', () => {
      expect(userSettingsReducer(baseState, action)).toEqual(fullState)
    })
  })

  describe('GET_SETTINGS_FAILURE', () => {
    const action = {
      type: GET_SETTINGS_FAILURE,
      error: 'Error getting user settings'
    }
    it('resets to base state with error', () => {
      expect(userSettingsReducer(fullState, action)).toEqual({
        ...baseState,
        error: 'Error getting user settings'
      })
    })
  })
})
