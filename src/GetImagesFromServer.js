import axios from 'axios';
import { useState } from 'react';

const regex = /src="https([^"]+)"/gi;
const { get } = axios;
let dataFromServer;
let arrayUrlImages = [];
const arrayOfTenImg = [];

get('https://api.memegen.link/templates/').then((response) => {
  if (response.status === 200) {
    dataFromServer = response.data;

    // extraxt url-images from server respond
    arrayUrlImages = dataFromServer.match(regex);
  }
});
console.log(dataFromServer);

//     // loop over array, get first 10 imgs, remove src= && "", save url in new array
//     for (let i = 0; i < 10; i++) {
//       arrayOfTenImg[i] = arrayUrlImages[i].slice(
//         5,
//         arrayUrlImages[i].length - 1,
//       );

//       const url = arrayOfTenImg[i];

//       // create a writable stream and save the received data stream to path
//       https.get(url, (res) => {
//         let path;

//         i !== 9
//           ? (path = `./meme/0${i + 1}.jpg`)
//           : (path = `./meme/${i + 1}.jpg`);

//         const writeStream = fs.createWriteStream(path);
//         res.pipe(writeStream);

//         writeStream.on('finish', () => {
//           writeStream.close();
//           console.log('Download Completed');
//         });
//       });
//     }
//   })
//   .catch((err) => console.error(err));

// export function GetMemesFromServer() {
//   return null;
// }

export function GetMemesFromServer() {
  return JSON.stringify(dataFromServer);
}
