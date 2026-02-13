import { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import TutorialCard from '../components/TutorialCard.jsx';
import TutorialNotFound from '../components/TutorialNotFound.jsx';


const HomePage = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await api.get('/tutorials');
        console.log("Fetched tutorials:", res.data);
        setTutorials(res.data);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
        toast.error('Failed to fetch tutorials. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  return (
    <div className='min-h-screen bg-base-100'>
      {/* Hero Section */}
      <div className="hero bg-base-200 py-16 mb-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Master New Skills
            </h1>
            <p className="py-6 text-lg">
              Unlock your potential with our community-driven DIY tutorials. Learn, create, and share your own projects today.
            </p>
            <button
              className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              onClick={() => document.getElementById('tutorials-grid').scrollIntoView({ behavior: 'smooth' })}
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>

      <div id="tutorials-grid" className='max-w-7xl mx-auto p-4'>
        <h2 className="text-3xl font-bold mb-8 pl-2 border-l-4 border-primary">Latest Tutorials</h2>

        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {!loading && tutorials.length === 0 && <TutorialNotFound />}

        {tutorials.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {tutorials.map((tutorial) => (
              <TutorialCard key={tutorial._id} tutorial={tutorial} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
};

export default HomePage;