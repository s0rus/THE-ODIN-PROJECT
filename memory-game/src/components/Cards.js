import Card from './Card';
import '../styles/Cards.css';
import Loader from '../components/Loader.svg';

const Cards = ({ cards, loading, handleClick }) => {
  const renderCards = (cards) => {
    return (
      <div className='card--container'>
        {cards.map((card, index) => (
          <Card
            key={index}
            charId={card.id}
            image={card.img_url}
            charName={card.name}
            handleClick={(charId) => handleClick(charId)}
          />
        ))}
      </div>
    );
  };

  const isLoading = () => {
    return <img className='loader' src={Loader} alt='Loading...' />;
  };

  return loading ? isLoading() : renderCards(cards);
};

export default Cards;
