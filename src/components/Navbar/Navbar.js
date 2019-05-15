import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'

export const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.verticalSeperator} />
      <Link className={styles.link} to="/">
        Search
      </Link>
      <div className={styles.verticalSeperator}>|</div>
      <Link className={styles.link} to="/saved">
        Saved
      </Link>
      <div className={styles.verticalSeperator}>|</div>
      <Link className={styles.link} to="/settings">
        Settings
      </Link>
      <div className={styles.verticalSeperator} />
    </div>
  )
}

export default Navbar
