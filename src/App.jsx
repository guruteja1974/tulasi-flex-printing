import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { router } from './routes/index.jsx';

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
