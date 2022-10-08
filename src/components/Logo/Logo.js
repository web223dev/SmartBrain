import React from 'react'
import Tilt from 'react-tilt'
import BrainImage from './brain.svg';

const Logo = () => {
  return (
    <div className="m-4">
      <Tilt className="Tilt drop-shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 rounded" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner p-4">
          <img src={BrainImage} alt="Brain" />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo