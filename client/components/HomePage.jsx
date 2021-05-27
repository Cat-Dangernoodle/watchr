import React, { useState } from 'react';
import MovieInput from './MovieInput.jsx';
import DisplayContainer from './DisplayContainer.jsx';
import './styles/HomePage.css';

// local state variables for streaming services and poster URL that are being passed down to MovieInput and Display Container
const HomePage = () => {
  const [posterUrl, setPosterUrl] = useState(
    'https://image.tmdb.org/t/p/w342/1qELdgcbbDjlpDDRwdYTl2MzuVu.jpg',
  );
  const [amazon, setAmazon] = useState(true);
  const [hulu, setHulu] = useState(true);
  const [netflix, setNetflix] = useState(true);

  const handleResponse = (data) => {
    data.amazon ? setAmazon(true) : setAmazon(false);
    data.hulu ? setHulu(true) : setHulu(false);
    data.netflix ? setNetflix(true) : setNetflix(false);

    setPosterUrl(data.poster);
  };

  // rendering poster and streaming services
  return (
    <div id="homepage-container">
      <MovieInput onResponse={handleResponse} />
      <DisplayContainer
        posterUrl={posterUrl}
        streams={[amazon, hulu, netflix]}
      />
    </div>
  );
};

export default HomePage;
