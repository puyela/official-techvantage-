import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaBars, FaPlusCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { getDoc, doc } from 'firebase/firestore'; // Firestore imports
import { db } from '../Firebase'; // Firestore instance
import userImage from '../assets/isaac techvantage/Dahel CEO.jpg'; // Default user image or placeholder

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Track the authenticated user
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Control profile dropdown visibility
  const [profileImage, setProfileImage] = useState(userImage); // User's profile image
  const [userID, setUserID] = useState(""); // Store user ID from Firestore

  // Fetch user data from Firestore based on userId from localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user')); // Get stored user from localStorage
      if (storedUser && storedUser.userId) {
        try {
          // Fetch user data from Firestore using the userId
          const userDoc = await getDoc(doc(db, 'users', storedUser.userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData); // Set user data
            setProfileImage(userData.profileImage || userImage); // Use profileImage from Firestore or fallback image
            setUserID(storedUser.userId); // Ensure userId is set from localStorage
          } else {
            console.log("No such user found in Firestore!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData(); // Call the function to fetch user data when component mounts
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Remove user session from local storage and reset user state
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav>
      <div className="container nav-container">
        <Link to="/" className='nav-logo'>
          <span className="logo-tech">Tech</span>
          <span className="logo-vantage">Vantage</span>
        </Link>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={handleCloseMenu}>Home</Link></li>
          <li><Link to="/authors" onClick={handleCloseMenu}>Authors</Link></li>
          <li><Link to="/blog-posts" onClick={handleCloseMenu}>Blog Post</Link></li>
        </ul>

        <div className="nav-actions">
          <Link to='/create-post' className="create-post-btn">
            <FaPlusCircle className="create-post-icon" />
            <span>Create Post</span>
          </Link>
        </div>

        <div className="nav-user">
          {user ? (
            <div className="user-dropdown">
              <img
                src={profileImage} // Display the user's profile image or fallback image
                alt="User"
                className="user-image"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
              />
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {/* Pass the correct userId in the profile link */}
                  <Link to={`/profile/${userID}`} onClick={() => setIsDropdownOpen(false)}>View Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link> // Show Login if user is not authenticated
          )}
        </div>

        <button className="nav-toggle-btn" onClick={handleToggleMenu}>
          {isMenuOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;