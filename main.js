// const rl = require('readline-sync');
// const sha256 = require('js-sha256').sha256;

import rl from 'readline-sync';
import { sha256 } from 'js-sha256';
import { getMainKey, getMessage, hexToBin, unicodeToBinary, encode, decode, insertSpacesInBinary, binaryStringToAscii } from './des.js';

try {
  let key = getMainKey();
  let msg = getMessage();
  //let key = "133457799BBCDFF1";

  //let key = "0101010101010101"; // - weak key

  //key = hexToBin(key);
  key = hexToBin(sha256.create(key)).slice(0, 64);
  msg = unicodeToBinary(msg);

  //msg = hexToBin(msg);

  let enc = encode(msg, key); 
  let dec = decode(hexToBin(enc), key);

  const spacedBinary = insertSpacesInBinary(hexToBin(dec));
  const asciiText = binaryStringToAscii(spacedBinary);

  console.log("Encrypted: ", enc);

  console.log("Decoded text: ", asciiText);

} catch(err) {
  console.log(err);
}