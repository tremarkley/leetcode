const max = (a, b) => a > b ? a : b;

const knapsack = (capacity, value, weight) => {
    const memo = [];
    // go through each weight 1 -> w
    // check to see what max value you can get
    for (let i = 0; i < value.length; i += 1) {
      memo.push([]);
      for (let j = 0; j <= capacity; j += 1) {
        if (i === 0) {
          if (weight[i] <= j) {
            memo[i][j] = value[i];
          } else {
            memo[i][j] = 0;
          }
        } else {
          // compare to the one above it and what would happen if you added
          if (weight[i] <= j) {
            //check to see if it is better with or without
            let potentialValue = value[i];
            const nextJ = j - weight[i];
            potentialValue += memo[i - 1][nextJ];
            memo[i][j] = max(potentialValue, memo[i - 1][j]);
          } else {
            memo[i][j] = memo[i - 1][j];
          }
        }
      }
    }
    return memo[value.length - 1][capacity];
}

console.log(knapsack(50, [120, 100, 60], [30, 20, 10]));