import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className="flex justify-center pt-4">
      <div className='relative'>
        <img id='inputimage' src={imageUrl} alt='' />
        <div 
          className='bounding-box' 
          style={{
            top: box.topRow, 
            bottom: box.bottomRow, 
            left: box.leftCol, 
            right: box.rightCol
          }}></div>
      </div>
    </div>
  )
}

export default FaceRecognition