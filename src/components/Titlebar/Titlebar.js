import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Titlebar.module.scss'

export const Titlebar = () => {
  return (
    <div className={styles.bar}>
      <Link className={styles.link} to="/">
        <h1>Best Friend Finder</h1>
      </Link>
    </div>
  )
}

export default Titlebar
