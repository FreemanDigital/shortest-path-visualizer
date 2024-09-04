// context for click mode process: set start, set end, set walls
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ClickModeContext = createContext();

export const ClickModeProvider = ({ children }) => {
    const [clickMode, setClickMode] = useState('setStart');

    // log to console if clickMode changes
    useEffect(() => {
        console.log(`Click mode: ${clickMode}`);
    }, [clickMode]);

    return (
        <ClickModeContext.Provider value={{ clickMode, setClickMode }}>
            {children}
        </ClickModeContext.Provider>
    );
}

export const useClickMode = () => {
    const context = useContext(ClickModeContext);
    if (!context) {
        throw new Error('useClickMode must be used within a ClickModeProvider');
    }
    return context;
}

export default ClickModeContext;