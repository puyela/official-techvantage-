import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail'; // Import the detailed post component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} /> {/* Home page showing all posts */}
        <Route path="/posts/:postID" element={<PostDetail />} /> {/* Dynamic route for post details */}
      </Routes>
    </Router>
  );
}

export default App;