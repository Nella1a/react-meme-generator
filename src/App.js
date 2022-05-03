import './App.css';
/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import axios from 'axios';
// import styled from '@emotion/styled';
import React, { Component, ReactDOM, useEffect, useState } from 'react';

const sectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`;

const galleryStyle = css`
  width: 600px;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;
const DivTwoStyle = css`
  width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const memeSize = css`
  width: 80px;
  height: auto;
`;

const memeTemplateStyle = css`
  width: 90%;
  height: auto;
`;

function App() {
  const [topText, setTopText] = useState('');
  const [botText, setBotText] = useState('');
  const [specificMeme, setSpecificMeme] = useState('');
  const [generatedMeme, setgeneratedMeme] = useState({ hello: [] });
  const [memeTemplateSelector, setMemeTemplateSelector] = useState('');
  const [enter, setEnter] = useState(false);
  const [memeTemplate, setMemeTemplate] = useState(
    'https://api.memegen.link/images/preview.jpg',
  );

  // fetch('https://api.memegen.link/templates')
  //   .then((response) => response.json())
  //   .then((data) => setgeneratedMeme(data))
  //   .catch((error) => setgeneratedMeme(error));

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://api.memegen.link/templates');
      setgeneratedMeme({ hello: result.data });
    };
    fetchData();
  }, []);

  // // Type in a keyword and get a meme wich match that keyword
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(
  //       `https://api.memegen.link/images?filter=${topText}`,
  //     );
  //     console.log(result.data[0].url);
  //     console.log(topText);
  //   };
  //   fetchData();
  // }, [topText]);

  const handlePressedButton = (pressedButton) => {
    if (pressedButton.key === 'Enter') {
      setEnter(true);
    } else {
      setEnter(false);
    }
  };
  console.log(enter, memeTemplateSelector);
  useEffect(() => {
    if (enter && memeTemplateSelector) {
      const authOptions = {
        method: 'post',
        url: `https://api.memegen.link/images/automatic`,
        data: JSON.stringify({
          text: memeTemplateSelector,
          safe: true,
          redirect: true,
        }),
        json: true,
      };

      axios(authOptions)
        .then((response) => {
          console.log(
            response.request.responseURL,
            response.request.responseid,
          );
          const image = response.request.responseURL;
          setMemeTemplate(image);
        })
        .catch(
          (error) => {
            alert(error);
          },
          [memeTemplateSelector],
        );
      // } else if (topText !== "" || botText !== "" ){
      //   useEffect(() => {
      //     if (enter && memeTemplateSelector) {

      //       const authOptions = {
      //         method: 'post',
      //         url: `https://api.memegen.link/image/`,
      //         data: JSON.stringify({
      //           text: memeTemplateSelector,
      //           safe: true,
      //           redirect: true,
      //         }),
      //         json: true,
      //       };

      //       axios(authOptions)
      //         .then((response) => {
      //           console.log(
      //             response.request.responseURL,
      //             response.request.responseid,
      //           );
      //           const image = response.request.responseURL;
      //           setMemeTemplate(image);
      //         })
      //         .catch(
      //           (error) => {
      //             alert(error);
      //           },
      //           [topText, botText],
      //         );
    }
  });
  console.log('MTemplate:', memeTemplate);
  return (
    <section css={sectionStyle}>
      <div css={galleryStyle}>
        {generatedMeme.hello.map((event) => (
          <div
            key={event.id}
            onClick={(meme) => {
              setMemeTemplate(event.blank);
            }}
            onKeyDown={(event) => {
              setMemeTemplate(event.blank);
            }}
            role="button"
            tabIndex="0"
          >
            <img
              src={event.blank}
              alt="meme"
              style={{ width: '80px', height: '80px' }}
            />
          </div>
        ))}
      </div>

      <div css={DivTwoStyle}>
        <section>
          {' '}
          <img
            css={memeTemplateStyle}
            src={memeTemplate}
            alt="meme"
            data-test-id="meme-image"
          />{' '}
        </section>
        <ul>
          <li>
            <label htmlFor="Top text">Template </label>
            <input
              onChange={(event) => setMemeTemplateSelector(event.target.value)}
              onKeyPress={handlePressedButton}
              id="Top text"
            />
          </li>
          <li>
            <label htmlFor="Top text">Top Line: </label>
            <input
              onChange={(event) => setTopText(event.target.value)}
              id="Top text"
            />
          </li>
          <li>
            <label htmlFor="Bottom text">Bottom Line</label>
            <input
              onChange={(event) => setBotText(event.target.value)}
              id="Top text"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default App;
