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



const DisplayMemeGallery = ({template, onClickMemeChoice}) => {
  console.log("render meme gallery")
/*   console.log("template blank: ", template.blank)
  console.log("template url: ", template.url)
  console.log("template preview: ", preview) */

  return(
  <button
  key={template.id}
  css={memeSize}
 onClick={() => onClickMemeChoice(template)}
 onKeyPress={()=>{}}
 tabIndex={0}
  >
  <DisplayMeme
    height="auto"
    width="100%"
    memeName={template.name}
    memeUrl={template.blank}
  />
  </button>
)
}

export default DisplayMemeGallery;