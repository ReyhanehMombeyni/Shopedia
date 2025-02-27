import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./js/reducer.js";
import { action } from "./js/action.js";
import { client } from "./lib/axios.js";

export const AppContext = createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const getItems = async () => {
    try {
      dispatch({ type: action.SET_ISLOADING, payload: true });
      dispatch({ type: action.SET_ISERROR, payload: false });
      const res = await client.get("products");
      const { data } = res.data;
      const dataSlice= data.slice(0,4)
      dispatch({ type: action.SET_ITEMS, payload: dataSlice });
      dispatch({ type: action.SET_TOTAL });
    } catch (error) {
      dispatch({ type: action.SET_ISERROR, payload: true });
    } finally {
      dispatch({ type: action.SET_ISLOADING, payload: false });
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen p-10">
      <AppContext.Provider value={{state, dispatch}}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
