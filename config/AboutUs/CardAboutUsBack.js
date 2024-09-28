import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from "./CardList";

const CardsAbautUs = () => {
  const [cardInfo, setCardInfo] = useState([]);

  // Obtener datos de la API
  useEffect(() => {
    axios.get('http://localhost:5000/about-us')
      .then((response) => {
        setCardInfo(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos', error);
      });
  }, []);

  return (
    <div>
      <CardList cards={cardInfo} />
    </div>
  );
};

export default CardsAbautUs;
