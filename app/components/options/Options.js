'use client';

import React from 'react'
import { useOptions } from '../../context/OptionsContext'
import { useSearch } from '../../context/SearchContext'

const Options = () => {
    const { nodeSize, setNodeSize } = useOptions()
    const { searchSpeed, setSearchSpeed, searchStatus, searchType, setSearchType } = useSearch()

  return (
    <div className='flex flex-row bg-gray-800 text-white w-full h-full justify-center py-4 md:py-8' style={{ gridArea: "options" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex justify-center items-center w-full text-center">
                <p className='min-w-max mr-1 font-bold border rounded-xl px-2'>
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
                    Delay
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
                    Mode
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
    </div>
  )
}

export default Options