// There is a garden with N slots. In each slot, there is a flower. The N flowers will bloom one by one in N days. In each day, there will be exactly one flower blooming and it will be in the status of blooming since then.

// Given an array flowers consists of number from 1 to N. Each number in the array represents the place where the flower will open in that day.

// For example, flowers[i] = x means that the unique flower that blooms at day i will be at position x, where i and x will be in the range from 1 to N.

// Also given an integer k, you need to output in which day there exists two flowers in the status of blooming, and also the number of flowers between them is k and these flowers are not blooming.

// If there isn't such day, output -1.

// Example 1:
// Input: 
// flowers: [1,3,2]
// k: 1
// Output: 2
// Explanation: In the second day, the first and the third flower have become blooming.
// Example 2:
// Input: 
// flowers: [1,2,3]
// k: 1
// Output: -1

const checkFlowers = (position, flowersInBloom, k) => {
  // check to make sure k flowers between are all not in bloom
  if (flowersInBloom[position + k + 1]) {
    for (let i = position + 1; i < position + k + 1; i += 1) {
      if (flowersInBloom[i]) {
        return false;
      }
    }
    return true;
  }

  if (flowersInBloom[position - k - 1]) {
    for (let i = position - 1; i > position - k - 1; i -= 1) {
      if (flowersInBloom[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

/**
 * @param {number[]} flowers
 * @param {number} k
 * @return {number}
 */
var kEmptySlots = function(flowers, k) {
    const flowersInBloom = {};
    for (let i = 0; i < flowers.length; i += 1) {
      position = flowers[i];
      flowersInBloom[position] = true;
      if (checkFlowers(position, flowersInBloom, k)) {
        return i + 1;
      }
    }
    return -1;
};

console.log(kEmptySlots([1,3,2], 1));