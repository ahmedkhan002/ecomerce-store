import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/Context';
import Cards from './Cards';
import { ClipLoader } from 'react-spinners';


const Category = () => {
  const { getFilteredProducts } = useAppContext();

  const bestseller = 'tops';
  const newarrive = 'womens-dresses';
  const saleitems = 'mobile-accessories';

  const [DefType, SetType] = useState(bestseller);
  const [products, setproduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const data = await getFilteredProducts(null, DefType);
      setproduct(data || []);
      setLoading(false);
    }

    fetch();
  }, [DefType]);

  const categoryClass = (type) =>
    `cursor-pointer hover:text-black transition ${
      DefType === type ? 'text-black font-bold' : 'text-slate-700'
    }`;

  return (
    <div className='my-10'>
      <div className='flex justify-center flex-wrap gap-8 font-semibold text-lg'>
        <div onClick={() => SetType(newarrive)} className={categoryClass(newarrive)}>
          New Arrivals
        </div>
        <div onClick={() => SetType(bestseller)} className={categoryClass(bestseller)}>
          Best Sellers
        </div>
        <div onClick={() => SetType(saleitems)} className={categoryClass(saleitems)}>
          Sale Items
        </div>
      </div>

      <div className="mt-8 text-center">
        {loading ? (
          <div className="flex justify-center items-center h-100">
            <ClipLoader size={35} color="#86198f" />
          </div>
        ) : (
          <ul className="flex flex-wrap gap-10 justify-center">
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((product) => (
                <Cards
                product={product}
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  images={product.images[0]}
                  imgalt={product.title}
                  keyid={product.id}
                />
              ))
            )}
            
          </ul>
        )}
      </div>
    </div>
  );
};

export default Category;
