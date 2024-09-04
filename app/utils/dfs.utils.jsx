export const dfs = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    let nextNodesStack = [startNode];

    while (nextNodesStack.length) {
        const currentNode = nextNodesStack.pop();
        if (currentNode === finishNode) return visitedNodesInOrder;

        if (
            !currentNode.isWall &&
            (currentNode.isStart || !currentNode.isVisited)
        ) {
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);
            const { col, row } = currentNode;
            let nextNode;

            if (row > 0) {
                nextNode = grid[row - 1][col];
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode;
                    nextNodesStack.push(nextNode);
                }
            }
            if (row < grid.length - 1) {
                nextNode = grid[row + 1][col];
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode;
                    nextNodesStack.push(nextNode);
                }
            }
            if (col > 0) {
                nextNode = grid[row][col - 1];
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode;
                    nextNodesStack.push(nextNode);
                }
            }
            if (col < grid[0].length - 1) {
                nextNode = grid[row][col + 1];
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode;
                    nextNodesStack.push(nextNode);
                }
            }
        }
    }
    return visitedNodesInOrder;
};

// export const dfsWithBacktracking = (grid, startNode, finishNode) => {
//     const visitedNodesInOrder = [];
//     let pathStack = [startNode];

//     const dfsRecursive = (currentNode) => {
//         if (currentNode === finishNode) return true;

//         if (
//             !currentNode.isWall &&
//             (currentNode.isStart || !currentNode.isVisited)
//         ) {
//             currentNode.isVisited = true;
//             visitedNodesInOrder.push(currentNode);

//             const { col, row } = currentNode;
//             let directions = [
//                 { r: -1, c: 0 }, // Up
//                 { r: 1, c: 0 },  // Down
//                 { r: 0, c: -1 }, // Left
//                 { r: 0, c: 1 },  // Right
//             ];

//             for (let direction of directions) {
//                 const nextRow = row + direction.r;
//                 const nextCol = col + direction.c;

//                 if (
//                     nextRow >= 0 &&
//                     nextRow < grid.length &&
//                     nextCol >= 0 &&
//                     nextCol < grid[0].length
//                 ) {
//                     const nextNode = grid[nextRow][nextCol];

//                     if (!nextNode.isVisited) {
//                         nextNode.previousNode = currentNode;
//                         pathStack.push(nextNode);
//                         if (dfsRecursive(nextNode)) return true;
//                         pathStack.pop(); // Backtrack
//                     }
//                 }
//             }
//         }
//         return false;
//     };

//     dfsRecursive(startNode);
//     return visitedNodesInOrder;
// };
