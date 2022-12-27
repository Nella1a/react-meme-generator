import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import DisplayTemplates from './components/display-templates/display_templates.component';
import SearchBox from './components/search-box/search_box.component';

const sectionStyle = css`
 display: grid;
 grid-template-columns: repeat(5, 1fr);
 gap: .3rem;

`;


const memeSize = css`
  width: 150px;
  height: 150px;
`;

const displayImg = css`
  width:100%;
  height: auto;
`;


function App() {
  // const [topText, setTopText] = useState('');
  // const [botText, setBotText] = useState('');
  // const [specificMeme, setSpecificMeme] = useState('');
  // const [generatedMeme, setgeneratedMeme] = useState();
  // const [memeTemplateSelector, setMemeTemplateSelector] = useState('');
  // const [enter, setEnter] = useState(false);

  const [memeTemplates, setMemeTemplates] = useState([]);
  const [boxSearch, setBoxSearch] = useState("");


  useEffect(() => {
    fetch('https://api.memegen.link/templates')
    .then((response) => response.json())
    .then((data) => setMemeTemplates(data))
    .catch((error) => alert(error));

  }, []);


 const onChangeHandler = (event) => {
    setBoxSearch(event.target.value.toLocaleLowerCase())
 }

  const filterMemes = memeTemplates.filter((meme) =>
    meme.name.toLocaleLowerCase().includes(boxSearch)
    )




  return (
    <section >
      <SearchBox onChangeHandler={onChangeHandler} />
      <article css={sectionStyle}>
      {filterMemes.map((template) =>
      <DisplayTemplates template={template} key={template.id}/>
      )}
    </article>
    </section>

  );
}

export default App;
