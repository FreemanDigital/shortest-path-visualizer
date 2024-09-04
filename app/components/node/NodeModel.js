const createNodeModel = (row, col) => {
    return {
        row,
        col,
        isVisited: false,
        isWall: false,
        isStart: false,
        isEnd: false,
        isPath: false,
        previousNode: null,
        setIsVisited(visited) {
            this.isVisited = visited;
        },
        setPreviousNode(node) {
            this.previousNode = node;
        }
    };
};

export default createNodeModel;