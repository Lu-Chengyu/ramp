import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [flag, setFlag] = useState('');
  const [displayFlag, setDisplayFlag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlag = async () => {
      const response = await fetch('https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/707265');
      const text = await response.text();
      setFlag(text);
      setLoading(false);
    };

    fetchFlag();
  }, []);

  useEffect(() => {
    if (!loading) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setDisplayFlag((prev) => prev + flag[currentIndex]);
        currentIndex += 1;
        if (currentIndex === flag.length-1) {
          clearInterval(interval);
        }
      }, 500);
    }
  }, [loading, flag]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {displayFlag.split('').map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

// Script used to extract URL:
// let url = '';
// const elements = document.querySelectorAll('code[data-class^="23"] div[data-tag$="93"] span[data-id*="21"] i.char');
// elements.forEach(element => {
//     url += element.getAttribute('value');
// });
// console.log(url);