import { createContext, useEffect, useReducer } from "react";
import { client } from "../lib/axios";
import { initialState, reducer } from "../js/reducer";
import Item from "./Item";
import Empty from "./Empty";
import { action } from "../js/action";

// export const loader= async () => {
//   const res= await client.get("products");
//   const {data}= res.data
//   return data;
// }

export const HomeContext = createContext(null);
const Home = () => {
  const [state, dispatch]= useReducer(reducer, initialState)
  const {items, isError, isLoading, total}= state;

  const getItems = async () => {
    try {
      dispatch({type:action.SET_ISLOADING, payload: true})
      dispatch({type: action.SET_ISERROR, payload: false})
      const res = await client.get("products");
      const { data } = res.data;
      dispatch({type: action.SET_ITEMS, payload: data})
      dispatch({type: action.SET_TOTAL})
    } catch (error) {
      dispatch({type: action.SET_ISERROR, payload: true})
    } finally {
      dispatch({type:action.SET_ISLOADING, payload: false})
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const deleteHandler= (index) => {
    const newItems= items.filter(item => item.id!==index);
    dispatch({type: action.SET_ITEMS, payload: newItems})
  }

  // const decreaseHandler=(count)=> {
  //   count-=1;
  //   dispatch({type: action.REMOVE_TOTAL, payload: count})
  // }

  return (
    <HomeContext.Provider value={state.items}>
      <div className="m-20">
        <h1 className="text-3xl font-bold mb-5">Products</h1>
        {!items
          ? (isLoading ? <h1>Loading...</h1> : <Empty />)
          : (items?.map((item) => <Item key={item.id} {...item} deleteHandler={deleteHandler} />))}
      </div>
      <div className="border-t-2 border-gray-300 border-solid">
        <div>
          <h2>total</h2>
          <p>{total}</p>
        </div>
        <button className="btn text-gray-500" onClick={()=>dispatch({type: action.SET_ITEMS, payload:null})}>clear cart</button>
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
