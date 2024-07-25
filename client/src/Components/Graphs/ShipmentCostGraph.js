import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styles from "./ShipmentCostGraph.module.css"
import Plot from "react-plotly.js"
import moment from "moment"

function ShipmentCostGraph() {
  const [data, setData] = useState({ shipmentDates: [], shipmentCosts: [], avgCosts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/shipment_costs');
        const shipments = response.data;

        const shipmenntDates = shipments.map((s) => moment(s.shipmentDate).format("MM-DD-YYYY HH:mm:ss"));
        const shipmentCosts = shipments.map((s) => s.shipmentCost)

      
      } catch (err) {

      }
    }
  })


  return (
    <Plot 
      // data={[
      //   {
      //     x: data.x,
      //     y: data.y,
      //     type: type,
      //     mode: 'lines+markers',
      //     marker: { color: 'red'},
      //   },
      // ]}
      // layout={layout}
    />
  )
}

export default ShipmentCostGraph