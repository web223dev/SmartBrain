import React from 'react'

const ImageLinkForm = () => {
  return (
    <div className='mt-8 sm:flex sm:justify-center'>
      <input
        id="email-address"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="w-full rounded-md border-gray-300 px-5 py-3 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-lg"
        placeholder="Enter your image url"
      />
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Detect
        </button>
      </div>
    </div>
  )
}

export default ImageLinkForm