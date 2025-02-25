import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "./components/Layout/Layout.jsx";
import Home, { loader as loaderProducts } from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: loaderProducts,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="bg-blue-50 min-h-screen p-10">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
