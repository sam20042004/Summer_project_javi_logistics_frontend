import React from 'react';
import './CartDisplay.css';

const CartDisplay = ({ title, cart, productData }) => {
  const getProductDetails = (productId) => {
    return productData.find(product => product.id === productId);
  };

  return (
    <div className="cart-display">
      <h2>{title}</h2>
      {Object.keys(cart).length === 0 ? (
        <p className="no-order">No Order</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Product Name</th>
              <th>Manufacturer Name</th>
              <th>Packaging</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(cart).map(([productId, quantity], index) => {
              const product = getProductDetails(productId);
              if (product) {
                return (
                  <tr key={productId} className="cart-item">
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.manufacturer_name}</td>
                    <td>{product.pack_size_label}</td>
                    <td>{quantity}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartDisplay;
