// Given a time represented in the format "HH:MM", form the next closest time by reusing the current digits. There is no limit on how many times a digit can be reused.

// You may assume the given input string is always valid. For example, "01:34", "12:09" are all valid. "1:34", "12:9" are all invalid.

// Example 1:

// Input: "19:34"
// Output: "19:39"
// Explanation: The next closest time choosing from digits 1, 9, 3, 4, is 19:39, which occurs 5 minutes later.  It is not 19:33, because this occurs 23 hours and 59 minutes later.
// Example 2:

// Input: "23:59"
// Output: "22:22"
// Explanation: The next closest time choosing from digits 2, 3, 5, 9, is 22:22. It may be assumed that the returned time is next day's time since it is smaller than the input time numerically.


/**
 * @param {string} time
 * @return {string}
 */
var nextClosestTime = function(time) {
    let differenceInMinutes = 0;
    let newTimeArray = [];
    let originalTime = [];
    let digits = {};
    let digitsArray = [];
    for (let i = 0; i < time.length; i += 1) {
      if (time[i] !== ':') {
        const digit = +time[i];
        originalTime.push(digit);
        if (digits[digit] === undefined) {
          digits[digit] = i;
          digitsArray.push(digit);
        }
      }
    }
    digitsArray.sort();
    digitsArray.forEach((digit, index) => {
      digits[digit] = index;
    });
    let index = 3;
    let foundNextGreater = false;
    while (index >= 0 && !foundNextGreater) {
      let max = 9;
      if (index === 2) {
        max = 5;
      }
      if (index === 1 && originalTime[0] === 2) {
        max = 3;
      }
      if (index === 0) {
        max = 2;
      }
      foundNextGreater = selectNextDigit(max, originalTime[index], newTimeArray, index, digits, digitsArray);
      index -= 1;
    }
    fillInRemainingArray(originalTime, newTimeArray);
    return `${newTimeArray[0]}${newTimeArray[1]}:${newTimeArray[2]}${newTimeArray[3]}`
};

const selectNextDigit = (max, digit, resultArray, index, digitsLocations, digitsArray) => {
  const size = digitsLocations[digit];
  if (size !== digitsArray.length - 1 && digitsArray[size + 1] <= max) {
    const nextBiggest = digitsArray[size + 1];
    resultArray[index] = nextBiggest;
    return true;
  }
  resultArray[index] = digitsArray[0];
  return false;
}

const fillInRemainingArray = (originalTime, newTimeArray) => {
  for (let i = 0; i < newTimeArray.length; i += 1) {
    if (newTimeArray[i] === undefined) {
      newTimeArray[i] = originalTime[i];
    }
  }
}

console.log(nextClosestTime("23:59"));
console.log(nextClosestTime("19:34"));

