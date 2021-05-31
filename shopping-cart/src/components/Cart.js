import { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import '../styles/Cart.css';
import Button from './Button';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cart.reduce((a, v) => a + v.price * v.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const increaseQuantity = (itemId) => {
    setCart(
      cart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : {
              ...item,
            },
      ),
    );
  };

  const decreaseQuantity = (itemId) => {
    setCart(
      cart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : {
              ...item,
            },
      ),
    );
  };

  const deleteItem = (itemId) => {
    const newCart = cart.filter((item) => item.id !== itemId);

    setCart(newCart);
  };

  const content = () => {
    return cart.length ? (
      <div className='cart--container'>
        <div className='cart--items'>
          {cart.map((item) => (
            <div className='cart--item' key={item.id}>
              <img src={item.img} alt={item.name} />
              <div className='cart--item--details'>
                <h1>{item.name}</h1>
                <h1>${item.price}</h1>
                <h3>QUANTITY</h3>
                <div className='cart--item--quantity'>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <p>{item.quantity}</p>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button
                  className='cart--item--delete'
                  onClick={() => deleteItem(item.id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='cart--checkout'>
          <Button label='CHECKOUT' onClick={() => setCart([])} />
          <h1>Total: ${totalPrice}</h1>
        </div>
      </div>
    ) : (
      <div className='cart--container'>
        <h1>CART IS EMPTY</h1>
      </div>
    );
  };

  return content();
};

export default Cart;
