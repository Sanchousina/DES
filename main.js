import { getMainKey, getMessage } from './input.js';
import { encrypt, decrypt } from './des.js';
import { hexToBin, insertSpacesInBinary, binaryStringToAscii } from './util.js';

try {
  let key = getMainKey();
  let msg = getMessage();

  let enc = encrypt(msg, key); 
  let dec = decrypt(hexToBin(enc), key);

  const spacedBinary = insertSpacesInBinary(hexToBin(dec));
  const asciiText = binaryStringToAscii(spacedBinary);

  console.log("Encrypted: ", enc);

  console.log("Decoded text: ", asciiText);

} catch(err) {
  console.log(err);
}