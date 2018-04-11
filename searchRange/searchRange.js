/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

const findLeftIndex = function findLeftIndex(nums, target) {
  let leftIndex = 0;
  let rightIndex = nums.length - 1;
  while (leftIndex <= rightIndex) {
    let middleIndex = Math.floor((rightIndex + leftIndex) / 2);
    if (nums[middleIndex] === target) {
      if (nums[middleIndex - 1] === undefined || nums[middleIndex - 1] !== target) {
        return middleIndex;
      }
      rightIndex = middleIndex - 1;
    } else if (nums[middleIndex] > target) {
        rightIndex = middleIndex - 1;
    } else {
      leftIndex = middleIndex + 1;
    }
  }
  return;
}

const findRightIndex = function findRightIndex(nums, target, leftIndex) {
  if (nums[leftIndex + 1] === undefined || nums[leftIndex + 1] !== target) {
    return leftIndex;
  }
  let rightIndex = nums.length - 1;
  while (leftIndex <= rightIndex) {
    const middleIndex = Math.floor((rightIndex + leftIndex) / 2);
    if (nums[middleIndex] === target) {
      if (nums[middleIndex + 1] === undefined || nums[middleIndex + 1] !== target) {
        return middleIndex;
      }
      leftIndex = middleIndex + 1; 
    } else if (nums[middleIndex] < target) {
      leftIndex = middleIndex + 1;
    } else {
      rightIndex = middleIndex - 1;
    }
  }
}

const searchRange = function searchRange(nums, target) {
  if (nums.length === 0) {
    return [-1, -1];
  }
  const leftIndex = findLeftIndex(nums, target);
  if (leftIndex === undefined) {
    return [-1, -1];
  }
  return [leftIndex, findRightIndex(nums, target, leftIndex)];
};

console.log(searchRange([1, 2, 2, 3, 4, 4, 5], 4));

