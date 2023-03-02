import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from "react-hot-toast";
import Footer from './components/nav/Footer';
import Menu from './components/nav/Menu';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HomePage from './pages/HomePage';
import PrivetRoute from './components/routes/PrivetRoute';
import UserDashboard from './pages/user/UserDashboard';
import PageNotFound from './components/PageNotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/routes/AdminRoute';
import Category from './pages/admin/Category';
import Product from './pages/admin/Product';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import AdminProducts from './pages/admin/Products';
import AdminProductUpdateDelete from './pages/admin/ProductUpdateDelete';
import { FloatButton } from 'antd';
import Shop from './pages/Shop';
import SearchPage from './pages/SearchPage';
import ProductView from './pages/ProductView';
import CategoriesList from './pages/CategoriesList';
import CategoryView from './pages/CategoryView';
import Cart from './pages/Cart';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProfile from './pages/admin/Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Menu></Menu>
      <Toaster position='top-right mt-5 zindex-popover'/>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>} />
          <Route path='/shop' element={<Shop/>} />
          <Route path='/search' element={<SearchPage/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/categories' element={<CategoriesList/>} />
          <Route path='/category/:slug' element={<CategoryView/>} />
          <Route path='/product/:slug' element={<ProductView/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          
          {/* Privet Route */}
          <Route path='/dashboard' element={<PrivetRoute/>}>
            <Route path='user' element={<UserDashboard/>} />
            <Route path='user/profile' element={<Profile/>} />
            <Route path='user/orders' element={<Orders/>} />
            
          </Route>

           {/* Admin Route */}
          <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>} />
            <Route path='admin/profile' element={<AdminProfile/>} />
            <Route path='admin/category' element={<Category/>} />
            <Route path='admin/product' element={<Product/>} />
            <Route path='admin/products' element={<AdminProducts/>} />
            <Route path='admin/product/update/:slug' element={<AdminProductUpdateDelete/>} />
            <Route path='admin/orders' element={<AdminOrders/>} />
          </Route>

          <Route path='*' element={<PageNotFound/>} />
        </Routes>
        <Footer/>
        <FloatButton.BackTop />
      </BrowserRouter>
    </div>
  );
}

export default App;
