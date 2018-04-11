// Given a set of candidate numbers (C) (without duplicates) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.

// The same repeated number may be chosen from C unlimited number of times.

// For example, given candidate set [2, 3, 6, 7] and target 7, 
// A solution set is: 
// [
//   [7],
//   [2, 2, 3]
// ]

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    //  loop through each, see if number itself is modulo is 0 or if modulo is equal to another number in list
      // if modulo is 0 just do the division then create an array with all the same number
      //  if modulo is not 0 check to see if any numbers in the list equal that number
        //  if they do then divide target by number then add  the modulo to the array
  candidates.sort();
  const results = [];
  const innerFunction = function innerFunction(index, currArr, target) {
    if (target === 0) {
      results.push(currArr);
      return;
    }
    if (target < 0) {
      return;
    }
    for (let i = index; i < candidates.length; i += 1) {
      if (target < candidates[i]) {
        return;
      }
      if (currArr.length === 0) {
        innerFunction(i, [candidates[i]], target - candidates[i]);
      } else {
        const nextArr = currArr.slice();
        nextArr.push(candidates[i]);
        innerFunction(i, nextArr, target - candidates[i]);
      }
    }
  }
  innerFunction(0, [], target);
  return results;
};

const test = combinationSum([2, 3, 6, 7], 7);
console.log(test);
