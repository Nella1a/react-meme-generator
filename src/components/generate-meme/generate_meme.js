/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import DisplayMeme from '../display_meme/display_meme';
import TextField from '../text-field/text_field';

const memeSize = css`
  width: 300px;
  height: auto;
`;

/* const container = css`
display: grid;
grid-template-columns: 1fr 1fr;
`;
 */

const  GenerateMeme = ({userMemeChoice, setUserMemeChoice, preview, setPreview}) => {
  const [textTop, setTextTop] = useState("");
  const [textBottom, setTextBottom] = useState("");
  const [customMemeRespUrl, setCustomMemeRespUrl] = useState(false);
  const [url, setUrl] = useState("");
 // console.log("userMeme in GenereateMeme", userMemeChoice)
console.log("render generate meme")
console.log({preview})
  const onChangeTextTopHandler = (event) => {
    setTextTop(event.target.value)
  }

  const onChangeTextBottomHandler = (event) => {
     setTextBottom(event.target.value)
   }

const onChangePreviewHandler = () => {
  console.log({userMemeChoice})
  if(textTop || textBottom){
    console.log({textTop, textBottom})

    // setUserMemeChoice(customMeme)

    const baseUrl = "https://api.memegen.link/images/"+ userMemeChoice.id ;
    let customMemeUrl= "";

    if(textTop && textBottom){
      customMemeUrl = `/${textTop}/${textBottom}.png`;
      }
      else {
        customMemeUrl = textTop ? `/${textTop}.png` : `/_/${textBottom}.png`
    }
    setUrl(baseUrl+customMemeUrl);
     setPreview(true)
  }

}


   useEffect(() => {
    console.log("UE: generate Meme");
   // console.log("preview", preview)

      console.log("URL:", url)
      if(preview){
        fetch(url)
        .then((response) => response)
        .then((data) =>{
          console.log("data:", data)
          setCustomMemeRespUrl(data)
         // setTextTop("")
         // setTextBottom("")
        })
        .catch((error) => console.log(error));

     }
   },[preview, url])



/*    useEffect(() => {
    const baseUrl = "https://api.memegen.link/images";
    console.log(userMeme.id)


    if(preview && (textBottom || textTop)){
      const fetchCustomMeme = async () => {
       const response =  await fetch(baseUrl, {
          method: "POST",
          body: JSON.stringify({
            id: userMeme.id,
            text: [textTop,textBottom]
          })
       })
       const data = await response.json()
       console.log(data)

      }
// console.log("customMeme:", customMeme)
console.log("fetchCustomMeme:", fetchCustomMeme)

    }
    setPreview(false);
  }, [preview])
 */

  const memeUrl = !preview ? userMemeChoice.blank : customMemeRespUrl.url;
  // const memePredefinedUrl = userMemeChoice.example.url;
  // console.log("example: ", memePredefinedUrl)
  return (

  <article>
  <div css={memeSize}>
    <h2>Your Custom Meme</h2>
    <DisplayMeme
      height="90%"
      width="100%"
      memeName={userMemeChoice.name}
      memeUrl={memeUrl}
    />
    </div>
    <div>
      Top:
      <TextField
          text={textTop}
          onChangeTextHandler={onChangeTextTopHandler}
        />
      </div>
      <div>
      Bottom:
      <TextField
        text={textBottom}
        onChangeTextHandler={onChangeTextBottomHandler}
        />
    </div>
    <div>
      <button onClick={onChangePreviewHandler}>Preview</button>
    </div>
  </article>
  //  <article>
  //   <h1> Predefined Meme</h1>
  //   <DisplayMeme
  //     height="auto"
  //     width="50%"
  //     memeName={userMemeChoice.name}
  //     memeUrl={memePredefinedUrl}
  //   />
  // </article>
  )

}

export default GenerateMeme;