import React from 'react'
import styles from "./Header.module.css"

function Header({title}) {
  return (
    <div className={styles['header-container']}>
        <h1 className={styles['header-title']}>{title}</h1>
    </div>
  )
}

export default Header