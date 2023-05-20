import React from 'react'

 const ProgressBar = ({progressPercentage}) => {
  return (
    <div className=' h-2 w-full bg-gray-200 rounded'>
      <div
        style={{ width: `${progressPercentage}%`}}
        className={`h-full rounded ${
            progressPercentage < 50 ? 'bg-red-600' : 'bg-green-600'}`}>
              
      </div>
  </div>
  )
}

export default ProgressBar;