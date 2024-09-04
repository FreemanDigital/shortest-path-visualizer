'use client';

import { useOptions } from '../../context/OptionsContext';
import { useClickMode } from '../../context/ClickModeContext';
import { useSearch } from '../../context/SearchContext';

const Node = ({ node }) => {
    const { row, col, isStart, isEnd, isWall, isVisited, isPath } = node;
    const { nodeSize } = useOptions();
    const { clickMode, setClickMode } = useClickMode();
    const { setStartNode, setEndNode, setWalls } = useSearch();

    const handleMouseDown = () => {
        handleNodeClick();
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseEnter = () => {
        if (isMousePressed() && clickMode === 'setWalls') {
            node.isWall = !node.isWall;
            setWalls((prevWalls) => {
                return [...prevWalls, node];
            });
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleNodeClick = () => {
        console.log(`Node clicked: ${row}, ${col}`);
        switch (clickMode) {
            case 'setStart':
                node.isStart = true;
                setStartNode(node);
                setClickMode('setEnd');
                break;
            case 'setEnd':
                node.isEnd = true;
                setEndNode(node);
                setClickMode('setWalls');
                break;
            case 'setWalls':
                node.isWall = !node.isWall;
                setWalls((prevWalls) => {
                    return [...prevWalls, node];
                });
                break;
            default:
                break;
        }
    };

    const isMousePressed = () => {
        return window.event && window.event.buttons === 1; // Checks if the left mouse button is pressed
    };

    const getNodeClassName = () => {
        if (isStart) return 'node isStart';
        if (isEnd) return 'node isEnd';
        if (isWall) return 'node isWall';
        // if (isVisited) return 'node isVisited';
        if (isPath) return 'node isPath';
        return 'node';
    };

    const resetNode = () => {
        node.isStart = false;
        node.isEnd = false;
        node.isWall = false;
        node.isVisited = false;
        node.isPath = false;
    };

    return (
        <div
            id={`node-${row}-${col}`}
            className={`${getNodeClassName()}`}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            style={{
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
            }}
        ></div>
    );
};

export default Node;
