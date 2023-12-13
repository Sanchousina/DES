// const rl = require('readline-sync');
// const sha256 = require('js-sha256').sha256;

import rl from 'readline-sync';
import { sha256 } from 'js-sha256';

const NUM_OF_LEFT_SHIFTS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

const S = [
  [
      14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
      0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
      4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
      15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
  ],
  [
      15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
      3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
      0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
      13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
  ],
  [
      10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
      13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
      13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
      1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
  ],
  [
      7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
      13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
      10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
      3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
  ],
  [
      2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
      14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
      4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
      11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
  ],
  [
      12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
      10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
      9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
      4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
  ],
  [
      4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
      13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
      1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
      6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
  ],
  [
      13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
      1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
      7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
      2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
  ]
];

function unicodeToHex(str) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    const hex = str[i].charCodeAt().toString(16);
    res += hex;
  }
  return res;
}

function hexToUnicode(str) {
  let res = "";
  for (let i = 0; i < str.length; i+=2) {
    const unicode = String.fromCharCode(parseInt(str.substr(i, 2), 16));
    res += unicode;
  }
  return res;
}

const decToBin = (dec) => (parseInt(dec, 10)).toString(2).padStart(4, "0");

export function hexToBin(hex) {
  hex = hex.toString(16)
  let res = "";
  for (let i = 0; i < hex.length; i+=2) {
    const bin = (parseInt(hex.substr(i, 2), 16).toString(2)).padStart(8, "0");
    res += bin;
  }
  return res;
}

function binToHex(bin) {
  bin = bin.toString(2);
  let res = "";
  for (let i = 0; i < bin.length; i+=4) {
    const hex = (parseInt(bin.substr(i, 4), 2).toString(16));
    res += hex;
  }
  return res;
}

export function unicodeToBinary(unicodeString) {
  let binaryString = '';
  for (let i = 0; i < unicodeString.length; i++) {
    const codePoint = unicodeString.charCodeAt(i);
    const binaryRepresentation = codePoint.toString(2).padStart(16, '0');
    binaryString += binaryRepresentation;
  }
  return binaryString;
}

export function binaryStringToAscii(binaryString) {
  const binaryArray = binaryString.split(' ');
  const asciiArray = binaryArray.map(binary => String.fromCharCode(parseInt(binary, 2)));
  return asciiArray.join('');
}

export function insertSpacesInBinary(binaryString) {
  return binaryString.match(/.{8}/g).join(' ');
}

function splitInputToBlocks(input, blockSize) {
  let res = [];
  for (let i = 0; i < input.length; i+=blockSize) {
    let block = input.slice(i, Math.min(i+blockSize, input.length));
    
    while (block.length < blockSize) {
      block += '0';
    }
    res.push(block);
  }
  return res;
}

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

const shiftString = (str, shift) => str.slice(shift, str.length) + str.slice(0, shift);

