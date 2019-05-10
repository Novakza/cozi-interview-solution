import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.scss'

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Search</Link>
          </li>
          <li>
            <Link to="/saved">Saved</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/saved" component={Saved} />
        <Route path="/settings" component={Settings} />
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

function Saved() {
  return (
    <div>
      <h2>Saved</h2>
    </div>
  )
}

function Settings() {
  return (
    <div>
      <h2>Settings</h2>
    </div>
  )
}

export default App
