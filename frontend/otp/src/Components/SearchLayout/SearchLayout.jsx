import React, { useState, useEffect, useContext } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import "./SearchLayout.css";
import { SearchResultsList } from '../SearchResultsList/SearchResultsList';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../GlobalStateContext/GlobalStateContext';
import CartDisplay from '../CartDisplay/CartDisplay';

function SearchLayout() {
  const apiURL = process.env.REACT_APP_API_URL;
  const { isAuthenticated, existing_cart, yesterday_cart } = useContext(GlobalStateContext);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchProductData = async () => {
      const APIURL = `${apiURL}/api/auth/med_details`;
      try {
        const response = await fetch(APIURL);
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Failed to fetch product data:', error);
      }
    };
    fetchProductData();
  }, []);

  return (
    <div className="App">
      <div className="search-bar-container">
        <Searchbar setResults={setResults} />
        <SearchResultsList results={results} />
      </div>
      <CartDisplay title="Today's Order" cart={existing_cart} productData={productData} />
      <CartDisplay title="Yesterday's Order" cart={yesterday_cart} productData={productData} />
    </div>
  );
}

export default SearchLayout;
