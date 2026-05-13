import React, { useEffect, useState } from 'react'
import { getCategory } from '../api/api'
import Category from '../component/Category'

const CategoryCard = () => {
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        getCategory()
        .then((res) => {
            if(res.status){
                setCategories(res.data)
            }else{
                alert(res.message)
            }
        })
    },[])

  return (
   <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Explore Categories
            </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((e)=>(
                <Category key={e._id} category={e}/>
            ))}
        </div>
    </div>
   </div>
  )
}

export default CategoryCard