import { sha256 } from 'js-sha256';
import rl from 'readline-sync';
import { hexToBin, unicodeToBinary } from './util.js';

export function getMainKey() {
  let key = rl.question('Please enter 64-bit Key in text: ');
  key = hexToBin(sha256.create(key)).slice(0, 64);
  
  return key;
}

export function getMessage() {
  let msg = rl.question('Please enter the message you want to encrypt: ');
  msg = unicodeToBinary(msg);

  if (!msg) throw new Error("The message shouldn't be empty");
  else return msg;
}