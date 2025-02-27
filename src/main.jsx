import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';
import routes from './routes/routes.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import store from './redux/store.js';
import { Provider } from 'react-redux';

// import App from './App.jsx';

const router = createHashRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
