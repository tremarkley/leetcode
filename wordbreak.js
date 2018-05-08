// Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, 
// determine if s can be segmented into a space-separated sequence of one or more dictionary words.

// Note:

// The same word in the dictionary may be reused multiple times in the segmentation.
// You may assume the dictionary does not contain duplicate words.
// Example 1:

// Input: s = "leetcode", wordDict = ["leet", "code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
// Example 2:

// Input: s = "applepenapple", wordDict = ["apple", "pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
//              Note that you are allowed to reuse a dictionary word.
// Example 3:

// Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// Output: false



/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const dictionary = new Set();
  const failedStrings = new Set();
  for (let i = 0; i < wordDict.length; i += 1) {
    dictionary.add(wordDict[i]);
  }

  const recursion = (startingIndex) => {
    const stringRemaining = s.substring(startingIndex, s.length);
    if (dictionary.has(stringRemaining)) {
      return true;
    }

    if (failedStrings.has(stringRemaining)) {
      return false;
    }

    for (let i = startingIndex; i < s.length; i += 1) {
      if (dictionary.has(s.substring(startingIndex, i + 1))) {
        // take the right half and call it on that
        //everything to the left of startingIndex is a word
        dictionary.add(s.substring(0, i + 1));
        if (recursion(i + 1)) {
          return true;
        }
      }
    }
    failedStrings.add(s.substring(startingIndex, s.length));
    return false;
  }

  return recursion(0);
};

var wordBreak1 = function(s, wordDict) {
  const dictionary = new Set();
  const failedStrings = new Set();
  for (let i = 0; i < wordDict.length; i += 1) {
    dictionary.add(wordDict[i]);
  }
  // find first occurrence of word then chop string off before and after that
  const recursion = (currentString, startingIndex, endingIndex) => {
    if (startingIndex === endingIndex) {
      return true;
    }
    const stringRemaining = s.substring(startingIndex, endingIndex);
    if (failedStrings.has(stringRemaining)) {
      return false;
    }
    if (dictionary.has(stringRemaining)) {
      return true;
    }
    for (let i = 0; i < wordDict.length; i += 1) {
      const word = wordDict[i];
      const stringIndex = stringRemaining.indexOf(word);
      if (stringIndex >= 0) {
        // find starting and endingIndex
        // go on left and right side of word
        //just go on right side
        if (stringIndex === 0) {
          const newCurrentString = currentString + stringRemaining.substring(stringIndex, word.length);
          dictionary.add(newCurrentString);
          if (recursion(newCurrentString, startingIndex + stringIndex + word.length, endingIndex)) {
            dictionary.add(newCurrentString + s.substring(startingIndex + stringIndex + word.length, endingIndex));
            return true;
          };
        } else if (stringIndex + word.length === stringRemaining.length) {
          //just go on left side
          if (recursion(currentString, startingIndex, stringIndex + startingIndex)) {
            dictionary.add(currentString + s.substring(startingIndex, endingIndex));
            return true;
          };
        } else {
          // stuff on left and right side
          const endOfString = startingIndex + stringIndex + word.length;
          //left and right side
          if (recursion(currentString, startingIndex, startingIndex + stringIndex)) {
            dictionary.add(currentString + s.substring(startingIndex, endOfString));
              if (recursion(currentString, endOfString, endingIndex)) {
                dictionary.add(currentString + s.substring(startingIndex, endingIndex));
                return true;
              };
            }
          } 
        }
      }
    failedStrings.add(stringRemaining);
    return false;
  }

  return recursion('', 0, s.length);
};

console.log(wordBreak( s = "applepenapple", wordDict = ["apple", "pen"]) === true);
console.log(wordBreak( s = "leetcode", wordDict = ["leet", "code"]) === true);
console.log(wordBreak(s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]) === false);
console.log(wordBreak("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]));