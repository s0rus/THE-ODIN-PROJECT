import '../styles/Card.css';

const Card = ({ charId, image, charName, handleClick }) => {
  return (
    <div
      key={charId}
      className='card--wrapper'
      onClick={() => handleClick(charId)}
    >
      <div className='card--image'>
        <img src={image} alt={charName} />{' '}
      </div>
      <div className='card--title'>{charName}</div>
    </div>
  );
};

export default Card;
