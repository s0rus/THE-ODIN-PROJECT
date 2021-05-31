import { Link } from 'react-router-dom';
import Button from './Button';
import Keycaps from '../images/home--keycaps.jpg';

import '../styles/Home.css';

const Home = () => {
  return (
    <div className='home--container'>
      <div className='home--content--left'>
        <h1>
          We are a leader of putting all <br /> your key-cap needs in one place!
          <br />
          If you are a keyboard enthusiast,
          <br />
          consider shopping now as
          <br />
          our stock gets low quickly!
        </h1>
        <Link to='/shop'>
          <Button label='SHOP NOW' />
        </Link>
      </div>
      <div className='home--content--right'>
        <img src={Keycaps} alt='keycaps' />
      </div>
    </div>
  );
};

export default Home;
