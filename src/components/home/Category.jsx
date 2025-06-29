import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import { ClipLoader } from 'react-spinners';
import { fetchallproducts, fetchByCategory } from '../../store/apidata/apiData';
import { useSelector, useDispatch } from 'react-redux';


const Category = () => {

  const bestseller = 'tops';
  const newarrive = 'womens-dresses';
  const saleitems = 'mobile-accessories';

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products)

  const [DefType, SetType] = useState(bestseller);
  const [product, setproduct] = useState([]);


  useEffect(() => {
    dispatch(fetchByCategory(DefType))
  }, [dispatch, DefType])

  useEffect(() => {
    setproduct(products)
  }, [products])

  const categoryClass = (type) =>
    `cursor-pointer hover:text-black transition ${DefType === type ? 'text-black font-bold' : 'text-slate-700'
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
            {product.length === 0 ? (
              <p>No products found.</p>
            ) : (
              product.map((product) => (
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
