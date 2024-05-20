import React, { useState, useContext, useEffect } from 'react'
import "./SearchResult.css"
import { GlobalStateContext } from "../GlobalStateContext/GlobalStateContext";

export const SearchResult = ({ result }) => {
  const apiURL = process.env.REACT_APP_API_URL;
  const { isAuthenticated, setIsAuthenticated, user_details, setUserDetails, existing_cart, setExistingCart, yesterday_cart, setYesterdaycart } = useContext(GlobalStateContext);
  const [needchange, setNeedchange] = useState(false);

  const increasequantity = () => {
    setExistingCart(existing_cart => {
      if (existing_cart[result.id] !== undefined) {
        return {
          ...existing_cart,
          [result.id]: (parseInt(existing_cart[result.id], 10) + 1).toString()
        };
      }
      else {
        return {
          ...existing_cart,
          [result.id]: "1"
        };
      }
    });
    setNeedchange(true);
  }

  const decreasequantity = () => {
    if (existing_cart[result.id] !== undefined && existing_cart[result.id] !== "0") {
      setExistingCart(existing_cart => {
        if (existing_cart[result.id] === '1') {
          if(Object.keys(existing_cart).length === 1)
            {
              return {};
            }
          const nstate = {...existing_cart};
          delete nstate[result.id];
          return{
            ...nstate
          };
        }
        else {
          return {
            ...existing_cart,
            [result.id]: (parseInt(existing_cart[result.id], 10) - 1).toString()
          };
        }

      });
    }
    setNeedchange(true);
  }

  useEffect(() => {
    if (needchange === true) {
      setNeedchange(false);
      const cartData = {
        user_id: user_details.id,
        cart: Object.fromEntries(
          Object.entries(existing_cart).map(([productId, quantity]) => [productId, parseInt(quantity, 10)])
        ),
      };
      console.log(cartData);
      postCartData(cartData);
    }
  }, [existing_cart, user_details]);

  const postCartData = async (data) => {
    try {
      const response = await fetch(`${apiURL}/api/auth/postcart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to post cart data');
      }

      const result = await response.json();
      console.log('Cart data posted successfully:', result);
    } catch (error) {
      console.error('Error posting cart data:', error);
    }
  };




  return (
    <div className='search-result'>
      <div className='product-info'>
        <h2 className='product-name'>{result.name}</h2>
        <h3 className='product-manufacturer'>By - {result.manufacturer_name}</h3>
        <p className='product-size'>{result.pack_size_label}</p>
      </div>

      <div className="counter-container">
        <button className='counter-button' onClick={decreasequantity}>-</button>
        <div className='counter-value'>{existing_cart[result.id] !== undefined ? existing_cart[result.id] : 0}</div>
        <button className='counter-button' onClick={increasequantity}>+</button>
      </div>
    </div>
  )
}
