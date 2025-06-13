import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/Context';

const Cards = ({ images, imgalt, title, description, price, keyid, product }) => {


  const {setProductid , addToCart, addToWishlist } = useAppContext();
  const [open, setOpen] = useState(false);

    const handleAddToCart = () => {
    addToCart(product); 
    setProductid(keyid)
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    setProductid(keyid)
  };


  return (
    <>
      <div className="max-w-[280px] group lg:min-h-[400px] max-h-[500px] flex flex-col justify-between p-3 bg-[#f5f5f5] hover:shadow-2xl transition duration-200 relative shadow-md overflow-visible">
        <div className="bg-fuchsia-200 h-[60%] w-full rounded-md transition-transform duration-300 ease group-hover:-translate-y-6 hover:shadow-[0px_13px_47px_-5px_rgba(226,196,63,0.25),0px_8px_16px_-8px_rgba(180,71,71,0.3)]">
          <img className="h-full mx-auto duration-500 cursor-pointer hover:scale-115" src={images} alt={imgalt} />
        </div>

        <div className="pt-4">
          <p className="font-black text-lg leading-snug">{title}</p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-300">
          <div className="font-black text-lg">
            <p>
              ${price}{' '}
              <del className="text-md text-slate-700">
                {(price * 1.2).toFixed(2)}
              </del>
            </p>
          </div>
          <div
            onClick={() => setOpen(true)}
            className="border border-black p-1 rounded-full cursor-pointer transition-all duration-300 hover:border-[#ffcaa6] hover:bg-[#ffcaa6]"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z" />
              <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z" />
              <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Animated Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/40 z-50"
          >
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-4 rounded-lg w-full max-w-3xl shadow-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={images}
                  alt={imgalt}
                  className="w-full md:w-1/2 hover:scale-110 duration-500 rounded-lg object-cover"
                />
                <div className="flex flex-col p-2 rounded-2xl justify-between w-full">
                  <div className="flex p-2 rounded-2xl justify-between inset-shadow-sm inset-shadow-slate-200 items-start">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button
                      onClick={() => setOpen(false)}
                      className="text-2xl cursor-pointer text-gray-600 hover:text-red-600"
                    >
                      &times;
                    </button>
                  </div>
                  <p className="text-gray-700 my-2">{description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-semibold text-green-700">
                      ${price}
                    </p>
                    <div className="flex gap-2">
                      <button onClick={handleAddToWishlist} className="bg-pink-400 hover:bg-pink-500 text-white px-3 py-1 rounded-lg text-sm transition">
                        Wishlist
                      </button>
                      <button onClick={handleAddToCart} className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-lg text-sm transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cards;
