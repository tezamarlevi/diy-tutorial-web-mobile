import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import api from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import ProductCard from '../components/ProductCard.jsx';
import ProductNotFound from '../components/ProductNotFound.jsx';


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/product');
        console.log(res.data);
        setProducts(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        console.log(error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to fetch products. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='min-h-screen'>

      {isRateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className="text-center text-primary py-10">Loading products...</div>}

        {product.length === 0 && !isRateLimited && <ProductNotFound />}

        {product.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {product.map((product) => (
              <ProductCard key={product._id} product={product} setProducts={setProducts} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
};

export default HomePage;