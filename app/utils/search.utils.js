export const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
};

export const display = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                displayPath(nodesInShortestPathOrder);
            }, 20 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            const nodeClassName = document.getElementById(
                `node-${node.row}-${node.col}`
            ).className;
            if (
                nodeClassName !== 'node isStart' &&
                nodeClassName !== 'node isFinish'
            ) {
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = 'node isVisited';
            }
        }, 20 * i);
    }
};

export const displayPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        if (nodesInShortestPathOrder[i] === 'end') {
            setTimeout(() => {
                console.log('Done!');
            }, i * 50);
        } else {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                const nodeClassName = document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className;
                if (
                    nodeClassName !== 'node isStart' &&
                    nodeClassName !== 'node isFinish'
                ) {
                    document.getElementById(
                        `node-${node.row}-${node.col}`
                    ).className = 'node isPath';
                }
            }, i * 40);
        }
    }
};

export const bfs = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    let nextNodesStack = [startNode];
    while (nextNodesStack.length) {
        const currentNode = nextNodesStack.shift();
        console.log(currentNode);
        if (currentNode === finishNode) return visitedNodesInOrder;

        if (
            !currentNode.isWall &&
            (currentNode.isStart || !currentNode.isVisited)
        ) {
            currentNode.setIsVisited(true);
            visitedNodesInOrder.push(currentNode);
            const { col, row } = currentNode;
            let nextNode;
            if (row > 0) {
                nextNode = grid[row - 1][col];
                if (!nextNode.isVisited) {
                    nextNode.setPreviousNode(currentNode);
                    nextNodesStack.push(nextNode);
                }
            }
            if (row < grid.length - 1) {
                nextNode = grid[row + 1][col];
                if (!nextNode.isVisited) {
                    nextNode.setPreviousNode(currentNode);
                    nextNodesStack.push(nextNode);
                }
            }
            if (col > 0) {
                nextNode = grid[row][col - 1];
                if (!nextNode.isVisited) {
                    nextNode.setPreviousNode(currentNode);
                    nextNodesStack.push(nextNode);
                }
            }
            if (col < grid[0].length - 1) {
                nextNode = grid[row][col + 1];
                if (!nextNode.isVisited) {
                    nextNode.setPreviousNode(currentNode);
                    nextNodesStack.push(nextNode);
                }
            }
        }
    }
    return visitedNodesInOrder;
}