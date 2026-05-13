import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSingleProduct } from '../api/api'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    getSingleProduct(id).then((res) => {
      if (res.status) {
        setProduct(res.data)
      } else {
        alert(res.message)
      }
    })
  }, [id])

  if (!product) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
        <div className="md:flex">
          
          {product.image && (
            <div className="md:flex-shrink-0 bg-gray-100 md:w-1/2">
              <img 
                className="h-full w-full object-cover md:h-full md:w-full max-h-96" 
                src={product.image} 
                alt={product.name} 
              />
            </div>
          )}
          
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-emerald-600 font-bold mb-1">Product Details</div>
            <h2 className="block mt-1 text-3xl leading-tight font-extrabold text-gray-900">{product.name}</h2>
            
            <p className="mt-4 text-3xl font-light text-gray-900">
              <span className="text-emerald-500 font-bold">$</span>{product.price}
            </p>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2 mb-3">Description</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-10">
              <Link 
                to={-1} 
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-emerald-700 bg-emerald-100 hover:bg-emerald-200 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetails