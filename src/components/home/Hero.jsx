import React, { useEffect } from 'react';
import { Carousel, ConfigProvider } from 'antd';
import hero1 from "../../images/home/Hero1.png";
import hero2 from "../../images/home/Hero2.png";
import { useSelector, useDispatch } from 'react-redux'
import { fetchByCategory } from '../../store/apidata/apiData';


const Hero = () => {

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);


useEffect(() => {
    const data =  dispatch(fetchByCategory('tops'));
  
}, [dispatch]);

// useEffect(() => {
//   console.log("Fetched products:", products);
// }, [products]); 

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 30,
            arrowOffset: 20,
          },
        },
      }}
    >
      <Carousel
        autoplay={false}
        arrows={true}
        autoplaySpeed={4000}
        // speed={800}
        draggable
        effect="fade"
        dots={false}
      >
        {[{
          img: hero1,
          heading: "SUMMER OFFER 2025 COLLECTION",
        }, {
          img: hero2,
          heading: "WINTER OFFER 2025 COLLECTION",
        }].map(({ img, heading }, index) => (
          <section
            key={index}
            className="bg-[#EFE0FF]  lg:h-[650px] flex items-center justify-center overflow-hidden"
          >
            <div className="grid max-w-screen-xl px-4 h-full mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-12 text-center lg:text-left select-none w-full">
              <div className="mx-auto place-self-center flex flex-col gap-8 lg:col-span-7 items-center lg:items-start lg:ml-5 relative">
                <p className="max-w-2xl max-lg:mt-5 text-black md:text-lg lg:text-2xl font-semibold">
                  SMART PRODUCTS
                </p>
                <h1 className="max-w-2xl mb-4 text-4xl leading-[1.2] text-black font-semibold tracking-wide md:text-5xl xl:text-7xl">
                  {heading}
                </h1>
                <button className="text-fuchsia-600 border border-fuchsia-600 hover:bg-fuchsia-600 hover:text-white text-xl py-2.5 px-8 cursor-pointer rounded-xl" >Default</button>
              </div>
              <div className=" lg:col-span-5 max-lg:mt-10 flex justify-center !self-end ">
                <img
                  src={img}
                  alt="hero visual"
                  className="w-full max-lg:max-h-[400px] max-h-[800px] object-contain"
                />
              </div>
            </div>
          </section>
        ))}
      </Carousel>
    </ConfigProvider>
  );
};

export default Hero;
