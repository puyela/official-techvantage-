import React, { useState, useEffect, createContext } from 'react';
import { auth } from './Firebase'; // Import your Firebase configuration
import { onAuthStateChanged } from 'firebase/auth'; // Firebase auth functions

// Create the AuthContext
export const AuthContext = createContext(null);

// Create the AuthProvider to wrap the app and handle authentication
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once auth state is determined
    });

    return () => unsubscribe();
  }, []);

  // While checking auth state, display a loading screen
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};
