import React from 'react'
import Category from './Category'

const Deals = () => {

  return (
    <div className='my-10'>
    <div className='flex justify-center w-full gap-5 items-center text-center'>
        <hr className='w-20 max-sm:w-10 border-1'/>
        <h1 className='text-3xl max-sm:text-2xl font-bold select-none'>DAILY DEALS!</h1>
        <hr className='w-20 max-sm:w-10 border-1'/>
      
    </div>
    <Category />
    </div>
  )
}

export default Deals
