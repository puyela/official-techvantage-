import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { getDoc, updateDoc, doc, collection, query, where, getDocs } from 'firebase/firestore'; // Firestore methods
import { updateEmail, updatePassword } from 'firebase/auth'; // Firebase Auth methods
import { db, auth, storage } from '../Firebase'; // Firestore, Firebase Auth, and Storage instances
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage
import AvatarPlaceholder from "../assets/isaac techvantage/Dahel CEO.jpg"; // Placeholder image


const UserProfile = () => {
  const [avatar, setAvatar] = useState(AvatarPlaceholder);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(''); // Error message state
  const [socialLinks, setSocialLinks] = useState({ twitter: '', linkedin: '' });
  const [postCount, setPostCount] = useState(0); // Post count state
  const [isUploading, setIsUploading] = useState(false); // Upload state

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.userId) {
        try {
          const userDoc = await getDoc(doc(db, 'users', storedUser.userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setAvatar(userData.profileImage || AvatarPlaceholder);
            setName(userData.name);
            setEmail(userData.email);
            setSocialLinks(userData.socialLinks || { twitter: '', linkedin: '' });

            // Fetch the user's post count
            await fetchUserPosts(storedUser.userId);
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    const fetchUserPosts = async (userId) => {
      try {
        const postsQuery = query(
          collection(db, 'posts'), // Assuming 'posts' is the collection where posts are stored
          where('userId', '==', userId) // Filter posts by the logged-in user's ID
        );
        const postsSnapshot = await getDocs(postsQuery);
        setPostCount(postsSnapshot.size); // Set the post count based on the number of documents retrieved
      } catch (error) {
        console.error("Error fetching user posts: ", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle avatar change and upload image to Firebase Storage
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Start uploading

      // Create a storage reference
      const storageRef = ref(storage, `avatars/${file.name}`);

      // Upload the file
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle progress if needed
        },
        (error) => {
          console.error('Error uploading file:', error);
          setIsUploading(false);
        },
        async () => {
          // Get the download URL once upload is complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setAvatar(downloadURL);
          setIsUploading(false);
        }
      );
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');

    // Ensure the new password matches the confirmation password
    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.userId) {
        // Update user details in Firestore
        await updateDoc(doc(db, 'users', storedUser.userId), {
          name,
          email,
          profileImage: avatar, // Save the avatar URL to Firestore
          socialLinks,
        });

        // Update email and password if provided
        if (auth.currentUser && currentPassword && newPassword) {
          await updateEmail(auth.currentUser, email);
          await updatePassword(auth.currentUser, newPassword);
        }

        window.alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      setError(error.message);
    }
  };

  return (
    <section className="profile">
      <div className="profile-container">
        
      <div className="profile-stats">
          <p><strong>Total Posts:</strong> {postCount}</p>
        </div>

        <Link to={`/myposts`} className='btn'>My Posts</Link>

        <div className="profile-details">
          <div className="avatar-wrapper">
            <div className="profile-avatar">
              <img src={avatar} alt='User Avatar'/>
            </div>

            {/* Form to update avatar */}
            <form className="avatar-form">
              <input type="file" name='avatar' id='avatar' onChange={handleAvatarChange} accept='image/png,image/jpeg' />
              <label htmlFor="avatar" >
                <FaEdit className='cursor-pointer'/>
              </label>
            </form>
          </div>

          <h1>{name}</h1>

          {/* Form to update user details */}
          <form className="form profile-form" onSubmit={handleUpdateProfile}>
            {/* Error message display */}
            {error && (
              <p className="form__error-message">
                {error}
              </p>
            )}

            <div className="form-group">
              <input
                type="text"
                placeholder='Full Name'
                className="form-input"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder='Email'
                className="form-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {/* Add inputs for social links in the form */}
            <div className="form-group">
              <input
                type="url"
                placeholder='Twitter URL'
                className="form-input"
                value={socialLinks.twitter}
                onChange={e => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                type="url"
                placeholder='LinkedIn URL'
                className="form-input"
                value={socialLinks.linkedin}
                onChange={e => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder='Current Password'
                className="form-input"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder='New Password'
                className="form-input"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder='Confirm Password'
                className="form-input"
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <button type="submit" className='p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
              {isUploading ? 'Uploading...' : 'Update Details'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;