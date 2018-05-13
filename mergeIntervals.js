/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
  }
 */

// Example 1:

// Input: [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
// Example 2:

// Input: [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considerred overlapping.

// [[1,4],[2,3]]

 class Interval {
   constructor(start, end) {
     this.start = start;
     this.end = end;
   }
 }

/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
var merge = function(intervals) {
  intervals.sort((a, b) => a.start - b.start);
  let outputArrayIndex = -1;
  let endOfInterval = -Infinity;
  const outputArray = [];
  for (let i = 0; i < intervals.length; i += 1) {
    if (intervals[i].start > endOfInterval) {
      outputArrayIndex += 1;
      outputArray[outputArrayIndex] = intervals[i];
      endOfInterval = intervals[i].end;
    } else {
      if (intervals[i].end > endOfInterval) {
        outputArray[outputArrayIndex].end = intervals[i].end;
        endOfInterval = intervals[i].end;
      }
    }
  }
  return outputArray;
};

console.log(merge([new Interval(2, 6), new Interval(1, 3)]));


// Might be best to sort this by the first index first. 
// Then iterate through the arrays looking at the second index and comparing it to the next items first index
// to see if there is overlap