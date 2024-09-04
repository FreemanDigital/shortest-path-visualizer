// context for search options and functions
'use client';
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [nodes, setNodes] = useState([]);
    const [searchType, setSearchType] = useState('bfs');
    const [searchSpeed, setSearchSpeed] = useState(10);
    const [searchStatus, setSearchStatus] = useState('idle');
    const [startNode, setStartNode] = useState(null);
    const [endNode, setEndNode] = useState(null);
    const [walls, setWalls] = useState([]);
    const [visitedNodes, setVisitedNodes] = useState([]);
    const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState(
        []
    );

    const updateNodeState = (row, col, updates) => {
        const newNodes = nodes.slice();
        const node = nodes[row][col];
        newNodes[row][col] = { ...node, ...updates };
        setNodes(newNodes);
    };

    const getNodesInShortestPathOrder = (finishNode) => {
        const pathOrder = [];
        let currentNode = finishNode;
        while (currentNode !== null) {
            pathOrder.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        setNodesInShortestPathOrder(pathOrder);
        return pathOrder;
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const display = async (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 1; i < visitedNodesInOrder.length; i++) {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).classList.add('isVisited');
            await sleep(searchSpeed);
        }
        displayPath(nodesInShortestPathOrder);  // Call the displayPath after all visited nodes
    };

    const displayPath = async (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            const node = nodesInShortestPathOrder[i];
            updateNodeState(node.row, node.col, { isPath: true });
            await sleep(searchSpeed);
        }
    };

    const bfs = async (grid, startNode, finishNode) => {
        const visitedNodesInOrder = [];
        let nextNodesStack = [startNode];

        while (nextNodesStack.length) {
            const currentNode = nextNodesStack.shift();
            if (currentNode === finishNode) {
                setVisitedNodes(visitedNodesInOrder);
                return visitedNodesInOrder;
            }

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
        setVisitedNodes(visitedNodesInOrder);
        return visitedNodesInOrder;
    };

    const dfs = async (grid, startNode, finishNode) => {
        const visitedNodesInOrder = [];
        let nextNodesStack = [startNode];
    
        while (nextNodesStack.length) {
            const currentNode = nextNodesStack.pop(); // DFS uses pop instead of shift
            if (currentNode === finishNode) {
                setVisitedNodes(visitedNodesInOrder);
                return visitedNodesInOrder;
            }
    
            if (
                !currentNode.isWall &&
                (currentNode.isStart || !currentNode.isVisited)
            ) {
                currentNode.setIsVisited(true);
                visitedNodesInOrder.push(currentNode);
    
                const { col, row } = currentNode;
                let nextNode;
    
                // For DFS, we add nodes in reverse order to prioritize the top, right, bottom, and left (or adjust as per your preference)
                if (col < grid[0].length - 1) {
                    nextNode = grid[row][col + 1]; // Right
                    if (!nextNode.isVisited) {
                        nextNode.setPreviousNode(currentNode);
                        nextNodesStack.push(nextNode);
                    }
                }
                if (row < grid.length - 1) {
                    nextNode = grid[row + 1][col]; // Down
                    if (!nextNode.isVisited) {
                        nextNode.setPreviousNode(currentNode);
                        nextNodesStack.push(nextNode);
                    }
                }
                if (col > 0) {
                    nextNode = grid[row][col - 1]; // Left
                    if (!nextNode.isVisited) {
                        nextNode.setPreviousNode(currentNode);
                        nextNodesStack.push(nextNode);
                    }
                }
                if (row > 0) {
                    nextNode = grid[row - 1][col]; // Up
                    if (!nextNode.isVisited) {
                        nextNode.setPreviousNode(currentNode);
                        nextNodesStack.push(nextNode);
                    }
                }
            }
        }
    
        setVisitedNodes(visitedNodesInOrder);
        return visitedNodesInOrder;
    };

    const astar = async (grid, startNode, finishNode) => {
        const visitedNodesInOrder = [];
        let openSet = [];
        openSet.push(startNode);
        startNode.g = 0;
        startNode.h = heuristic(startNode, finishNode); // Initialize heuristic
        startNode.f = startNode.g + startNode.h;
    
        // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
        while (openSet.length > 0) {
            // Sort the openSet by f value, so the node with the lowest f is first
            openSet.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
            const currentNode = openSet.shift(); // Get node with lowest f value
    
            if (currentNode === finishNode) {
                setVisitedNodes(visitedNodesInOrder);
                return visitedNodesInOrder; // Path found
            }
    
            if (!currentNode.isWall && (currentNode.isStart || !currentNode.isVisited)) {
                currentNode.setIsVisited(true);
                visitedNodesInOrder.push(currentNode);
    
                // await delay(100); // Delay to allow visualization update
    
                const { col, row } = currentNode;
    
                let neighbors = [];
                if (row > 0) neighbors.push(grid[row - 1][col]); // Up
                if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
                if (col > 0) neighbors.push(grid[row][col - 1]); // Left
                if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
    
                for (let neighbor of neighbors) {
                    if (neighbor.isVisited || neighbor.isWall) continue; // Skip if already visited or it's a wall
    
                    const tentativeGScore = currentNode.g + 1; // Assuming uniform cost grid
                    if (tentativeGScore < neighbor.g || !openSet.includes(neighbor)) {
                        neighbor.setPreviousNode(currentNode);
                        neighbor.g = tentativeGScore;
                        neighbor.h = heuristic(neighbor, finishNode); // Calculate heuristic
                        neighbor.f = neighbor.g + neighbor.h;
    
                        if (!openSet.includes(neighbor)) {
                            openSet.push(neighbor); // Add to openSet if it's not there
                        }
                    }
                }
            }
        }
    
        setVisitedNodes(visitedNodesInOrder); // No path found
        return visitedNodesInOrder;
    };
    
    // Heuristic function for A* (Manhattan Distance in this case)
    const heuristic = (nodeA, nodeB) => {
        const { col: colA, row: rowA } = nodeA;
        const { col: colB, row: rowB } = nodeB;
        return Math.abs(colA - colB) + Math.abs(rowA - rowB); // Manhattan distance
    };

    const handleStartSearch = async () => {

        if (!startNode || !endNode) {
            return;
        }
        setSearchStatus('searching');
        const grid = nodes.map((row) => row.map((node) => node));

        let visitedNodesInOrder = [];
        if (searchType === 'bfs') {
            visitedNodesInOrder = await bfs(grid, startNode, endNode);
        } else if (searchType === 'dfs') {
            visitedNodesInOrder = await dfs(grid, startNode, endNode);
        } else if (searchType === 'aStar') {
            visitedNodesInOrder = await astar(grid, startNode, endNode);
        } else {
            console.error('Invalid search type');
        }

        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        await display(visitedNodesInOrder, nodesInShortestPathOrder);
        setSearchStatus('idle');

    };

    const resetState = () => {
        setStartNode(null);
        setEndNode(null);
    }

    return (
        <SearchContext.Provider
            value={{
                searchType,
                setSearchType,
                searchSpeed,
                setSearchSpeed,
                searchStatus,
                setSearchStatus,
                startNode,
                setStartNode,
                endNode,
                setEndNode,
                walls,
                setWalls,
                visitedNodes,
                setVisitedNodes,
                nodesInShortestPathOrder,
                setNodesInShortestPathOrder,
                getNodesInShortestPathOrder,
                display,
                bfs,
                displayPath,
                updateNodeState,
                nodes,
                setNodes,
                handleStartSearch,
                resetState
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};

export default SearchContext;
