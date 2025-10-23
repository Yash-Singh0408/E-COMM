import axios from "axios";
import React, { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // const newArrivals = [
  //   {
  //     _id: 1,
  //     price: 29.99,
  //     name: "T-shirt",
  //     images: [
  //       "https://picsum.photos/500/500?random=1",
  //       "https://picsum.photos/500/500?random=2",
  //     ],
  //   },
  //   {
  //     _id: 2,
  //     price: 49.99,
  //     name: "Jeans",
  //     images: [
  //       "https://picsum.photos/500/500?random=3",
  //       "https://picsum.photos/500/500?random=4",
  //     ],
  //   },
  //   {
  //     _id: 3,
  //     price: 89.99,
  //     name: "Sneakers",
  //     images: [
  //       "https://picsum.photos/500/500?random=5",
  //       "https://picsum.photos/500/500?random=6",
  //     ],
  //   },
  //   {
  //     _id: 4,
  //     price: 59.99,
  //     name: "Hoodie",
  //     images: [
  //       "https://picsum.photos/500/500?random=7",
  //       "https://picsum.photos/500/500?random=8",
  //     ],
  //   },
  //   {
  //       _id: 5,
  //       price: 39.99,
  //       name: "Jacket",
  //       images: [
  //         "https://picsum.photos/500/500?random=9",
  //           "https://picsum.photos/500/500?random=10",
  //       ],
  //   },
  //   {
  //       _id: 6,
  //       price: 19.99,
  //       name: "Cap",
  //       images: [
  //         "https://picsum.photos/500/500?random=11",
  //           "https://picsum.photos/500/500?random=12",
  //       ],
  //   }
  // ];

  const [newArrivals, setNewArrivals] = React.useState([]);

  useEffect(()=>{
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getNewArrivals`);
        setNewArrivals(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchNewArrivals(); 
  },[])

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  //   UseEffect for scroll buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth - container.clientWidth - leftScroll > 1;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }

    // console.log({
    //   scrollLeft: container.scrollLeft,
    //   clientWidth: container.clientWidth,
    //   containerScrollWidth: container.scrollWidth,
    // });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons); 
    }
  },[newArrivals]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  }

  return (
    <section className="py-16 px-4 lg:px-6">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore new arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest trends in fashion and elevate your style with our
          new arrivals collection
        </p>

        {/* Button  */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2 px-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400"} `}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400"} `}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative custom-scroll px-3 ${isDragging ? "cursor-grabbing" : "cursor-grab" }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}

      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative "
          >
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