function keyScheduling(key) {
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

function checkWeakKeys(leftKey, rightKey) {
  let leftKeyInHex = binToHex(leftKey.join(""));
  let rightKeyInHex = binToHex(rightKey.join(""));
  // console.log("L: ", leftKeyInHex);
  // console.log("R: ", rightKeyInHex);
  if (leftKeyInHex === "0000000" || leftKeyInHex === "FFFFFFF" &&
  rightKeyInHex === "0000000" || leftKeyInHex === "FFFFFFF") throw new Error(`Weak key is detected: ${leftKeyInHex+rightKeyInHex}`);
}

function initialPermutation(block) {
  return [
    block[57], block[49], block[41], block[33], block[25], block[17], block[9], block[1],
    block[59], block[51], block[43], block[35], block[27], block[19], block[11], block[3],
    block[61], block[53], block[45], block[37], block[29], block[21], block[13], block[5],
    block[63], block[55], block[47], block[39], block[31], block[23], block[15], block[7],
    block[56], block[48], block[40], block[32], block[24], block[16], block[8], block[0],
    block[58], block[50], block[42], block[34], block[26], block[18], block[10], block[2],
    block[60], block[52], block[44], block[36], block[28], block[20], block[12], block[4],
    block[62], block[54], block[46], block[38], block[30], block[22], block[14], block[6]
  ];
}

function expansionPermutation(block) {
  return [
    block[31], block[0], block[1], block[2], block[3], block[4],
    block[3], block[4], block[5], block[6], block[7], block[8],
    block[7], block[8], block[9], block[10], block[11], block[12],
    block[11], block[12], block[13], block[14], block[15], block[16],
    block[15], block[16], block[17], block[18], block[19], block[20],
    block[19], block[20], block[21], block[22], block[23], block[24],
    block[23], block[24], block[25], block[26], block[27], block[28],
    block[27], block[28], block[29], block[30], block[31], block[0]
    ]
}

function finalRoundPermutation(block) {
  return [ 
    block[15], block[6], block[19], block[20],
    block[28], block[11], block[27], block[16],
    block[0], block[14], block[22], block[25],
    block[4], block[17], block[30], block[9],
    block[1], block[7], block[23], block[13],
    block[31], block[26], block[2], block[8],
    block[18], block[12], block[29], block[5],
    block[21], block[10], block[3], block[24]
  ]
}

function finalPermutation(block) {
  return [
    block[39], block[7], block[47], block[15], block[55], block[23], block[63], block[31],
    block[38], block[6], block[46], block[14], block[54], block[22], block[62], block[30],
    block[37], block[5], block[45], block[13], block[53], block[21], block[61], block[29],
    block[36], block[4], block[44], block[12], block[52], block[20], block[60], block[28],
    block[35], block[3], block[43], block[11], block[51], block[19], block[59], block[27],
    block[34], block[2], block[42], block[10], block[50], block[18], block[58], block[26],
    block[33], block[1], block[41], block[9], block[49], block[17], block[57], block[25],
    block[32], block[0], block[40], block[8], block[48], block[16], block[56], block[24]
  ]
}

function stringXOR (str1, str2, len) {
  let xor = Array(len);
  for (let i = 0; i < len; i++) {
    xor[i] = (str1[i] === str2[i] ? 0 : 1);
  }
  return xor.join("");
}

function sBoxesOutput(b) {
  return b.map((group, sBox) => {
    let row = parseInt(group[0] + group[5], 2);
    let col = parseInt(group.slice(1, 5), 2);

    return decToBin(S[sBox][16 * row + col]);
  }).join("");
}

function calculateEntropy(data) {
  let sum = 0;
  let numOf1 = 0, numOf0 = 0;
  for (let i = 0; i < data.length; i++){
    if (data[i] === '1') numOf1++;
    if (data[i] === '0') numOf0++;
  }
  let probOf1 = numOf1/data.length;
  let probOf0 = numOf0/data.length;

  sum += probOf1 * (Math.log2(probOf1)*-1);
  sum += probOf0 * (Math.log2(probOf0)*-1);
  return sum;
}

function DES(msg, roundKeys) {
  const blocks = splitInputToBlocks(msg, 64);
  let result = "";

  for (let i = 0; i < blocks.length; i++) {

    let currBlock = initialPermutation(blocks[i]);

    let L = currBlock.slice(0, currBlock.length/2);
    let R = currBlock.slice(currBlock.length/2);

    let prevL = L, prevR = R;

    for (let i = 0; i < 16; i++) {
      L = prevR;

      let entropyL = calculateEntropy(L);

      let expandedR = expansionPermutation(R).join("");

      let xorRK = stringXOR(expandedR, roundKeys[i], 48);
    
      let bBoxes = splitInputToBlocks(xorRK, 6);
      let sBoxes = sBoxesOutput(bBoxes);
      let finalRoundP = finalRoundPermutation(sBoxes).join("");

      R = stringXOR(prevL, finalRoundP, 32);

      let entropyR = calculateEntropy(R);

      prevL = L;
      prevR = R;

      console.log(`Entropy for L block, round ${i} : ${entropyL.toFixed(2)}`);
      console.log(`Entropy for R block, round ${i} : ${entropyR.toFixed(2)}`);
    }

    let pair = R + L;
    let encMsg = finalPermutation(pair).join("");

    result += encMsg;

  }

  return binToHex(result).toUpperCase();
}

export const encrypt = (msg, key) => DES(msg, keyScheduling(key));
export const decrypt = (encMsg, key) => DES(encMsg, keyScheduling(key).reverse());





