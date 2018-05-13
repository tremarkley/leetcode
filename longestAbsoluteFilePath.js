// Suppose we abstract our file system by a string in the following manner:

// The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:

// dir
//     subdir1
//     subdir2
//         file.ext
// The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.

// The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:
// ['dir, 'subdir1', '\tfile.ext', '\tsubsubdir1', 'subdir2', '\tsubsubdir2', '\t\tfile2.ext']
// if the next item doesnt start with \t then pop off stack
// split on \n
// ['dir', '\tsubdir1', '\t\tfile1.ext', '\t\tsubsubdir1', '\tsubdir2', '\t\tsubsubdir2, \t\t\tfile2.ext]
// loop through this array then inside each element split on \t then you can get the depth 
// you can figure out which one it goes under by looking at the previous entry

// dir
//     subdir1
//         file1.ext
//         subsubdir1
//     subdir2
//         subsubdir2
//             file2.ext
// The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a file file2.ext.

// We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its length is 32 (not including the double quotes).

// Given a string representing the file system in the above format, return the length of the longest absolute path to file in the abstracted file system. If there is no file in the system, return 0.

// Note:
// The name of a file contains at least a . and an extension.
// The name of a directory or sub-directory will not contain a ..
// Time complexity required: O(n) where n is the size of the input string.

// Notice that a/aa/aaa/file1.txt is not the longest file path, if there is another path aaaaaaaaaaaaaaaaaaaaa/sth.png.

// to start we could split on \n\t
// children of a directory contain an additional \t
// to find the parent directory of the child you would have to go back to the next directory that has one less \t
// lets seeit starts at di then goes to subdir from subdir we look for anything that has \t if it doesnt then thats the base case
// keep track of current file path and always check that against a maximum

class directoryTree {
  constructor(data, depth = 0) {
    this.data = data;
    this.depth = depth;
    this.isFile = data.indexOf('.') === -1 ? false : true;
    this.children = [];
  }
}

const constructTree = (inputString, currentIndex) => {
  const directories = inputString.split('\n');
  let initialDirectory = new directoryTree(directories[0]);
  const stack = [];
  stack.push(initialDirectory);
  for (let i = 1; i < directories.length; i += 1) {
    let levels = directories[i].split('\t');
    if (levels.length === 1) {
      levels = directories[i].split('    ');
    }
    const depth = levels.length - 1;
    const item = new directoryTree(levels[levels.length - 1], depth);
    let prevItem = stack[stack.length - 1];
    while (depth - prevItem.depth !== 1) {
      stack.pop();
      prevItem = stack[stack.length - 1];
    }
    prevItem.children.push(item);
    // only push on directories
    if (!item.isFile) {
      stack.push(item);
    }
  }
  return initialDirectory;
}

// const longestFilePath = (inputString) => {
//   let longestFilePath = 0;
//   const directoryTree = constructTree(inputString);
  
//   const DFS = (node, length) => {
//     let nextLength = node.data.length;
//     nextLength += length;
//     if (node.isFile) {
//       if (nextLength > longestFilePath) {
//         longestFilePath = nextLength;
//       }
//     } else {
//       nextLength += 1; // add / to length for directory
//       for (let i = 0; i < node.children.length; i += 1) {
//         DFS(node.children[i], nextLength);
//       }
//     }
//   }

//   DFS(directoryTree, 0);
//   return longestFilePath;
// }

const getSum = (paths, tabCount = 0) => {
  let sum = 0;
  for (let i = 0; i <= tabCount; i += 1) {
    sum += paths[i] + 1;
  }
  return sum - 1;
}

const longestFilePath = (inputString) => {
  let longestPath = 0;
  const paths = [0];
  let newDirectory = true;
  let tabCount = 0;
  let isInitialDir = true;
  let initialDirLength = 0;
  let isFile = false;
  for (let i = 0; i < inputString.length; i += 1){
    if (inputString[i] === '\n') {
      newDirectory = true;
      tabCount = 0;
      isInitialDir = false;
      isFile = false;
    } else {
      if (isInitialDir) {
        initialDirLength += 1;
        paths[0] +=1;
        if (inputString[i] === '.') {
          isFile = true;
        }
        if (isFile) {
          if (i + 1 === inputString.length || inputString[i + 1] === '\n' ) {
            currentPath = getSum(paths);
            longestPath = currentPath > longestPath ? currentPath : longestPath;
          }
        }
      } else {
        if (inputString[i] === '\t') {
          tabCount += 1;
        } else {
          if (newDirectory) {
            paths[tabCount] = 0;
          }
          newDirectory = false;
          paths[tabCount] += 1;
          if (inputString[i] === '.') {
            isFile = true;
          }
          if (isFile) {
            if (i + 1 === inputString.length || inputString[i + 1] === '\n' ) {
              currentPath = getSum(paths, tabCount);
              longestPath = currentPath > longestPath ? currentPath : longestPath;
            }
          }
        }
      }
    }
  }
  return longestPath;
}

