import Home from './screens/Home';
import Login from './screens/Login';
import Loading from './screens/Loading';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import NotFound from './screens/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export default function App() {

    const router = createBrowserRouter([
        { path: "/", element: <Loading/> },
        { path: "/*", element: <NotFound/> },
        { path: "/home", element: <Home/> },
        { path: "/chat", element: <Chat/> },
        { path: "/login", element: <Login/> },
        { path: "/signup", element: <Signup/> }
      ]);
      
 return  <RouterProvider router={router} />
}