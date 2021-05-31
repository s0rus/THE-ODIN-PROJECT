import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Shop from './components/Shop';
import Product from './components/Product';
import Cart from './components/Cart';

import { CartContext } from './components/CartContext';

const Router = () => {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Switch>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/shop/:id' component={Product} />
          <Route exact path='/cart' component={Cart} />
        </CartContext.Provider>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
