import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if(isSignedIn) {
    return (
      <nav className='flex justify-end'>
        <p onClick={() => onRouteChange('signout')} className='pt-3 text-2xl border-b-2 border-black font-semibold cursor-pointer'>Sign Out</p>
      </nav>
    )
  } else {
    return (
      <nav className='flex justify-end'>
        <p onClick={() => onRouteChange('signin')} className='pt-3 text-2xl border-b-2 border-black font-semibold cursor-pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='pt-3 text-2xl border-b-2 border-black font-semibold cursor-pointer ml-5'>Register</p>
      </nav>
    )
  }
    
}

export default Navigation;