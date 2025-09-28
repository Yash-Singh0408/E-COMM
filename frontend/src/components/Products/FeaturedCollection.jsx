import React from 'react'
import { Link } from 'react-router-dom'
// import { featured } from '../../assets/feature.webp'

const FeaturedCollection = () => {
  return (
    <section className='py-16 px-4 lg:px-4'>    
        <div className='container mx-auto flex flex-col-reverse lg:flex-row item-center bg-green-50 rounded-3xl'>
            {/* Left side */}
            <div className='lg:w-1/2 p-8 text-center lg:text-left flex flex-col justify-center'>
                <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                    Comfort Redefined
                </h2>
                <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
                    Appral that Moves with You everyday
                </h2>
                <p className='text-lg text-gray-600 mb-6'>
                    Discover our latest collection of apparels designed for ultimate comfort and style. Whether you're at home, at work, or on the go, our pieces are crafted to keep you feeling great all day long.
                </p>
                <Link to="/collection/all" className='bg-black w-fit self-center lg:self-auto text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800'>
                    Shop Now
                </Link>
            </div>
            {/* Right side */}
            <div className='lg:w-1/2'>
                <img
                    src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Featured Collection"
                    className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl'
                />
            </div>
        </div>
    </section>
  )
}

export default FeaturedCollection
