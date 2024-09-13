import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, storage } from '../Firebase'; // Firestore, Firebase auth, and storage imports
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'; // For cover image upload
import userImage from '../assets/isaac techvantage/Dahel CEO.jpg'; // Default user image

const CreatePosts = () => {
  const [externalLinks, setExternalLinks] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageURL, setCoverImageURL] = useState('');
  const [author, setAuthor] = useState({ name: '', image: '', socialLinks: { linkedin: '', twitter: '' } });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('user'))?.userId; // Assuming the user session is stored in localStorage

  // Fetch user data from Firestore based on userId
  useEffect(() => {
    const fetchAuthorData = async () => {
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setAuthor({
              name: userData.name,
              image: userData.profileImage || userImage, // Fallback to default image if none is provided
              socialLinks: userData.socialLinks || { linkedin: '', twitter: '' }
            });
          } else {
            setError('User data not found.');
          }
        } catch (error) {
          console.error('Error fetching author data:', error);
          setError('Failed to fetch user data.');
        }
      }
    };

    fetchAuthorData();
  }, [userId]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `coverImages/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress can be tracked here if necessary
        },
        (error) => {
          console.error('Error uploading image: ', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setCoverImageURL(downloadURL);
          });
        }
      );
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !coverImageURL) {
      setError('Title, content, and cover image are required.');
      return;
    }

    try {
      // Add post to Firestore
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        externalLinks,
        coverImageURL,
        userId,
        authorName: author.name, // Include author's name
        authorImage: author.image, // Include author's profile image
        socialLinks: author.socialLinks, // Include author's social links
        createdAt: serverTimestamp(), // Auto-generate the post date
      });

      // Redirect to homepage or dashboard
      navigate('/blog-posts');
    } catch (error) {
      setError('Error creating post. Please try again.');
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create a New Post</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Post Title */}
        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Content with TinyMCE Editor */}
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='h-40'
            //onEditorChange={(newContent) => setContent(newContent)}
          />
        </div>

        {/* External Links */}
        <div className="form-group">
          <label htmlFor="externalLinks">External Links</label>
          <input
            type="url"
            id="externalLinks"
            value={externalLinks}
            onChange={(e) => setExternalLinks(e.target.value)}
          />
        </div>

        {/* Cover Image Upload */}
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <input type="file" id="coverImage" onChange={handleImageUpload} required />
          {coverImageURL && <img src={coverImageURL} alt="Cover" className="cover-preview" />}
        </div>

        {/* Display Author Info */}
        <div className="form-group">
          <h3>Author Information</h3>
          <div className='flex'>
            <img src={author.image} alt="Author" className="author-image w-10 h-10" />
            <label>Name: {author.name}</label>
          </div>
          <p>LinkedIn: {author.socialLinks.linkedin}</p>
          <p>Twitter: {author.socialLinks.twitter}</p>
        </div>

        {/* Submit Button */}
        <button type="submit" className="create-post-btn">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePosts;