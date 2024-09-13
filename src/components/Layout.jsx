// import React from 'react';
// import { Outlet, useLocation } from "react-router-dom";
// import Footer from './Footer';
// import Header from './Header';
// import SearchBar from './SearchBar';

// const Layout = () => {
//   const location = useLocation();
  
//   // List of paths where the search bar should be visible
//   const showSearchBar = ["/", "/posts/:id", "/posts/categories/:category", "/posts/users/:id"].includes(location.pathname);

//   const handleSearchChange = (event) => {
//     console.log("Search query:", event.target.value);
//   };

//   return (
//     <>
//       <Header />
//       {/* Conditionally render SearchBar based on the path */}
//       {showSearchBar && (
//         <section className="search-section">
//           <SearchBar placeholder="Search for blog posts..." onChange={handleSearchChange} />
//         </section>
//       )}
//       <Outlet />
//       <Footer />
//     </>
//   );
// };

// export default Layout;


import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  const location = useLocation();
  

  return (
    <>
      {/* Conditionally render Header */}
      <Header />
      
      
      {/* This is where the children routes will be rendered */}
      <Outlet />
      
      {/* Conditionally render Footer */}
    {<Footer />}
    </>
  );
};

export default Layout;
