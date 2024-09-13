import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase'; // Ensure correct path to your Firebase setup

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndAuthor = async () => {
      try {
        // Fetch post data
        const postRef = doc(db, 'posts', postId);
        const postSnap = await getDoc(postRef);
        if (!postSnap.exists()) {
          setError('Post not found.');
          setLoading(false);
          return;
        }

        const postData = postSnap.data();
        setPost(postData);

        // Fetch author data using userId from the post
        const userRef = doc(db, 'users', postData.userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setAuthor(userSnap.data());
        }

      } catch (err) {
        setError('Failed to load post or author.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndAuthor();
  }, [postId]);

  if (loading) return <p>Loading post details...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post data available</p>;

  return (
    <div className="post-details container mx-auto mt-20 px-4 py-8">
      <div className="post-header mb-8">
      
        {/* Post Content */}
        <div className="post-content mt-6">
          <img
            src={post.coverImageURL || 'default-thumbnail.jpg'} // Fallback image if not provided
            alt={`Cover for ${post.title}`}
            className="w-full h-64 object-cover mb-6 rounded-md"
          />
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-800 leading-relaxed">{post.content}</p>
        </div>
        

         {/* Author Information */}
         {author && (
          <div className="flex items-center mb-4 mt-10">
            <img
              src={author.profileImage || 'default-avatar.jpg'} // Fallback avatar
              alt={`Profile of ${author.name || 'Unknown Author'}`}
              className="w-14 h-14 rounded-full mr-3"
            />
            <div className="author-details">
              <p className="text-sm font-semibold">
                {author.name || 'Unknown Author'}
              </p>
              <p className="text-gray-600 text-sm">
                {post.createdAt ? post.createdAt.toDate().toLocaleDateString() : 'Unknown Date'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
