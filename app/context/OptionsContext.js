// context for grid options: node size, grid size
'use client';
import React, { createContext, useContext, useState } from 'react';

const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {
    const [nodeSize, setNodeSize] = useState(24);
    const [gridCols, setGridCols] = useState(10);
    const [gridRows, setGridRows] = useState(10);

    return (
        <OptionsContext.Provider value={{ nodeSize, setNodeSize, gridCols, setGridCols, gridRows, setGridRows }}>
            {children}
        </OptionsContext.Provider>
    );
};

export const useOptions = () => {
    const context = useContext(OptionsContext);
    if (!context) {
        throw new Error('useOptions must be used within an OptionsProvider');
    }
    return context;
};

export default OptionsContext;