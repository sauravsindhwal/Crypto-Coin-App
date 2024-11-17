import React, { useContext } from 'react'
import './Coin.css'
import { useState, useEffect } from 'react'
import { CoinContext } from '../../Context/CoinContext'
import { useParams } from 'react-router-dom'
import LineChart from '../../Components/LineChart/LineChart'

const Coin = () => {
  const {currency} = useContext(CoinContext);
  const {coinId} = useParams()
  const [cryptoCoin, setCryptoCoin] = useState();
  const [historicalCrypto, setHistoricalCrypto] = useState();

  const fetchCryptoCoin = async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Kp7rrDJGpcpjDXSnLMaaBkjk'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCryptoCoin(response))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData = async()=>{
    const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`, options)
  .then(response => response.json())
  .then(response => setHistoricalCrypto(response))
  .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCryptoCoin();
    fetchHistoricalData();
  }, [currency])

if(cryptoCoin && historicalCrypto){
  return (
    <div className="coin">
    <div className="coin-name">
      <img src={cryptoCoin.image.large} alt="" />
      <p><b>{cryptoCoin.name} ({cryptoCoin.symbol.toUpperCase()})</b></p>
    </div>
    <div className="coin-chart">
    <LineChart historicalCrypto={historicalCrypto}/>
    </div>
    <div className="coin-info">
      <ul>
        <li>Crypto Market Rank</li>
        <li>{cryptoCoin.market_cap_rank}</li>
      </ul>
      <ul>
        <li>Current Price</li>
        <li>{currency.symbol} {cryptoCoin.market_data.current_price[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>Market Cap</li>
        <li>{currency.symbol} {cryptoCoin.market_data.market_cap[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour High</li>
        <li>{currency.symbol} {cryptoCoin.market_data.high_24h[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour Low</li>
        <li>{currency.symbol} {cryptoCoin.market_data.low_24h[currency.name].toLocaleString()}</li>
      </ul>
    </div>

  </div>
 
)
}else{
  return(
    <div className="spinner">
    <div className="spin"></div>
    </div>
  )
}

}

export default Coin