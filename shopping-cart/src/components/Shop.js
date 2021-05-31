import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Shop.css';
import initialState from '../products.json';

const Shop = () => {
  const [products] = useState(initialState);

  return (
    <div className='products--container'>
      {products.map((product) => (
        <Link key={product.id} to={`/shop/${product.id}`}>
          <div className='product--container'>
            <img src={product.img} alt={product.name}></img>
            <div>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Shop;
