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
  candidates.sort((a,b) => a - b);
  const results = [];
  const innerFunction = (currArr, target, index) => {
    if (target === 0) {
      results.push(currArr.slice());
      return;
    }
    for (let i = index; i < candidates.length; i += 1) {
      if (target >= candidates[i]) {
        const newTarget = target - candidates[i];
        currArr.push(candidates[i]);
        innerFunction(currArr, newTarget, i);
        currArr.pop();
      } else {
        return;
      }
    }
  }
  innerFunction([], target, 0);
  return results;
};

const test = combinationSum([3,12,9,11,6,7,8,5,4], 15);
console.log(test);
