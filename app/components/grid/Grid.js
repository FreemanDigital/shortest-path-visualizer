'use client';

import { useState, useEffect, useRef } from 'react';
import Node from '../node/Node';
import createNodeModel from '../node/NodeModel';
import { useOptions } from '../../context/OptionsContext';
import { useSearch } from '../../context/SearchContext';
import { useClickMode } from '../../context/ClickModeContext';

const Grid = () => {
    const { nodeSize } = useOptions();
    const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);
    const {
        nodes,
        setNodes,
        handleStartSearch,
        handlePauseSearch,
        handleStopSearch,
        resetState,
        searchStatus,
    } = useSearch();
    const { setClickMode } = useClickMode();

    useEffect(() => {
        const calculateGridSize = () => {
            console.log('calculateGridSize');
            if (containerRef.current) {
                const parentSize = containerRef.current.getBoundingClientRect();
                setGridSize({
                    width: parentSize.width,
                    height: parentSize.height,
                });
                console.log(parentSize.width, parentSize.height);
            } else {
                setGridSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
        };

        calculateGridSize();

        window.addEventListener('resize', calculateGridSize);
        return () => window.removeEventListener('resize', calculateGridSize);
    }, []);

    useEffect(() => {
        const nodesPerRow = Math.floor(gridSize.width / nodeSize);
        const nodesPerCol = Math.floor(gridSize.height / nodeSize);

        const newNodes = [];
        for (let i = 0; i < nodesPerCol; i++) {
            const row = [];
            for (let j = 0; j < nodesPerRow; j++) {
                row.push(createNodeModel(i, j));
            }
            newNodes.push(row);
        }
        setNodes(newNodes);
    }, [gridSize, nodeSize]);

    const resetNodes = () => {
        console.log('resetNodes');
        const nodesPerRow = Math.floor(gridSize.width / nodeSize);
        const nodesPerCol = Math.floor(gridSize.height / nodeSize);
        const newNodes = [];
        for (let i = 0; i < nodesPerCol; i++) {
            const row = [];
            for (let j = 0; j < nodesPerRow; j++) {
                row.push(createNodeModel(i, j));
                document.getElementById(`node-${i}-${j}`).className = 'node';
            }
            newNodes.push(row);
        }
        setNodes(newNodes);
        setClickMode('setStart');
    };

    return (
        <div
            className="relative bg-slate-700"
            ref={containerRef}
            style={{ width: '100%', height: '100%' }}
        >
            <div
                className="flex flex-wrap justify-center items-center"
                style={{
                    gridArea: 'grid',
                    gridTemplateColumns: `repeat(${Math.floor(
                        gridSize.width / nodeSize
                    )}, ${nodeSize}px)`,
                    gridTemplateRows: `repeat(${Math.floor(
                        gridSize.height / nodeSize
                    )}, ${nodeSize}px)`,
                }}
            >
                {nodes.map((row, i) =>
                    row.map((node, j) => <Node key={`${i}-${j}`} node={node} />)
                )}
            </div>
            <div className="absolute flex bottom-2 right-2 gap-2">
                <button
                    className="w-12 h-12 border-2 rounded-full bg-green-700 disabled:opacity-50"
                    onClick={handleStartSearch}
                    disabled={searchStatus !== 'idle'}
                >
                    <img src="/play.svg" alt="Start search" className="p-2" />
                </button>
                <button
                    className="w-12 h-12 border-2 rounded-full bg-yellow-700 disabled:opacity-50"
                    onClick={handlePauseSearch}
                    disabled={searchStatus !== 'searching'}
                >
                    <img src="/pause.svg" alt="Pause search" className="p-2" />
                </button>
                <button
                    className="w-12 h-12 border-2 rounded-full bg-red-700 disabled:opacity-50"
                    onClick={handleStopSearch}
                    disabled={searchStatus !== 'searching' || searchStatus === 'paused'}
                >
                    <img src="/stop.svg" alt="Stop search" className="p-2" />
                </button>
                <button
                    className="px-2 py-1 border-2 rounded-xl bg-gray-50 disabled:opacity-50"
                    onClick={resetNodes}
                    disabled={searchStatus !== 'idle'}
                >
                    Reset grid
                </button>
            </div>
        </div>
    );
};

export default Grid;
