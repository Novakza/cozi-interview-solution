import searchResultsReducer, {
  GET_SEARCH_RESULTS_REQUEST,
  GET_SEARCH_RESULTS_FAILURE,
  GET_SEARCH_RESULTS_SUCCESS
} from './searchResultsReducer'

const testPet = {
  id: 1012,
  type: 'cat',
  name: 'Pepper',
  img: null,
  sex: 'F',
  age: 4,
  profile:
    "Pepper is a loving rescue cat with major abandonment issues. She is always sleeping near her owner, or riding on her owner's shoulder."
}

const baseState = {
  searchResults: [],
  fetchComplete: false,
  error: null
}

const fullState = {
  searchResults: [testPet],
  fetchComplete: true,
  error: null
}

const errorState = {
  searchResults: [],
  fetchComplete: true,
  error: 'Could not get results successfully'
}

describe('search results reducer', () => {
  it('should return the initial state', () => {
    expect(searchResultsReducer(undefined, {})).toEqual(baseState)
  })

  describe('should handle GET_SEARCH_RESULTS_REQUEST correctly', () => {
    const action = {
      type: GET_SEARCH_RESULTS_REQUEST
    }
    it('resets back to base state, starting as base state', () => {
      expect(searchResultsReducer(baseState, action)).toEqual(baseState)
    })
    it('resets back to base state, starting as a full state', () => {
      expect(searchResultsReducer(fullState, action)).toEqual(baseState)
    })
    it('resets back to base state, starting as an errored state', () => {
      expect(searchResultsReducer(errorState, action)).toEqual(baseState)
    })
  })

  describe('should handle GET_SEARCH_RESULTS_SUCCESS correctly', () => {
    const action = {
      type: GET_SEARCH_RESULTS_SUCCESS,
      payload: [testPet]
    }
    it('loads the state, starting as base state', () => {
      expect(searchResultsReducer(baseState, action)).toEqual(fullState)
    })
  })

  describe('should handle GET_SEARCH_RESULTS_FAILURE correctly', () => {
    const action = {
      type: GET_SEARCH_RESULTS_FAILURE,
      error: 'Could not get results successfully'
    }
    it('loads the state with an error', () => {
      expect(searchResultsReducer(baseState, action)).toEqual(errorState)
    })
  })
})
