import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {RouterProvider} from "react-router-dom"
import route from './Router';
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
import {RecoilRoot} from "recoil"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient()
root.render(

  <React.StrictMode>
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={route}></RouterProvider>
    </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);


