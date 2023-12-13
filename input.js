import rl from 'readline-sync';

export function getMainKey() {
  // test key - 133457799BBCDFF1
  const key = rl.question('Please enter 64-bit Key in text: ');

  // if (key.length !== 16) throw new Error('The key has to be 64-bit')
  // else return key;
}

export function getMessage() {
  // test message - Lorem ipsum dolor sit amet, consetetur sadipscing elitr
  const msg = rl.question('Please enter the message you want to encrypt: ');

  if (!msg) throw new Error("The message shouldn't be empty");
  else return msg;
}