// pages/routes
import StartPage from '../pages/StartPage';
import AboutPage from '../pages/AboutPage';
import ProductPage from '../pages/ProductPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AddProductPage from '../pages/AddProductPage';

// paths to use with the router and with the main menu
export default [
  { path: '/', element: <StartPage />, menuLabel: 'Start' },
  { path: '/about-us', element: <AboutPage />, menuLabel: 'About us' },
  { path: '/products', element: <ProductPage />, menuLabel: 'Our products' },
  { path: '/product/:id', element: <ProductDetailPage /> },
  { path: '/add-product', element: <AddProductPage />, menuLabel: 'Add a product' }
];