import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase'; // Firestore instance
import EditPostModal from './EditPostModal';
import DeletePostModal from './DeletePostModal';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserPosts = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.userId) {
        try {
          const postsQuery = await getDocs(query(collection(db, 'posts'), where('userId', '==', storedUser.userId)));
          setPosts(postsQuery.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching posts: ", error);
        }
      }
    };

    fetchUserPosts();
  }, []);

  const handleEditPost = async (postId, updatedData) => {
    try {
      const postDocRef = doc(db, 'posts', postId);
      await updateDoc(postDocRef, updatedData); // Update the post with the new data
      window.alert('Post updated successfully');
      navigate('/blog-posts');
    } catch (error) {
      console.error('Error updating post: ', error);
      window.alert('Error updating post: ');
      navigate('/blog-posts')
    }
  };  

  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setPosts(posts.filter(post => post.id !== postId));
      setDeletingPost(null);
      window.alert('Post deleted successfully');
      navigate('/blog-posts')
    } catch (error) {
      console.error("Error deleting post: ", error);
      window.alert('Error deleting post: ');
      navigate('/blog-posts')
    }
  };

  return (
    <section className="my-posts container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Posts</h2>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Display cover image if it exists */}
              {post.coverImageURL && (
                <img
                  src={post.coverImageURL}
                  alt="Cover"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
                <a href={post.externalLinks} className="text-blue-600 mb-4" >External Links</a>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingPost(post)}
                    className="bg-red-500 bg-red text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}

      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={handleEditPost}
        />
      )}

      {deletingPost && (
        <DeletePostModal
          post={deletingPost}
          onClose={() => setDeletingPost(null)}
          onDelete={handleDeletePost}
        />
      )}
    </section>
  );
};

export default MyPosts;