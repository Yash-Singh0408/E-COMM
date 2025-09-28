import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'

const HomePage = () => {

  const placeholderProducts = [
     {
      _id: "1",
      name: "Similar Product 1",
      price: "89.99",
      images: [{ url: "https://picsum.photos/500/500?random=3" }],
    },
    {
      _id: "2",
      name: "Similar Product 2",
      price: "79.99",
      images: [{ url: "https://picsum.photos/500/500?random=4" }],
    },
    {
      _id: "3",
      name: "Similar Product 3",
      price: "99.99",
      images: [{ url: "https://picsum.photos/500/500?random=5" }],
    },
    {
      _id: "4",
      name: "Similar Product 4",
      price: "59.99",
      images: [{ url: "https://picsum.photos/500/500?random=6" }],
    },
    {
      _id: "5",
      name: "Similar Product 5",
      price: "69.99",
      images: [{ url: "https://picsum.photos/500/500?random=7" }],
    },
    {
      _id: "6",
      name: "Similar Product 6",
      price: "49.99",
      images: [{ url: "https://picsum.photos/500/500?random=8" }],
    },
    {
      _id: "7",
      name: "Similar Product 7",
      price: "39.99",
      images: [{ url: "https://picsum.photos/500/500?random=9" }],
    },
    {
      _id: "8",
      name: "Similar Product 8",
      price: "29.99",
      images: [{ url: "https://picsum.photos/500/500?random=10" }],
    }
  ]

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      <h2 className='text-3xl text-center font-bold  mb-3'>Best Sellers</h2>
      <ProductDetails />

      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Women Products of the Week
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}

export default HomePage
