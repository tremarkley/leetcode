/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let nLeft = matrix[0].length;
    let n = matrix[0].length;
    const innerFunc = function(offset) {
      if (nLeft <= 1) {
        return;
      }
      for (let i = offset; i < n - 1 - offset; i += 1) {
        move(matrix, i, offset);
      }
      nLeft -= 2;
      innerFunc(offset + 1);
    };
    innerFunc(0);
};

var move = function(matrix, startingIndex, offset) {
  let n = matrix[0].length;
  let temp = undefined;
  let next = matrix[offset][startingIndex];
  temp = matrix[startingIndex][n - 1 - offset];
  matrix[startingIndex][n - 1 - offset] = next;
  next = temp;
  temp = matrix[n - 1 - offset][n - 1 - startingIndex];
  matrix[n - 1 - offset][n - 1 - startingIndex] = next;
  next = temp;
  temp = matrix[n - 1 - startingIndex][offset]
  matrix[n - 1 - startingIndex][offset] = next;
  next = temp;
  matrix[offset][startingIndex] = next
}
