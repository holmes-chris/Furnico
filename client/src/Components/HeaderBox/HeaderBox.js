import React from 'react'
import styles from "./HeaderBox.module.css"

function HeaderBox({icon, count, color, label}) {

    const iconColor = {
        backgroundColor: color
    }
  return (
    <div className={styles["header-box-container"]}>
        <div className={styles["icon-container"]}>
            <div className={styles["header-box-icon"]} style={iconColor} >{icon}</div>
        </div>
        <div className={styles["header-details-container"]}>
            <h2 className={styles["header-box-count"]}>{count}</h2>
            <p className={styles["header-box-label"]}>{label}</p>
        </div>
    </div>
  )
}

export default HeaderBox