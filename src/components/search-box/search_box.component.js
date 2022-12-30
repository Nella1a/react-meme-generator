/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const searchBoxContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SearchBox = ({onChangeHandler}) => {
  console.log("render search-box")
  return(
  <div css={searchBoxContainer}>
    <input
    type="search"
    placeholder="search meme"
    onChange={onChangeHandler}
    />
  </div>)
}

export default SearchBox;