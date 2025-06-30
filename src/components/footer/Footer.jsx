import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-20 text-gray-700 px-6 md:px-20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto flex flex-row flex-wrap justify-between gap-10">
        {/* About */}
        <div className='flex flex-col max-md:items-center w-50 max-md:w-full'>
          <h2 className="text-3xl max-md:text-2xl font-bold mb-4">FLONE.</h2>
          <p className="text-sm leading-6 max-md:text-center">
            We are a modern e-commerce store offering fashion-forward products for all seasons.
          </p>
          <div className="flex items-center  gap-4 mt-5 text-fuchsia-600">
            <Facebook className="w-5 h-5 hover:text-black transition cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-black transition cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-black transition cursor-pointer" />
            <Youtube className="w-5 h-5 hover:text-black transition cursor-pointer" />
          </div>
        </div>

        {/* Categories */}
        <div className='flex flex-col max-md:items-center max-md:mx-auto'>
          <h2 className="text-lg font-semibold mb-4">CATEGORIES</h2>
          <ul className="space-y-2 max-md:text-center text-sm">
            <li className="hover:text-fuchsia-600 cursor-pointer">Men</li>
            <li className="hover:text-fuchsia-600 cursor-pointer">Women</li>
            <li className="hover:text-fuchsia-600 cursor-pointer">Accessories</li>
            <li className="hover:text-fuchsia-600 cursor-pointer">Sale</li>
          </ul>
        </div>

        {/* Information */}
        <div className='flex flex-col max-md:items-center max-md:mx-auto'>
          <h2 className="text-lg font-semibold mb-4">INFORMATION</h2>
          <ul className="space-y-2 max-md:text-center text-sm">
            <li className="hover:text-fuchsia-600 cursor-pointer">About Us</li>
            <li className="hover:text-fuchsia-600 cursor-pointer">Contact</li>
            <li className="hover:text-fuchsia-600 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-fuchsia-600 cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact */}
        <div className='flex flex-col max-md:items-center max-md:mx-auto'>
          <h2 className="text-lg font-semibold mb-4">CONTACT US</h2>
          <ul className="space-y-2 max-md:text-center text-sm">
            <li>Address: Karachi, Pakistan</li>
            <li>Email: info@example.com</li>
            <li>Phone: +92 300 1234567</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-12 border-t pt-6">
        © {new Date().getFullYear()} YourStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