console.log(longestFilePath("dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" ));
console.log(longestFilePath("dir\n\tfile.txt"));
console.log(longestFilePath("dir\n    file.txt"));
console.log(longestFilePath("dir\n        file.txt"));
console.log(longestFilePath("sladjf\n\tlkjlkv\n\t\tlkjlakjlert\n\t\t\tlaskjglaksjf\n\t\t\t\tlakjgfljrtlj\n\t\t\t\t\tlskajflakjsvlj\n\t\t\t\t\t\tlskgjflkjrtlrjt\n\t\t\t\t\t\t\tlkjglkjlvkjdlvkj\n\t\t\t\t\t\t\t\tlfjkglkjfljdlv\n\t\t\t\t\t\t\t\t\tlkdfjglerjtkrjkljsd.lkvjlkajlfk\n\t\t\t\t\t\t\tlskfjlksjljslvjxjlvkzjljajoiwjejlskjslfj.slkjflskjldfkjoietruioskljfkljf\n\t\t\t\t\tlkasjfljsaljlxkcjzljvl.asljlksaj\n\t\t\t\tasldjflksajf\n\t\t\t\talskjflkasjlvkja\n\t\t\t\twioeuoiwutrljsgfjlskfg\n\t\t\t\taslkjvlksjvlkjsflgj\n\t\t\t\t\tlkvnlksfgk.salfkjaslfjskljfv\n\t\t\tlksdjflsajlkfj\n\t\t\tlasjflaskjlk\n\t\tlsakjflkasjfkljas\n\t\tlskjvljvlkjlsjfkgljfg\n\tsaljkglksajvlkjvkljlkjvksdj\n\tlsakjglksajkvjlkjdklvj\n\tlskjflksjglkdjbkljdbkjslkj\n\t\tlkjglkfjkljsdflj\n\t\t\tlskjfglkjdfgkljsdflj\n\t\t\t\tlkfjglksdjlkjbsdlkjbk\n\t\t\t\t\tlkfgjlejrtljkljsdflgjl\n\t\t\t\t\tsalgkfjlksfjgkljsgfjl\n\t\t\t\t\tsalkflajwoieu\n\t\t\t\t\t\tlaskjfglsjfgljkkvjsdlkjbklds\n\t\t\t\t\t\t\tlasjglriotuojgkjsldfgjsklfgjl\n\t\t\t\t\t\t\t\tlkajglkjskljsdljblkdfjblfjlbjs\n\t\t\t\t\t\t\t\t\tlkajgljroituksfglkjslkjgoi\n\t\t\t\t\t\t\t\t\t\tlkjglkjkljkljdkbljsdfljgklfdj\n\t\t\t\t\t\t\t\t\t\t\tlkjlgkjljgslkdkldjblkj\n\t\t\t\t\t\t\t\t\t\t\t\tlkjfglkjlkjbsdklj.slgfjalksjglkfjglf\n\t\t\t\t\t\t\t\t\t\t\t\tlkasjrlkjwlrjljsl\n\t\t\t\t\t\t\t\t\t\t\t\t\tlksjgflkjfklgjljbljls\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tlkjsglkjlkjfkljdklbjkldf\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlkjglkjdlsfjdglsdjgjlxljjlrjsgjsjlk\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlkjsgkllksjfgjljdslfkjlkasjdflkjxcljvlkjsgkljsfg\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlaskjlkjsakljglsdjfgksdjlkgjdlskjb\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlkajsgfljfklgjlkdjgfklsdjklj\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlkjfglkjlkgjlkjl.aslkjflasjlajglkjaf\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlkjasflgjlskjglkfjgklgsdjflkbjsdklfjskldfjgklsfdjgklfdjgl\n\tlskadjlkjsldwwwwwfj\n\t\tlkjflkasjlfjlkjajslfkjlasjkdlfjlaskjalvwwwwwwwwwwwwwwwkjlsjfglkjalsjgflkjaljlkdsjslbjsljksldjlsjdlkjljvblkjlkajfljgasljfkajgfljfjgldjblkjsdljgsldjg.skljf"))
