import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import '../styles/Navbar.css';

import { CartContext } from '../components/CartContext';

function Navbar() {
  const { cart } = useContext(CartContext);
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(() => {
    const newItemQuantity = cart.reduce((a, v) => a + v.quantity, 0);
    setItemQuantity(newItemQuantity);
  }, [cart]);

  return (
    <div className='navbar--container'>
      <Link to='/'>
        <Logo />
      </Link>
      <div className='navbar--links'>
        <Link to='/shop'>
          <Button label='SHOP' />
        </Link>
        <Link to='/cart'>
          <Button label={`CART [${itemQuantity}]`} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
