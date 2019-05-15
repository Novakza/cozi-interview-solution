import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'

// Import reducers
import savedPetsReducer from './savedPetsReducer'
import searchResultsReducer from './searchResultsReducer'
import userSettingsReducer from './userSettingsReducer'
import { saveState } from './localStorage'

export default function configureStore(initialState) {
  const reducer = combineReducers({
    savedPets: savedPetsReducer,
    searchResults: searchResultsReducer,
    settings: userSettingsReducer
  })
  // capture the Redux Devtools compose if its available (allowing the addon to capture the state)
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(apiMiddleware))
  )
  store.subscribe(() => {
    saveState({
      savedPets: store.getState().savedPets
    })
  })
  return store
}
