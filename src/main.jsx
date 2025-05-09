import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.jsx'
import './index.css'
import Videos from './pages/Videos'
import VideoDetail from './pages/VideoDetail'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Videos />
      },
      {
        path: 'videos',
        element: <Videos />
      },
      {
        path: 'videos/:keyword',
        element: <Videos />
      },
      {
        path: 'videos/watch/:videoId',
        element: <VideoDetail />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
