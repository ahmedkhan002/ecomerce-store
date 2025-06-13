import React from 'react';
import image1 from '../../images/home/support-1.png';
import image2 from '../../images/home/support-2.png';
import image3 from '../../images/home/support-3.png';
import image4 from '../../images/home/support-4.png';

const logos = [
  {
    name: "Free Shipping",
    icon: image1,
    discription: "Free shipping on all order"
  },
  {
    name: "Support 24/7",
    icon: image2,
    discription: "Free shipping on all order"
  },
  {
    name: "Money Return",
    icon: image3,
    discription: "Free shipping on all order"
  },
  {
    name: "Order Discount",
    icon: image4,
    discription: "Free shipping on all order"
  },
];

const Support = () => {
  return (
    <section className="w-full px-6 md:px-10 lg:px-20 my-20 select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {logos.map((v, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 shadow-sm rounded-2xl hover:shadow-md transition"
          >
            <div className="h-13 w-13 flex-shrink-0">
              <img className="h-full w-full object-contain" src={v.icon} alt={`Logo-${i}`} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl font-semibold text-black">{v.name}</h3>
              <p className="text-sm text-gray-600">{v.discription}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Support;
