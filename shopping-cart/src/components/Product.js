import { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';
import productDetails from '../products.json';
import Button from '../components/Button';
import '../styles/Product.css';

const Product = ({ match }) => {
  const { cart, setCart } = useContext(CartContext);
  const [product, setProduct] = useState(productDetails[match.params.id - 1]);

  const handleAddToCart = (productId) => {
    if (cart.some((item) => item.id === productId)) {
      const newProduct = {
        ...product,
        quantity: product.quantity + 1,
      };
      setProduct(newProduct);
      const filteredCart = cart.filter((item) => item.id !== productId);
      const targetItem = cart.filter((item) => item.id === productId);
      targetItem[0].quantity++;
      setCart([...filteredCart, ...targetItem]);
    } else {
      const newProduct = {
        ...product,
        quantity: 1,
      };
      setCart((prevCart) => [...prevCart, newProduct]);
    }
  };

  return (
    <div className='product--details--container'>
      <div className='product--details--info'>
        <img src={product.img} alt={product.name}></img>
        <h1>{product.name}</h1>
        <h2>${product.price}</h2>
      </div>
      <div className='product--details--handler'>
        <Button
          label='ADD TO CART'
          onClick={() => handleAddToCart(product.id)}
        />
      </div>
    </div>
  );
};

export default Product;
