import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from "./Dashboard.module.css"
import Graph from '../../../Components/Graphs/ShipmentCostGraph.js'

function Dashboard() {
    const [data, setData] = useState([])

    const handleSelectGraph = () => {
        
    }

  return (
    <div className={styles["dashboard-container"]}>
        <div className={styles["graph-container"]}>
            Development In Progress...
        </div>
        <div className={styles["select-container"]}>
            {/* <button onClick={() => handleSelect(graph1)} >Graph 1</button>
            <button onClick={() => handleSelect(graph2)}>Graph 2</button>
            <button onClick={() => handleSelect(graph3)}>Graph 3</button>
            <button onClick={() => handleSelect(graph4)}>Graph 4</button> */}
        </div>
    </div>
  )
}

export default Dashboard