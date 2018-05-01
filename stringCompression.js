// Given an array of characters, compress it in-place.

// The length after compression must always be smaller than or equal to the original array.

// Every element of the array should be a character (not int) of length 1.

// After you are done modifying the input array in-place, return the new length of the array.\

const addCount = (count, array, insertObj) => {
  const stringCount = count.toString();
  for (let i = 0; i < stringCount.length; i += 1) {
    array[insertObj.index++] = stringCount[i];
  }
}

const stringCompression = (stringArray) => {
  if (stringArray.length === 0) {
    return 0;
  } 
  let insert = { index: 1 };
  let charCount = 1;
  let currentChar = stringArray[0];
  for (let i = 1; i < stringArray.length; i += 1) {
    if (currentChar !== stringArray[i]) {
      // then it is time to insert in the insertIndex
      if (charCount > 1) {
        addCount(charCount, stringArray, insert)
      }
      charCount = 0;
      currentChar = stringArray[i];
      stringArray[insert.index++] = currentChar;
    }
    charCount += 1;
  }
  if (charCount > 1) {
    addCount(charCount, stringArray, insert);
  }
  return insert.index;
}

console.log(stringCompression(["a","a","b","b","c","c","c"]));
console.log(stringCompression(['a']));
console.log(stringCompression(["a","b","b","b","b","b","b","b","b","b","b","b","b"]));