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

    const handleStartSearch = async () => {
        console.log('handleStartSearch');
        if (!startNode || !endNode) {
            return;
        }
        setSearchStatus('searching');
        const grid = nodes.map((row) => row.map((node) => node));
        console.log('grid length:', grid.length);
        const visitedNodesInOrder = await bfs(grid, startNode, endNode);
        console.log('visitedNodesInOrder:', visitedNodesInOrder);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        await display(visitedNodesInOrder, nodesInShortestPathOrder);
        setSearchStatus('idle');
        console.log('handleStartSearch end');
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
