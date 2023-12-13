import { shiftString, binToHex } from "./util.js";

const NUM_OF_LEFT_SHIFTS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

export function keyScheduling(key) {
  let roundKeys = [];
  
  key = pc1(key);
  let c0 = key.slice(0, key.length/2);
  let d0 = key.slice(key.length/2);

  checkWeakKeys(c0, d0);
  
  let prevC0 = c0.join(''), prevD0 = d0.join('');

  NUM_OF_LEFT_SHIFTS.forEach((shift, i) => {
    c0 = shiftString(prevC0, shift);
    d0 = shiftString(prevD0, shift);
    prevC0 = c0;
    prevD0 = d0;
    let pair = c0 + d0;
    roundKeys.push(pc2(pair).join(''));
  });

  return roundKeys;
}

function pc1(key) {
  return [
    key[56], key[48], key[40], key[32], key[24],
    key[16], key[8], key[0], key[57], key[49],
    key[41], key[33], key[25], key[17], key[9],
    key[1], key[58], key[50], key[42], key[34], key[28],
    key[18], key[10], key[2], key[59], key[51], key[43], key[35],
    key[62], key[54], key[46], key[38], key[30], key[22], key[14],
    key[6], key[61], key[53], key[45], key[37], key[29], key[21],
    key[13], key[5], key[60], key[52], key[44], key[36], key[28],
    key[20], key[12], key[4], key[27], key[19], key[11], key[3]
  ]
}

function pc2(key) {
  return [
    key[13], key[16], key[10], key[23], key[0], key[4],
    key[2], key[27], key[14], key[5], key[20], key[9],
    key[22], key[18], key[11], key[3], key[25], key[7],
    key[15], key[6], key[26], key[19], key[12], key[1],
    key[40], key[51], key[30], key[36], key[46], key[54],
    key[29], key[39], key[50], key[44], key[32], key[47],
    key[43], key[48], key[38], key[55], key[33], key[52],
    key[45], key[41], key[49], key[35], key[28], key[31]
  ]
}

function checkWeakKeys(leftKey, rightKey) {
  let leftKeyInHex = binToHex(leftKey.join(""));
  let rightKeyInHex = binToHex(rightKey.join(""));
  
  if (leftKeyInHex === "0000000" || leftKeyInHex === "FFFFFFF" &&
  rightKeyInHex === "0000000" || leftKeyInHex === "FFFFFFF") throw new Error(`Weak key is detected: ${leftKeyInHex+rightKeyInHex}`);
}