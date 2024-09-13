import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail3 from '../assets/isaac techvantage/nacos.jpg';
import { motion } from 'framer-motion';
import Posts from '../components/Posts';

const Home = () => {

  return (
    <>
      <div className="relative overflow-hidden"> 
        <h1 className='mt-40 text-center'>Hompe page</h1>
        {/* <div
          className="hero-background absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
  
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-70"></div>

        <div className="relative container mx-auto px-4">
          <motion.h1
            className="text-6xl font-bold text-white mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            Welcome to TechVantage Blog
          </motion.h1>

          <motion.p
            className="text-lg font-semibold mb-40"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Your gateway to the latest trends, tutorials, and insights in tech.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Link to="/posts" className="bg-blue-600 text-white text-lg py-4 px-6 rounded-full hover:bg-blue-500 transition">
              Explore Blog Posts
            </Link>
          </motion.div>
        </div> */}

      {/* Recent Posts Section */}
      {/* <section className="py-12 px-4 md:px-12 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Recent Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.desc}</p>
                <Link to={/posts/${post.id}} className="text-blue-600 hover:underline mt-4 block">Read More</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12 text-center bg-gradient-to-r from-blue-500 to-teal-400 text-white">
        <h2 className="text-3xl font-bold mb-4">Want to stay updated?</h2>
        <p className="text-lg mb-8">Subscribe to our newsletter for the latest posts and news straight to your inbox.</p>
        <Link to="/subscribe" className="bg-white text-blue-600 py-3 px-6 rounded-full hover:bg-gray-100 transition">
          Subscribe
        </Link>
      </section> */}
    </div>
    </>
  );
};

export default Home;