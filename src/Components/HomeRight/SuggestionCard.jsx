import React from 'react'

const SuggestionCard = () => {
  return (
    <div className='flex justify-between item-center'>
        <di className='flex item-center'v>
            <img className='w-9 h-9 rounded-full' src='https://cdn.pixabay.com/photo/2018/07/12/11/46/spider-3533177_1280.jpg'/>
            <div className='ml-2'>
              <p className='text-sm font-semibold'>username</p>
              <p className='text-sm font-semibold opacity-70'>Follows you</p>
            </div>
        </di>
        <p className='text-blue-700 text-sm font-semibold'>Follow</p>
    </div>
  )
}

export default SuggestionCard