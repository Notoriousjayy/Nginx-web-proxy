import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import AboutList from './pages/AboutList'
import AboutRobot from './pages/AboutRobot'
import Contact from './pages/Contact'
import Account from './pages/Account'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/blog" element={<BlogList/>}/>
      <Route path="/blog/:slug" element={<BlogPost/>}/>
      <Route path="/about" element={<AboutList/>}/>
      <Route path="/about/:slug" element={<AboutRobot/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}
