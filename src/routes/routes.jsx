import AdminLayout from '../layout/AdminLayout';
import FrontLayout from '../layout/FrontLayout';
import Dashboard from '../pages/admin/Dashboard';
import AdminProducts from '../pages/admin/AdminProducts';
import Cart from '../pages/cart';
import Home from '../pages/home';
import Login from '../pages/login';
import Order from '../pages/Order';
import ProductDetail from '../pages/product/productDetail';
import ProductList from '../pages/product/productList';
import AdminOrders from '../pages/admin/AdminOrders';
import NotFound from '../pages/NotFound';

const router = [
  {
    path: '/',
    element: <FrontLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'products',
        element: <ProductList />,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'order',
        element: <Order />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'products',
        element: <AdminProducts />,
      },
      {
        path: 'orders',
        element: <AdminOrders />,
      },
    ],
  },
  
];

export default router;

