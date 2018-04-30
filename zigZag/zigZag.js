// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);
// P Y A I H R
// A P L S I I

//psuedocode at j = 0 go down numRows and print each char
// then start moving in a diagonal from there i - 1, j + 1, until I reach i === 0 then go back straight down then diag  
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const convert = function(s, numRows) {
  if (numRows === 1) {
    return s;
  }
  const resultMatrix = [];
  for (let i = 0; i < numRows; i += 1) {
    resultMatrix.push([]);
  }
  let movement = 'down';
  let coordinates = 0;
  for (let i = 0; i < s.length; i += 1) {
    resultMatrix[coordinates].push(s[i]);
    if (movement === 'down') {
      if (coordinates < numRows - 1) {
        // still have more room tomove down
        coordinates += 1;
      } else {
        // need to start moving diagonal
        movement = 'diagonal';
        coordinates -= 1;
      }
    } else {
      if (coordinates > 0) {
        // continue moving diagonlally
        coordinates -= 1;
      } else {
        // start moving down
        movement = 'down';
        coordinates += 1;
      }
    }
  }
  // now we need to loop through line by line and put into string
  const resultString = [];
  for (let i = 0; i < resultMatrix.length; i += 1) {
    for (let j = 0; j < resultMatrix[i].length; j += 1) {
      if (resultMatrix[i][j] !== undefined) {
        resultString.push(resultMatrix[i][j]);
      }
    }
  }
  return resultString.join('');
};

console.log(convert("PAYPALISHIRING", 3));
console.log(convert("PAYPALISHIRING", 2));
console.log(convert("PAYPALISHIRING", 4));