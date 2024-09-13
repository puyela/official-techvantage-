import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import PostDetails from './pages/PostDetails';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePosts from './pages/CreatePosts';
import Posts from './components/Posts';
import MyPosts from './components/MyPosts';
import SearchPosts from './pages/SearchPosts';



const router = createBrowserRouter ([
  {
    path: "/",
    element: <Layout/>, 
    errorElement: <ErrorPage/>,
    children:[
      {index: true, element: <Home/> },
      {path: "posts/:postId", element: <PostDetails/> },
      {path: "register", element: <Register/> },
      {path: "login", element: <Login/> },
      {path: "profile/:userId", element: <UserProfile/> },
      {path: "authors", element: <Authors/> },
      {path: "create-post", element: <CreatePosts/> },
      {path: "/blog-posts", element: <Posts /> },
      {path: '/myposts', element: <MyPosts />},
      {path: '/search-posts', element: <SearchPosts />},
    ] 
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
  