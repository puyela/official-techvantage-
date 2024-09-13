// SearchPosts.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Firebase'; // Ensure Firebase is correctly initialized
import { useLocation } from 'react-router-dom'; // To get query parameters
import Posts from '../components/Posts'; // Import the Posts component

const SearchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); // Hook to access query parameters

  useEffect(() => {
    // Get userId from query parameters
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');

    // Fetch posts for the specified user
    const fetchPosts = async () => {
      if (!userId) return;

      try {
        const postsQuery = query(
          collection(db, 'posts'), // Assuming 'posts' is your collection name
          where('userId', '==', userId)
        );
        const postSnapshot = await getDocs(postsQuery);
        const postsList = postSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsList);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  if (loading) return <p className='mt-[10vh] justify-center flex'>Loading Posts...</p>;
  if (error) return <p className='mt-[10vh] justify-center flex'>{error}</p>;

  return (
    <section className="search-posts">
      {posts.length > 0 ? (
        <Posts posts={posts} />
      ) : (
        <h2 className="justify-center flex">No Posts Found</h2>
      )}
    </section>
  );
};

export default SearchPosts;