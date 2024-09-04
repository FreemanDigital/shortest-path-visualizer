import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white text-center p-4">
      <p>&copy; {new Date().getFullYear()} Bacon Bytes</p>
    </footer>
  )
}

export default Footer