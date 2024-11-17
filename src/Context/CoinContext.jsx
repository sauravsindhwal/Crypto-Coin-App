
import { createContext, useEffect, useState } from "react";
export const CoinContext = createContext();

const CoinContextProvider = (props) =>{

const [coin, setCoin] = useState([])
const [currency, setCurrency] = useState(
    {name:'usd', symbol: '$'}
)

const fetchAll = async() =>{
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Kp7rrDJGpcpjDXSnLMaaBkjk'}
      };
      
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
        .then(response => response.json())
        .then(response => setCoin(response))
        .catch(err => console.error(err));
}

useEffect(()=>{
    fetchAll()
}, [currency])

const contextValue = {
coin, currency, setCurrency
}
return(
    <CoinContext.Provider value={contextValue}>
{props.children}
    </CoinContext.Provider>
)
}

export default CoinContextProvider;