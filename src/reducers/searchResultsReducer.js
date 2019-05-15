// imports
import { RSAA } from 'redux-api-middleware'

// constants
const searchResultsUrl =
  'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pets.json'
const defaultSearchResults = []
// Uncomment the following lines to pre-populate the list with Pepper
// Note that the list is cleared by GET_SEARCH_RESULTS_REQUEST by default
// (edit the reducer behavior below to change this)
// const peppy = {
//   id: 1012,
//   type: 'cat',
//   name: 'Pepper',
//   img: null,
//   sex: 'F',
//   age: 4,
//   profile:
//     "Pepper is a loving rescue cat with major abandonment issues. She is always sleeping near her owner, or riding on her owner's shoulder."
// }
// defaultSearchResults.push(peppy)

const defaultState = {
  searchResults: defaultSearchResults,
  fetchComplete: false,
  error: null
}

// action types
const GET_SEARCH_RESULTS_REQUEST = 'GET_SEARCH_RESULTS_REQUEST'
const GET_SEARCH_RESULTS_SUCCESS = 'GET_SEARCH_RESULTS_SUCCESS'
const GET_SEARCH_RESULTS_FAILURE = 'GET_SEARCH_RESULTS_FAILURE'

// API Middleware action handlers
export const getSearchResultsFromRemote = () => {
  return {
    [RSAA]: {
      endpoint: searchResultsUrl,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        GET_SEARCH_RESULTS_REQUEST,
        GET_SEARCH_RESULTS_SUCCESS,
        GET_SEARCH_RESULTS_FAILURE
      ]
    }
  }
}

// Reducer
const searchResultsReducer = (state = defaultState, action) => {
  const reducers = {
    [GET_SEARCH_RESULTS_REQUEST]: (state, action) => {
      return {
        searchResults: [], // default behavior
        // searchResults: state.searchResults, // preserve any existing results when refreshing (for testing only)
        fetchComplete: false,
        error: null
      }
    },
    [GET_SEARCH_RESULTS_SUCCESS]: (state, action) => {
      return {
        searchResults: action.payload, // default behavior
        // searchResults: [...state.searchResults, ...action.payload], // preserve any existing results when refreshing (for testing only)
        fetchComplete: true,
        error: null
      }
    },
    [GET_SEARCH_RESULTS_FAILURE]: (state, action) => {
      return {
        searchResults: [],
        fetchComplete: true,
        error: 'Could not get results successfully' // would usually be a more thorough error from the backend
      }
    },
    DEFAULT: (state, action) => {
      return state
    }
  }
  return (reducers[action.type] || reducers.DEFAULT)(state, action)
}

export default searchResultsReducer
