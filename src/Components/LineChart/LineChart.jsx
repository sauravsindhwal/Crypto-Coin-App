import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historicalCrypto}) => {
    const [data, setData] = useState([['Date', 'Prices']])
    useEffect(()=>{
        let dataCopy = [['Date', 'Prices']];

        if (historicalCrypto.prices) {
            historicalCrypto.prices.forEach((item) => {
              dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0, -5)}`, item[1]]);
            });
            setData(dataCopy);
          }
        }, [historicalCrypto]);
        
  return (
    
    <Chart 
    chartType='LineChart'
    data={data}
    height= '100%'
legendToggle
    />

  )
}

export default LineChart