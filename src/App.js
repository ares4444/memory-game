import './App.css';
import React from'react';
import MemoryCard from './components/MemoryCard';
import CardsWon from './components/CardsWon';

function generateDeck() {
  const images = [
    { "src": "/images/db-goku2.jpg" },
    { "src": "/images/db-vegeta3.jpg" },
    { "src": "/images/db-gohan3.jpg" },
    { "src": "/images/db-broly1.jpg" },
    { "src": "/images/db-berus2.jpg" },
    { "src": "/images/db-frieza2.jpg" },
    { "src": "/images/db-hit2.jpg" },
    { "src": "/images/db-jiren1.jpg" },
  ];
  const deck = [];

  for (let i = 0; i < 16; i++) {
    deck.push({
      isFlipped: false,
      image: images[i % 8],
    });
  }

  shuffle(deck);
  return deck;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pairsWon() {

}

class App extends React.Component {
  constructor() {
    super();
    this.state = { deck: generateDeck(), pickedCards: [] };
  }

  pickCard(cardIndex) {
    if (this.state.deck[cardIndex].isFlipped) {
      return;
    }

    let cardToFlip = { ...this.state.deck[cardIndex] };
    cardToFlip.isFlipped = true;

    let newPickedCards = this.state.pickedCards.concat(cardIndex);
    let newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });

    if (newPickedCards.length === 2) {
      let card1Index = newPickedCards[0];
      let card2Index = newPickedCards[1];
      if (newDeck[card1Index].image !== newDeck[card2Index].image) {
        setTimeout(this.unflipCards.bind(this, card1Index, card2Index), 1000);
      }
      newPickedCards = [];
    }

    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards,
    });
  }

  unflipCards(card1Index, card2Index) {
    let card1 = { ...this.state.deck[card1Index] };
    let card2 = { ...this.state.deck[card2Index] };
    card1.isFlipped = false;
    card2.isFlipped = false;

    const newDeck = this.state.deck.map((card, index) => {
      if (index === card1Index) {
        return card1;
      }
      if (index === card2Index) {
        return card2;
      }
      return card;
    });

    this.setState({
      deck: newDeck,
    });
  }

  render() {
    let cardsJSX = this.state.deck.map((card, index) => {
      return (
        <MemoryCard
          image={card.image}
          isFlipped={card.isFlipped}
          key={index}
          pickCard={this.pickCard.bind(this, index)}
        />
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Memory Game</h1>
          <p className="Game-description">Match the DragonBall characters to win</p>
        </header>
        <button className="btn" onClick={this.newDeck}>Play Again</button>
        <div>{cardsJSX.slice(0, 4)}</div>
        <div>{cardsJSX.slice(4, 8)}</div>
        <div>{cardsJSX.slice(8, 12)}</div>
        <div>{cardsJSX.slice(12, 16)}</div>
        <div className="Pairs-Found">
          <CardsWon />
        </div>
      </div>
    );
  }
}

export default App;
