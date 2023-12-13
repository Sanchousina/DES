import { getMainKey, getMessage } from './des/input.js';
import { encrypt, decrypt } from './des/des.js';
import { decodeText } from './des/util.js';

try {
  let key = getMainKey();
  let msg = getMessage();

  let enc = encrypt(msg, key); 
  let dec = decrypt(enc, key);

  console.log("Encrypted: ", enc);
  console.log("Decoded text: ", decodeText(dec));

} catch(err) {
  console.log(err);
}