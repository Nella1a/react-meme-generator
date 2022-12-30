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

  const [memeGallery, setMemeGallery] = useState([]);
  const [boxSearch, setBoxSearch] = useState("");
  const [userMemeChoice, setUserMemeChoice] = useState("");
  const [preview, setPreview] = useState(false);
  const [searchMemeGallery, setSearchMemeGallery] = useState(memeGallery)

  console.log("render")


  useEffect(() => {
    console.log("uE - initial fetch gallery")
    fetch('https://api.memegen.link/templates')
    .then((response) => response.json())
    .then((data) => setMemeGallery(data))
    .catch((error) => console.log(error));
  }, []);

  console.log({memeGallery})
  console.log({searchMemeGallery})

useEffect(() => {
  const filterMemes = memeGallery.filter((meme) =>
    meme.name.toLocaleLowerCase().includes(boxSearch))
 setSearchMemeGallery(filterMemes)

},[memeGallery, boxSearch])

 const onChangeHandler = (event) => {
    setBoxSearch(event.target.value.toLocaleLowerCase())
 }


const onClickMemeChoice = (event) => {
  console.log("chooseMeme",event)
  setUserMemeChoice(event)
  setPreview(false);
}


  return (
    <div>
       <SearchBox onChangeHandler={onChangeHandler} />
       <section css={container}>
          <article css={sectionStyle}>
            <DisplayMemeGallery filteredGallery={searchMemeGallery} onClickMemeChoice={onClickMemeChoice}/>
          </article>
        {userMemeChoice && <GenerateMeme userMemeChoice ={userMemeChoice} setUserMemeChoice={setUserMemeChoice} preview={preview} setPreview={setPreview}/> }
      </section>
   </div>

  );
}

export default App;
