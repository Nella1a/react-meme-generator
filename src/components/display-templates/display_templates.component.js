/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const memeSize = css`
  width: 150px;
  height: 150px;
`;

const displayImg = css`
  width:100%;
  height: auto;
`;



function DisplayTemplates(props){
  const {id, blank, name } = props.template;
  return(
  <div key={id} css={memeSize}>
  <img src={blank} alt={name} css={displayImg }/>
  </div>
)
}

export default DisplayTemplates;