import { getMainKey, getMessage } from './input.js';
import { encrypt, decrypt } from './des.js';
import { hexToBin, decodeText } from './util.js';

try {
  let key = getMainKey();
  let msg = getMessage();

  let enc = encrypt(msg, key); 
  let dec = decrypt(hexToBin(enc), key);

  console.log("Encrypted: ", enc);

  console.log("Decoded text: ", decodeText(dec));

} catch(err) {
  console.log(err);
}