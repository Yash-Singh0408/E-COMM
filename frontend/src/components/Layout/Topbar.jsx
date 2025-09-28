import { TbBrandMeta } from "react-icons/tb"
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"

const Topbar = () => {
  return (
    <div className="bg-topbar    text-white text-sm">
      <div className="container mx-auto flex justify-center md:justify-between items-center py-2 px-4">
        
        {/* Social Icons - hidden on small screens */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>

        {/* Deal Text - always visible */}
        <div className="text-center">
          <span className="block sm:inline">
            🎉 Super Deal! Free Shipping on Orders Over $50
          </span>
        </div>

        {/* Contact - hidden on small screens */}
        <div className="hidden md:block">
          <a href="tel:+918433791678" className="hover:text-gray-300">
            +91 84337 91678
          </a>
        </div>
      </div>
    </div>
  )
}

export default Topbar
