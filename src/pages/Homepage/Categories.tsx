import React from 'react'
import { categories } from '../../dummydata/dummydata'
import { Link } from 'react-router-dom'
const Categories = () => {
  return (
    <div className='max-w-[1350px] w-full mx-auto text-[#272829] mb-[100px]'>
        <h1 className='text-[32px] font-bold mb-[50px]'>Danh mục</h1>
        <div className='grid grid-cols-3 gap-10'>
            {categories.map((item,index)=>(
                <Link to="" key={item.id} className='text-[20px] font-semibold text-[#8614BC] '>
                    <img src={item.img} alt="" className=''/>
                    <div className='hover:text-[#5B0E7F] transition-all duration-150 ease-in-out'>{item.name}</div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Categories