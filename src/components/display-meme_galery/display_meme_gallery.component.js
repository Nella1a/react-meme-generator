/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import DisplayMeme from '../display_meme/display_meme';

const memeSize = css`
  width: 200px;
  height: 200px;
`;

// const displayImg = css`
//   width:100%;
//   height: auto;
// `;



const DisplayMemeGallery = ({filteredGallery, onClickMemeChoice}) => {
  console.log("render meme gallery")
  console.log({filteredGallery})

return(filteredGallery.map(meme =>
  <button
  key={meme.id}
  css={memeSize}
 onClick={() => onClickMemeChoice(meme)}
 onKeyPress={()=>{}}
 tabIndex={0}
  >
  <DisplayMeme
    height="auto"
    width="100%"
    memeName={meme.name}
    memeUrl={meme.blank}
  />
  </button>
))

}

export default DisplayMemeGallery;