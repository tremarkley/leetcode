// There are two sorted arrays nums1 and nums2 of size m and n respectively.

// Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

// Example 1:
// nums1 = [1, 3]
// nums2 = [2]

// [1] [3] i = 1
// [2]     j = 1

// The median is 2.0
// Example 2:
// nums1 = [1, 2]
// nums2 = [3, 4]

// [1] [2]
// [3] [4]
// [1, 2]
//        [3, 4]

// [1]
//    

// [1, 2, 3, 4]
// [13, 17, 25, 88]
// [5, 20, 33, 40]

// [5, 13, 17, 20, 25, 33, 40, 80]
// [5, 20] [33, 40]
// [13, 17] [25, 88]

// [13, 17, 25]
// [5, 20, 33, 40]

// [5, 13, 17, 20, 25, 33, 40]
// [13, 17]  [25]
// [5, 20]   [33, 40]
// The median is (2 + 3)/2 = 2.5

const calculateLongerArrayCut = (array1, array2, shorterArrayCut) => {
  return Math.floor((array1.length + array2.length + 1)/ 2) - shorterArrayCut;
}

const getMax = (a, b) => a > b ? a : b;

const getMin = (a, b) => a < b ? a : b;

const calculateMedian = (array) => {
  if (array.length === 0) {
    return undefined;
  }
  if (array.length % 2 !== 0) {
    const medianIndex = Math.floor(array.length / 2);
    return array[medianIndex];
  } 
  // have an even number length so need to take two numbers around middle and divide by 2
  const medianIndex1 = Math.floor(array.length / 2);
  return (array[medianIndex1] + array[medianIndex1 - 1]) / 2;
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function(nums1, nums2) {
  if (nums1.length === 0) {
    return calculateMedian(nums2);
  }

  if (nums2.length === 0) {
    return calculateMedian(nums1);
  }

  const longerArray = nums1.length >= nums2.length ? nums1 : nums2;
  const shorterArray = nums1.length < nums2.length ? nums1 : nums2;

  let minCutShorterArray = 0;
  let maxCutShorterArray = shorterArray.length;
  let foundMedian = false;
  let maxValueLeft;
  let minValueRight;
  while (!foundMedian) {
    const shorterArrayCut = Math.floor((minCutShorterArray + maxCutShorterArray) / 2);
    const longerArrayCut = calculateLongerArrayCut(nums1, nums2, shorterArrayCut);
    const longerArrayLeftMax = longerArrayCut === 0 ? -Infinity : longerArray[longerArrayCut - 1];
    const shorterArrayLeftMax = shorterArrayCut === 0 ? -Infinity : shorterArray[shorterArrayCut - 1];
    const longerArrayRightMin = longerArrayCut === longerArray.length ? Infinity : longerArray[longerArrayCut];
    const shorterArrayRightMin = shorterArrayCut === shorterArray.length ? Infinity : shorterArray[shorterArrayCut];
    if (shorterArrayLeftMax <= longerArrayRightMin && longerArrayLeftMax <= shorterArrayRightMin) {
      // found our match
      foundMedian = true;
      //get max value from left side and min value from right side
      maxValueLeft = getMax(shorterArrayLeftMax, longerArrayLeftMax);
      minValueRight = getMin(shorterArrayRightMin, longerArrayRightMin);
    } else if (shorterArrayLeftMax > longerArrayRightMin) {
      // need to move shorterArrayCut left
      maxCutShorterArray = shorterArrayCut - 1;
    } else {
      // need to move shorterArrayCut right
      minCutShorterArray = shorterArrayCut + 1;
    }
  }
  if ((nums1.length + nums2.length) % 2 !== 0) {
    //if odd return max on left side
    return maxValueLeft;
  }
  return ((maxValueLeft + minValueRight) / 2); 
};

const nums1 = [1, 2]
const nums2 = [3, 4]

console.log(findMedianSortedArrays(nums1, nums2) === 2.5);
console.log(findMedianSortedArrays([1, 3], [2]) === 2);
console.log(findMedianSortedArrays([13, 17, 25], [5, 20, 33, 40]) === 20); 
