/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const TextField = ({text, onChangeTextHandler}) =>
  <input
      value={text}
      onChange={onChangeTextHandler}
  />


export default TextField;