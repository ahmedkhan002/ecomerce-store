import React from 'react';
import blog1 from '../../images/home/blog/blog-1.jpg';
import blog2 from '../../images/home/blog/blog-2.jpg';
import blog3 from '../../images/home/blog/blog-3.jpg';

const Blog = () => {
  const cards = [
    { image: blog1, description: 'A guide to latest trends', date: 'June 20, 2025' },
    { image: blog2, description: 'Five ways to lead a happy life', date: 'June 15, 2025' },
    { image: blog3, description: 'Tips on having a happy life', date: 'June 10, 2025' }
  ];

  return (
    <section className="mt-20 max-sm:mx-5 mx-10">
      {/* Heading */}
      <div className="flex justify-center items-center text-center mb-12 gap-4">
        <hr className="w-20 max-sm:w-10 border" />
        <h1 className="text-3xl max-sm:text-2xl font-bold select-none">OUR BLOG</h1>
        <hr className="w-20 max-sm:w-10 border" />
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-10  mx-auto">
        {cards.map((v, i) => (
          <div
            key={i}
            className="bg-white shadow-md hover:shadow-xl lg:min-w-sm transition-shadow rounded-lg overflow-hidden cursor-pointer group"
          >
            <div className='h-60 overflow-hidden'>
            <img
              src={v.image}
              alt="Blog"
              className="w-full object-cover group-hover:scale-120 transition-transform duration-400"
            />
            </div>
            <div className="p-5 text-center">
              <p className="text-gray-500 text-sm mb-1">{v.date}</p>
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-fuchsia-600 transition">
                {v.description}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
