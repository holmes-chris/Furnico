import React, {useState} from 'react'
import styles from "./Table.module.css"
import { Link } from 'react-router-dom'

function Table({data, path}) {
    if (!data || data.length === 0) {
        return <div>No data available</div>
    }

    const keys = data.map((object) => Object.keys(object))
   
    const headers = keys[0]
    let values = data.map((object) => Object.values(object))

    



    const dataRow = (valuesArray) => {
        return valuesArray.map((value, index) => (
            <tr className={styles["data-row"]} >
                
                <Link to={`/admin/${path}/${value[1]}`} className={`${styles["order-link"]}`}>
                {value.map((line, i) => (
                    <td  className={styles["cell" + i]}>
                        <div className={`${styles["col" + i]} ${line === "Completed" ? styles["completed"] : ""}`} >{line}</div>
                    </td>
                ))}
                </Link>
            </tr>
        )) 
    }

  return (
    <div className={styles["table-container"]}>
        <table>
            <thead>
                <tr className={styles["data-row"]}>
                    {headers.map((header, i) => (
                        <th>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dataRow(values)}
            </tbody>
        </table>
    </div>
  )
}

export default Table