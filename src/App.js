import './App.css';
import React, { useEffect, useState } from 'react';

// import { json } from 'stream/consumers';
// import { GetMemesFromServer } from './GetImagesFromServer';

// const regex = /src="https([^"]+)"/gi;
// const regex = /"blank":"https([^"]+).png/gi;
// const regex = /(https([^"]+\.png))/gi;
const regex = /"blank":"(https([^"]+\.png))/gi;
const regexTwo = /"blank":"/gi;

// Use fetch to get url of imgs
let arrayUrlImages = [];
const GetImagesFromServer = () => {
  const [user, setAppState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const user = `https://api.memegen.link/templates`;
    fetch(user)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      });
  }, [setAppState]);

  const stringTest = JSON.stringify(user); // get img-data from server

  arrayUrlImages = stringTest.match(regex) + ',';
  const arrayUrlImages2 = arrayUrlImages.replace(regexTwo, ''); // cut down string to urls
  const usingSplit = arrayUrlImages2.split(','); // Split string into array by ,
  console.log(typeof usingSplit);

  return (
    <>
      <section>
        {/* //loop over meme array */}
        {usingSplit.map((d) => (
          <img
            key="" // unique ID is missing
            src={d}
            alt=""
            style={{
              width: '100px',
              height: '100px',
              marginRight: '5px',
            }}
          />
        ))}
      </section>
      <h1>STRING</h1>
      <div>ARRAYURL {arrayUrlImages}</div>
      <div>ARRAYURL {arrayUrlImages2}</div>
    </>
  );
};

function App() {
  return <GetImagesFromServer />;
}

export default App;
