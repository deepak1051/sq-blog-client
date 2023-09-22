import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import CreateBlog from './pages/CreateBlog';
import SingleBlog from './pages/SingleBlog';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AuthLayout from './utils/AuthLayout';

function App() {
  console.log(import.meta.env);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<AuthLayout />}>
          <Route element={<CreateBlog />} path="/blogs/new" />
          <Route element={<SingleBlog />} path="/blogs/:id" />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
