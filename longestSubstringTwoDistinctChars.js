// Given a string s, find the length of the longest substring t that contains at most 2 distinct characters.

// Example 1:

// Input: "cecebeeea"
// Output: 3
// Explanation: t is "ece" which its length is 3.
// Example 2:

// Input: "ccaabbb"
// Output: 5
// Explanation: t is "aabbb" which its length is 5.

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const addNewNode = (head, char, i) => {
  let newNode = new Node ([char, i]);
  if (!head) {
    head = newNode;
  } else {
    head.next = null;
    newNode.next = head;
    head = newNode; 
  }
  return head;
}

const findNode = (head, char) => {
  if (!head) {
    return null;
  }

  if (head.data[0] === char) {
    return head;
  }

  if (!head.next) {
    return null;
  }

  if (head.next.data[0] === char) {
    return head.next;
  }
  
  return null
}

const updateOccurence = (head, node, i) => {
  if (node !== head) {
    const prevHead = head;
    node.next = head;
    head = node;
    prevHead.next = null;
  }
  node.data[1] = i;
  return head;
}

const calculateStartingIndex = (head) => {
  if (!head) {
    return 0;
  }

  if (!head.next) {
    return 0;
  }

  return head.next.data[1] + 1;
}

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {
    let head = null;
    let maxLength = 0;
    let currentLength = 0;
    let startingIndex = 0;
    for (let i = 0; i < s.length; i += 1) {
      currentLength += 1;
      const char = s[i];
      const node = findNode(head, char);
      if (!node) {
        //look at tail and re-calculate currentLength
        startingIndex = calculateStartingIndex(head);
        currentLength = i - startingIndex + 1;
        head = addNewNode(head, char, i);
      } else {
        head = updateOccurence(head, node, i);
      }
      if (currentLength > maxLength) {
        maxLength = currentLength;
      }
    }
    return maxLength;
};

console.log(lengthOfLongestSubstringTwoDistinct("cecebeeea"));
console.log(lengthOfLongestSubstringTwoDistinct("ccaabbb"));
console.log(lengthOfLongestSubstringTwoDistinct("eceba"));

// iterate over string and keep track of two chars
// could keep track of them in an array
// when you see a new char come in put it at the beginning of the array and push the other over?
// maybe it is better to use a linked list for this
// when you get to a new char check to see if it is equal to the head
// if not then go to the tail and check if it is equal to that
// if it is not then pop off tail and put new char on head
// how do we keep track of the length though
// need to get rid of the length of the distance between the first occurence and the last occurrence
// when you see a char, check if it is in list, if it is update last occurence,
// if it is not then get rid of the least recently used and make a new node containing a triple with the char, the first, 
// and the last occurence 