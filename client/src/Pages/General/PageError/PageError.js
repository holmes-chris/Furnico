import React from 'react'
import {Link } from "react-router-dom"
import styles from "./PageError.module.css"

function PageError() {
  return (
    <div className={styles["page-error-container"]}>
        <h1 className={styles["error-header"]}>404 Error</h1>
        <p className={styles["error-message"]}>Page not found :(</p>
        <Link to="/" className={styles["home-link"]}>
          <button className={styles["home-bttn"]}>
            <p>Home</p>
          </button>
        </Link>

    </div>
  )
}

export default PageError