import { useEffect, useState } from 'react';
import Header from './components/Header';
import Cards from './components/Cards';

function App() {
  const BASE_URL = 'https://finalspaceapi.com/api/v0/character?limit=';
  const CARD_AMOUNT = '12';
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    const fetchedData = await fetch(`${BASE_URL}${CARD_AMOUNT}`);
    const data = await fetchedData.json();

    setCards(data.sort(() => 0.5 - Math.random()));
    setLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleScore = (charId) => {
    setClickedCards((prevCards) => [...prevCards, charId]);
    const newScore = currentScore + 1;
    setCurrentScore(newScore);
    if (newScore > highScore) setHighScore(newScore);
  };

  const resetGame = () => {
    setClickedCards([]);
    setCurrentScore(0);
  };

  const handleClick = (charId) => {
    clickedCards.includes(charId) ? resetGame() : handleScore(charId);
    fetchCards();
  };

  return (
    <div className='game--container'>
      <Header currentScore={currentScore} highScore={highScore} />
      <Cards
        cards={cards}
        loading={loading}
        handleClick={(charId) => handleClick(charId)}
      />
    </div>
  );
}

export default App;
