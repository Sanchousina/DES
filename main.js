import { sha256 } from 'js-sha256';
import { getMainKey, getMessage, hexToBin, unicodeToBinary, encrypt, decrypt, insertSpacesInBinary, binaryStringToAscii } from './des.js';

try {
  let key = getMainKey();
  let msg = getMessage();
  //let key = "133457799BBCDFF1";

  //let key = "0101010101010101"; // - weak key

  //key = hexToBin(key);
  key = hexToBin(sha256.create(key)).slice(0, 64);
  msg = unicodeToBinary(msg);

  //msg = hexToBin(msg);

  let enc = encrypt(msg, key); 
  let dec = decrypt(hexToBin(enc), key);

  const spacedBinary = insertSpacesInBinary(hexToBin(dec));
  const asciiText = binaryStringToAscii(spacedBinary);

  console.log("Encrypted: ", enc);

  console.log("Decoded text: ", asciiText);

} catch(err) {
  console.log(err);
}