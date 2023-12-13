export function decodeText(decryptedText) {
  const spacedBinary = insertSpacesInBinary(hexToBin(decryptedText));
  const asciiText = binaryStringToAscii(spacedBinary);

  return asciiText
}

export function stringXOR (str1, str2, len) {
  let xor = Array(len);
  for (let i = 0; i < len; i++) {
    xor[i] = (str1[i] === str2[i] ? 0 : 1);
  }
  return xor.join("");
}

export const shiftString = (str, shift) => str.slice(shift, str.length) + str.slice(0, shift);

export function splitInputToBlocks(input, blockSize) {
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

function insertSpacesInBinary(binaryString) {
  return binaryString.match(/.{8}/g).join(' ');
}

function binaryStringToAscii(binaryString) {
  const binaryArray = binaryString.split(' ');
  const asciiArray = binaryArray.map(binary => String.fromCharCode(parseInt(binary, 2)));
  return asciiArray.join('');
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

export function binToHex(bin) {
  bin = bin.toString(2);
  let res = "";
  for (let i = 0; i < bin.length; i+=4) {
    const hex = (parseInt(bin.substr(i, 4), 2).toString(16));
    res += hex;
  }
  return res;
}

export function hexToBin(hex) {
  hex = hex.toString(16)
  let res = "";
  for (let i = 0; i < hex.length; i+=2) {
    const bin = (parseInt(hex.substr(i, 2), 16).toString(2)).padStart(8, "0");
    res += bin;
  }
  return res;
}

export const decToBin = (dec) => (parseInt(dec, 10)).toString(2).padStart(4, "0");

export function unicodeToHex(str) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    const hex = str[i].charCodeAt().toString(16);
    res += hex;
  }
  return res;
}

export function hexToUnicode(str) {
  let res = "";
  for (let i = 0; i < str.length; i+=2) {
    const unicode = String.fromCharCode(parseInt(str.substr(i, 2), 16));
    res += unicode;
  }
  return res;
}