// Given a 2D matrix matrix, find the sum of the elements inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

// Range Sum Query 2D
// The above rectangle (with the red border) is defined by (row1, col1) = (2, 1) and (row2, col2) = (4, 3), which contains sum = 8.

// Example:
// Given matrix = [
//   [3, 0, 1, 4, 2],
//   [5, 6, 3, 2, 1],
//   [1, 2, 0, 1, 5],
//   [4, 1, 0, 1, 7],
//   [1, 0, 3, 0, 5]
// ]

// sumRegion(2, 1, 4, 3) -> 8
// update(3, 2, 2)
// sumRegion(2, 1, 4, 3) -> 10
// Note:
// The matrix is only modifiable by the update function.
// You may assume the number of calls to update and sumRegion function is distributed evenly.
// You may assume that row1 ≤ row2 and col1 ≤ col2.

/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
    this.data = matrix;
    this.sums = [];
    initialize(this.sums, this.data);
};

const initialize = (outputMatrix, matrix) => {
  for (let i = 0; i < matrix.length; i += 1) {
    outputMatrix.push([]);
    for (let j = 0; j < matrix[0].length; j += 1) {
      const top = i - 1 >= 0 ? outputMatrix[i - 1][j] : 0;
      const left = j - 1 >= 0 ? outputMatrix[i][j - 1] : 0;
      const diagonal = i - 1 >= 0 && j - 1 >= 0 ? outputMatrix[i - 1][j - 1] : 0;
      outputMatrix[i][j] = top + left - diagonal + matrix[i][j];
    }
  }
}

/** 
 * @param {number} row 
 * @param {number} col 
 * @param {number} val
 * @return {void}
 */
NumMatrix.prototype.update = function(row, col, val) {
  // for updates we need to look at previous value and then adjust the sum of the region
  const prevValue = this.data[row][col];
  this.data[row][col] = val;
  const changeInValue = val - prevValue;
  for (let i = row; i < this.data.length; i += 1) {
    for (let j = col; j < this.data[0].length; j += 1) {
      this.sums[i][j] += changeInValue;
    }
  }
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    const sumFromTopLeft = this.sums[row2][col2];
    const top = row1 - 1 >= 0 ? this.sums[row1 - 1][col2] : 0;
    const left = col1 - 1 >= 0 ? this.sums[row2][col1 - 1] : 0;
    const diagonal = row1 - 1 >= 0 && col1 - 1 >= 0 ? this.sums[row1 - 1][col1 - 1] : 0;
    return sumFromTopLeft - top - left + diagonal;
};

const matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]

var obj = new NumMatrix(matrix);
console.log(obj.sumRegion(0, 0, 2, 2));
obj.update(0, 0, 4);
console.log(obj.sumRegion(0, 0, 2, 2));
// obj.update(row,col,val)
// var param_2 = obj.sumRegion(row1,col1,row2,col2)

/** 
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = Object.create(NumMatrix).createNew(matrix)
 * obj.update(row,col,val)
 * var param_2 = obj.sumRegion(row1,col1,row2,col2)
 */
