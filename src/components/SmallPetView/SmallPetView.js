import React from 'react'
import styles from './SmallPetView.module.scss'

export const SmallPetView = props => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <img className={styles.thumbnail} src={props.img} alt={props.name} />
      <p className={styles.title}>
        {`${props.name}, ${props.age}yr, ${props.sex}`}
      </p>
      <p className={styles.description}>{props.profile}</p>
    </div>
  )
}

export default SmallPetView
