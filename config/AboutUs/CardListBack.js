// CardList.js
import React from 'react';
import { Card } from 'react-bootstrap';

const CardList = ({ cards }) => {
  return (
    <div className="card-container">
      {cards.map((card) => (
        <Card key={card._id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={card.img} />
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.text}</Card.Text>
            <a href={card.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
