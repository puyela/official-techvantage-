import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const usersList = await Promise.all(
          userSnapshot.docs.map(async (doc) => {
            const userData = doc.data();
            const userId = doc.id;

            const postsQuery = query(collection(db, 'posts'), where('userId', '==', userId));
            const postSnapshot = await getDocs(postsQuery);
            const postCount = postSnapshot.size;

            return {
              id: userId,
              profileImage: userData.profileImage,
              name: userData.name,
              postCount: postCount,
            };
          })
        );

        // Filter out authors with zero posts and sort by post count in descending order
        const activeAuthors = usersList.filter(author => author.postCount > 0);
        const sortedAuthors = activeAuthors.sort((a, b) => b.postCount - a.postCount);
        
        // Add rank to top 3 authors
        const rankedAuthors = sortedAuthors.map((author, index) => {
          if (index < 3) {
            return { ...author, rank: index + 1 };
          }
          return author;
        });

        // Add authors with zero posts at the end without ranking
        const zeroPostAuthors = usersList.filter(author => author.postCount === 0);
        
        setAuthors([...rankedAuthors, ...zeroPostAuthors]);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load authors.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleAuthorClick = (authorId) => {
    navigate(`/search-posts?userId=${authorId}`);
  };

  if (loading) return <p className='mt-[10vh] justify-center flex'>Loading Authors...</p>;
  if (error) return <p className='mt-[10vh] justify-center flex'>{error}</p>;

  return (
    <section className="authors">
      <h2 className='text-center mb-8'>Author's</h2>
      {authors.length > 0 ? (
        <div className="authors-container">
          {authors.map(({ id, profileImage, name, postCount, rank }) => (
            <div key={id} className={`author cursor-pointer relative ${rank ? 'top-blogger' : ''}`} onClick={() => handleAuthorClick(id)}>
              <div className="author-avatar">
                <img src={profileImage || 'default-avatar.jpg'} alt={`Image of ${name}`} />
              </div>
              <div className="author-info">
              {rank && (
                <p className={`top-blogger-banner rank-${rank} text-blue-600`}>
                  Top Blogger #{rank}
                </p>
              )}
                <h4>{name || 'Unknown Author'}</h4>
                <p>{postCount > 0 ? `${postCount} post${postCount > 1 ? 's' : ''}` : 'No posts'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="justify-center flex">No Authors Found</h2>
      )}
    </section>
  );
};

export default Authors;