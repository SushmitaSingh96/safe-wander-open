import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Explore from './pages/Explore'
import AddReview from './pages/AddReview'
import Profile from './pages/Profile'
import PlaceDetails from './pages/PlaceDetails'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/add-review" element={<AddReview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/places/:id" element={<PlaceDetails />} />
        </Routes>
      </motion.main>
    </div>
  )
}

export default App