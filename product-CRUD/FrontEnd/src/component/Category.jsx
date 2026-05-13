import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({ category }) => {
  return (
  <Link  
    to={`/category/${category._id}`} 
    className="group block p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-100 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
        {category.name}
      </h2>
      <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-2 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </Link>
  )
}

export default Category