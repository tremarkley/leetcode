// Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. 
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. 
// You may assume all four edges of the grid are all surrounded by water.

// Example 1:

// Input:
// 11110
// 11010
// 11000
// 00000

// Output: 1
// Example 2:

// Input:
// 11000
// 11000
// 00100
// 00011

// Output: 3

/**
 * @param {character[][]} grid
 * @return {number}
 */

const exploreIsland = (i, j, graph) => {
	const coordinates =[[i + 1, j], [i - 1, j], [i, j + 1], [i, j -1]];
	for (let x = 0; x < coordinates.length; x += 1) {
		if (coordinates[x][0] >= 0 && coordinates[x][0] < graph.length && coordinates[x][1] >= 0 && coordinates[x][1] < graph[0].length && graph[coordinates[x][0]][coordinates[x][1]] === '1') {
			graph[coordinates[x][0]][coordinates[x][1]] = '0';
			exploreIsland(coordinates[x][0], coordinates[x][1], graph);
		}
	}
}

const numIslands = (graph) => {
	const graphCopy = [];
	for (let i = 0; i < graph.length; i += 1) {
		graphCopy.push(graph[i].slice());
	}
	let count = 0;
	for (let i = 0; i < graphCopy.length; i += 1) {
		for (let j = 0; j < graphCopy[0].length; j += 1) {
			if (graphCopy[i][j] === '1') {
				count += 1;
				graphCopy[i][j] = '0';
				exploreIsland(i, j, graphCopy);
			}
		}
	}
	return count;
}