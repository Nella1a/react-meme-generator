/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import DisplayMemeGallery from './components/display-meme_galery/display_meme_gallery.component';
import GenerateMeme from './components/generate-meme/generate_meme';
import SearchBox from './components/search-box/search_box.component';

const container = css`
display: grid;
grid-template-columns: repeat(2, 1fr) ;
gap: 1rem;

`;

const sectionStyle = css`
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 //gap: .3rem;
 width: 50%;
`;





const App = () => {
  // const [topText, setTopText] = useState('');
  // const [botText, setBotText] = useState('');
  // const [specificMeme, setSpecificMeme] = useState('');
  // const [generatedMeme, setgeneratedMeme] = useState();
  // const [memeTemplateSelector, setMemeTemplateSelector] = useState('');
  // const [enter, setEnter] = useState(false);

  const [memeTemplates, setMemeTemplates] = useState([]);
  const [boxSearch, setBoxSearch] = useState("");
  const [userMemeChoice, setUserMemeChoice] = useState("");
  const [preview, setPreview] = useState(false);

  console.log("render")


  useEffect(() => {
    console.log("uE - initial fetch gallery")
    fetch('https://api.memegen.link/templates')
    .then((response) => response.json())
    .then((data) => setMemeTemplates(data))
    .catch((error) => console.log(error));
  }, []);


 const onChangeHandler = (event) => {
    setBoxSearch(event.target.value.toLocaleLowerCase())
 }

const onClickMemeChoice = (event) => {
  console.log("chooseMeme",event)
  setUserMemeChoice(event)
  setPreview(false);
}

const filterMemes = memeTemplates.filter((meme) =>
    meme.name.toLocaleLowerCase().includes(boxSearch)
    )

  return (
    <div>
       <SearchBox onChangeHandler={onChangeHandler} />
       <section css={container}>
          <article css={sectionStyle}>
            {filterMemes.map((template) =>
            <DisplayMemeGallery template={template} key={template.id} onClickMemeChoice={onClickMemeChoice}/>
            )}
          </article>
        {userMemeChoice && <GenerateMeme userMemeChoice ={userMemeChoice} setUserMemeChoice={setUserMemeChoice} preview={preview} setPreview={setPreview}/> }
      </section>
   </div>

  );
}

export default App;
