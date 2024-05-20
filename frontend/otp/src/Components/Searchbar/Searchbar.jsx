import React, { useState } from 'react'

import { FaSearch } from "react-icons/fa"
import './Searchbar.css'

export const Searchbar = ({setResults}) =>{
  const apiURL = process.env.REACT_APP_API_URL;
  const [input, setInput] = useState("")

  const fetchData = async (value) => {

    const APIURL = `${apiURL}/api/auth/med_details`;
    try{
      const response = await fetch(APIURL);
      const data = await response.json();
      // console.log(data);
      // console.log(value);
      // const results = data;
      const results = data.filter((user)=>{
        return (
          value && 
          user && 
          user.name && 
          user.name.toLowerCase().includes(value.toLowerCase())
        );
      });
      // console.log(results);
      setResults(results);
    }
    catch{
      console.log("Error fetching the data.")
    }
  }

  const handlechange = (value) => {
    setInput(value);
    fetchData(value);
  }
  const handleFocus = (event) => {
    event.target.focus();
  };
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input className='search-bar-input' placeholder='Type to search... ' value={input} onChange={(e) => { handlechange(e.target.value) }}  onInput={(e) => { handlechange(e.target.value) }} onFocus={handleFocus} autoComplete="off"/>
    </div>
  )
}
export default Searchbar;
