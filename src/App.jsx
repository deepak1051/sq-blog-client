import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import CreateBlog from './pages/CreateBlog';
import SingleBlog from './pages/SingleBlog';

import AuthLayout from './utils/AuthLayout';
import Fail from './pages/Fail';
import useUserData from './hooks/useUserData';

function App() {
  const userQuery = useUserData();
  console.log(useUserData);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<AuthLayout />}>
          <Route element={<CreateBlog />} path="/blogs/new" />
          <Route element={<SingleBlog />} path="/blogs/:id" />
        </Route>
        <Route element={<Fail />} path="/fail" />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
