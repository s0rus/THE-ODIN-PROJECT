import Logo from './Logo';
import '../styles/Header.css';

const Header = ({ currentScore, highScore }) => {
  return (
    <div className='header--container'>
      <div>
        <Logo />
      </div>
      <div>
        <h1>MEMORY GAME</h1>
      </div>
      <div>
        <p>Current Score: {currentScore}</p>
        <p>High Score: {highScore}</p>
      </div>
    </div>
  );
};

export default Header;
