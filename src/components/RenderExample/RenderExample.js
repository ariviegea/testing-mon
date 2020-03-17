import React, { useEffect, useState } from 'react'
const axios = require('axios');

const RenderExample = () => {
  const[countries, setCountries] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
         .then(res => {
           setCountries(res.data);
           setLoad(true);
         })
         .catch(err => {
           setError(err.message);
           setLoad(true)
         })
  },[])

  if(load) {
    return (
      <ul>
        {error ? 
        <li>{error.message}</li> 
        : countries.map((country, index) => <li key={index}>{country.name}</li>)}
      </ul>
    )
  } else {
    return(
      <div>
        Loading...
      </div>
    )
  }

}

export default RenderExample;