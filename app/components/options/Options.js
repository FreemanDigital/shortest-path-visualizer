'use client';

import React from 'react'
import { useOptions } from '../../context/OptionsContext'
import { useSearch } from '../../context/SearchContext'

const Options = () => {
    const { nodeSize, setNodeSize } = useOptions()
    const { searchSpeed, setSearchSpeed, searchStatus, searchType, setSearchType } = useSearch()

  return (
    <div className='flex flex-row bg-gray-800 text-white w-full h-full justify-center' style={{ gridArea: "options" }}>
        <div className="flex justify-center items-center w-full text-center">
            <p className='mr-1 font-bold border rounded-xl px-2'>
                Node size
            </p>
            <input
                type="range"
                min="24"
                max="50"
                value={nodeSize}
                onChange={(e) => setNodeSize(e.target.value)}
                disabled={searchStatus !== 'idle'}
            />
        </div>
        <div className="flex justify-center items-center w-full text-center">
            <p className='mr-1 font-bold border rounded-xl px-2'>
                Search delay
            </p>
            <input
                type="range"
                min="1"
                max="100"
                value={searchSpeed}
                onChange={(e) => setSearchSpeed(e.target.value)}
                disabled={searchStatus !== 'idle'}
            />
        </div>
        <div className="flex justify-center items-center w-full text-center gap-1">
            <p className='mr-1 font-bold border rounded-xl px-2'>
                Search mode
            </p>
            {/* radio boxes for bfs, dfs, and a-star */}
            <input
                type="radio"
                id="bfs"
                name="searchType"
                value="bfs"
                checked={searchType === 'bfs'}
                onChange={() => setSearchType('bfs')}
                disabled={searchStatus !== 'idle'}
            />
            <label htmlFor="bfs">BFS</label>
            <input
                type="radio"
                id="dfs"
                name="searchType"
                value="dfs"
                checked={searchType === 'dfs'}
                onChange={() => setSearchType('dfs')}
                disabled={searchStatus !== 'idle'}
            />
            <label htmlFor="dfs">DFS</label>
            <input
                type="radio"
                id="aStar"
                name="searchType"
                value="aStar"
                checked={searchType === 'aStar'}
                onChange={() => setSearchType('aStar')}
                disabled={searchStatus !== 'idle'}
            />
            <label htmlFor="aStar">A*</label>
        </div>
    </div>
  )
}

export default Options