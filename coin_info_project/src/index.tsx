import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {RouterProvider} from "react-router-dom"
import route from './Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </React.StrictMode>
);

