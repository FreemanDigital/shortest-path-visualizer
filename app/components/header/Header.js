import React from 'react'

const Header = () => {
  return (
    <div className="flex flex-row justify-center items-center text-left h-full w-full bg-gray-800 text-white text-xl z-10" style={{ gridArea: "header" }}>
        <div className="flex justify-center items-end w-6 h-6 mx-2">
            <svg fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.97,2.242l-5,20A1,1,0,0,1,2,23a1.025,1.025,0,0,1-.244-.03,1,1,0,0,1-.727-1.212l5-20a1,1,0,1,1,1.94.484Zm10-.484a1,1,0,1,0-1.94.484l5,20A1,1,0,0,0,22,23a1.017,1.017,0,0,0,.243-.03,1,1,0,0,0,.728-1.212ZM12,1a1,1,0,0,0-1,1V6a1,1,0,0,0,2,0V2A1,1,0,0,0,12,1Zm0,7.912a1,1,0,0,0-1,1v4.176a1,1,0,1,0,2,0V9.912A1,1,0,0,0,12,8.912ZM12,17a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V18A1,1,0,0,0,12,17Z"></path></g></svg>
        </div>
        <div className="font-bold text-md sm:text-lg">
            Shortest Path Visualizer
        </div>
        <div className="flex flex-col justify-center items-start ml-2 sm:ml-8 text-xs sm:text-sm">
            <p>1st click: Start node</p>
            <p>2nd click: End node</p>
            <p>3rd click (and drag): Walls</p>
        </div>
    </div>
  )
}

export default Header