import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiMail } from 'react-icons/ci';
import { IoLockClosedOutline } from 'react-icons/io5';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth method
import { doc, getDoc } from 'firebase/firestore'; // Firestore imports
import { auth, db } from '../Firebase'; // Import the auth and db instances

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // State to store error messages
  const navigate = useNavigate(); // Hook for navigation after successful login

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // Authenticate the user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;

      // Fetch additional user information from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userProfileData = userDoc.data();

        // Store user data in both localStorage and sessionStorage
        const userInfo = {
          email: user.email,
          name: userProfileData.name,
          profileImage: userProfileData.profileImage,
          userId: user.uid,
        };

        localStorage.setItem('user', JSON.stringify(userInfo));
        sessionStorage.setItem('user', JSON.stringify(userInfo));

        window.alert('Login successful');
        navigate('/'); // Redirect after login
      } else {
        setError('User data not found in Firestore.');
      }
    } catch (err) {
      // Set the error message if login fails
      setError(err.message);
    }
  };

  return (
    <section className="login">
      <div
        className="login-container bg-blue-100 p-6 sm:p-12 rounded-lg max-w-lg mx-auto flex flex-col items-center"
      >
        <h2 className="text-2xl mb-8 text-center" style={{ color: 'var(--color-primary)' }}>
          Log in
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

          {/* Email input with icon */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <CiMail className="text-gray-700 text-xl pr-2" />
            </span>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={changeInputHandler}
              autoFocus
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--input-background)',
                borderColor: 'var(--input-border)',
              }}
              placeholder="Email"
            />
          </div>

          {/* Password input with icon */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <IoLockClosedOutline className="text-gray-700 text-xl pr-2" />
            </span>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={changeInputHandler}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--input-background)',
                borderColor: 'var(--input-border)',
              }}
              placeholder="Password"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 text-white rounded-md hover:bg-blue-600 transition duration-200"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Login
          </button>
        </form>

        <small className="block text-center mt-4">
          Don't have an account yet?{' '}
          <Link to="/Register" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
            Sign Up
          </Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
