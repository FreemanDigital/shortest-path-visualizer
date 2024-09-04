export const aStar = (grid, startNode, finishNode) => {
    const openSet = [];
    const visitedNodesInOrder = [];

    startNode.gCost = 0;  // gCost: distance from the start node
    startNode.hCost = manhattanDistance(startNode, finishNode);  // hCost: estimated distance to the finish node
    startNode.fCost = startNode.gCost + startNode.hCost;  // fCost: total cost (gCost + hCost)

    openSet.push(startNode);

    while (openSet.length > 0) {
        // Sort openSet to find the node with the lowest fCost
        openSet.sort((nodeA, nodeB) => nodeA.fCost - nodeB.fCost);
        const currentNode = openSet.shift();

        if (currentNode === finishNode) {
            return {
                visitedNodesInOrder,
                pathToFinish: getNodesInShortestPathOrder(finishNode),
            };
        }

        if (!currentNode.isWall && !currentNode.isVisited) {
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);

            const { row, col } = currentNode;
            const neighbors = getNeighbors(grid, row, col);

            for (const neighbor of neighbors) {
                if (neighbor.isWall || neighbor.isVisited) continue;

                const tentativeGCost = currentNode.gCost + 1;

                if (tentativeGCost < neighbor.gCost || !openSet.includes(neighbor)) {
                    neighbor.previousNode = currentNode;
                    neighbor.gCost = tentativeGCost;
                    neighbor.hCost = manhattanDistance(neighbor, finishNode);
                    neighbor.fCost = neighbor.gCost + neighbor.hCost;

                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
    }

    // If no path is found, return the visited nodes and an empty path
    return {
        visitedNodesInOrder,
        pathToFinish: [],
    };
};

const manhattanDistance = (nodeA, nodeB) => {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
};

const getNeighbors = (grid, row, col) => {
    const neighbors = [];
    if (row > 0) neighbors.push(grid[row - 1][col]);       // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);  // Down
    if (col > 0) neighbors.push(grid[row][col - 1]);       // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);  // Right
    return neighbors;
};

const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
};
