import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../Firebase'; // Ensure correct path to your Firebase setup

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const postsQuery = query(postsCollection, orderBy('createdAt', 'desc')); // Fetch posts from newest to oldest
        const postSnapshot = await getDocs(postsQuery);

        const postList = postSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date() // Convert Firestore timestamp to JS Date
        }));
        setPosts(postList);

      } catch (err) {
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="px-4 py-8">
      <h2 className='text-center mb-8'>Blog Post</h2>
      {posts.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <article key={post.id} className="bg-white p-5 rounded-3xl shadow-md hover:shadow-lg transition duration-300">
              <div className="overflow-hidden rounded-md h-64">
                <img
                  src={post.coverImageURL || 'default-thumbnail.jpg'} // Fallback image if URL is not provided
                  alt={post.title || 'Post thumbnail'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6">
                <Link to={`/posts/${post.id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors duration-300">
                    {post.title || 'No Title Available'}
                  </h3>
                </Link>
                <p className="mt-2 text-gray-700">
                  {post.content ? (post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content) : 'No description available'}
                </p>

                {/* Author Information */}
                <div className="flex items-center mt-4">
                  <img
                    src={post.authorImage || 'default-avatar.jpg'}
                    alt={post.authorName || 'Unknown Author'}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <p className="text-gray-600">By: {post.authorName || 'Unknown Author'}</p>
                </div>

                {/* Post Date */} {/* Read More Button */}
                <div className="text-gray-600 mt-4 flex justify-between">
                  <p className='mt-4'>{post.createdAt ? post.createdAt.toLocaleDateString() : 'Unknown Date'}</p>

                  <Link
                    to={`/posts/${post.id}`}
                    className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors text-xs duration-300"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="text-center">No Posts Found</h2>
      )}
    </section>
  );
};

export default Posts;