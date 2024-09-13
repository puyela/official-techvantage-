import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../Firebase'; // Import Firebase services
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    profileImage: null, // Add profile image state
    linkedin: '',
    twitter: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Hook for navigation

  const changeInputHandler = (e) => {
    const { name, value, files } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value, // Handle image file input separately
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    if (userData.password !== userData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;

      let profileImageUrl = null;

      // Upload profile image to Firebase Storage if available
      if (userData.profileImage) {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(imageRef, userData.profileImage);
        profileImageUrl = await getDownloadURL(imageRef); // Get the download URL
      }

      // Save user data to Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        name: userData.name,
        email: userData.email,
        profileImage: profileImageUrl || null,
        socialLinks: {
          linkedin: userData.linkedin,
          twitter: userData.twitter
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Redirect to login page after successful registration
      window.alert('Registration successful');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className="register">
      <div className="login-container bg-blue-100 p-6 sm:p-12 rounded-lg max-w-lg mx-auto flex flex-col items-center">
        <h2 className="text-2xl mb-8 text-center" style={{ color: 'var(--color-primary)' }}>
          Sign up
        </h2>

        <form className="form space-y-6 w-full" onSubmit={submitHandler}>
          {/* Error message */}
          {error && (
            <p
              className="form-error-message text-white text-sm p-3 rounded-md"
              style={{ backgroundColor: 'var(--color-red)' }}
            >
              {error}
            </p>
          )}

          {/* Name input */}
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            placeholder="Full Name"
            required
          />

          {/* Email input */}
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            placeholder="Email"
            required
          />

          {/* Password input */}
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            placeholder="Password"
            required
          />

          {/* Confirm password input */}
          <input
            type="password"
            name="confirm_password"
            value={userData.confirm_password}
            onChange={changeInputHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            placeholder="Confirm Password"
            required
          />

          {/* Profile Image input */}
          <input
            type="file"
            name="profileImage"
            onChange={changeInputHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />

          {/* LinkedIn input */}
          <input
            type="text"
            name="linkedin"
            value={userData.linkedin}
            onChange={changeInputHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            placeholder="LinkedIn Profile Link"
          />

          {/* Twitter input */}
          <input
            type="text"
            name="twitter"
            value={userData.twitter}
            onChange={changeInputHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            placeholder="Twitter Profile Link"
          />

          {/* Register button */}
          <button
            type="submit"
            className="w-full py-2 text-white rounded-md hover:bg-blue-600 transition duration-200"
            style={{ backgroundColor: 'var(--color-primary)' }}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <small className="block text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
            Log in
          </Link>
        </small>
      </div>
    </section>
  );
};

export default Register;