import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styles from './App.module.scss'
import configureStore from './reducers/store'
import Navbar from './components/Navbar/Navbar'
import Titlebar from './components/Titlebar/Titlebar'
import SearchResults from './containers/SearchResults'
import SavedPets from './containers/SavedPets'
import UserSettings from './containers/UserSettings'

const reduxStore = configureStore()

const App = () => {
  return (
    <Provider store={reduxStore}>
      <Router>
        <div className={styles.CoreApp}>
          <div className={styles.bar}>
            <Titlebar />
          </div>
          <div className={styles.pageContent}>
            <Route exact path="/" component={SearchResults} />
            <Route path="/saved" component={SavedPets} />
            <Route path="/settings" component={UserSettings} />
            <div className={styles.nav}>
              <Navbar />
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
