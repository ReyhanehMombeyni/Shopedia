import Item from "./Item";
import Empty from "./Empty";
import { useContext } from "react";
import { AppContext } from "../App";
import { action } from "../js/action";

const Home = () => {
  
  const {state, dispatch}= useContext(AppContext);
  const {items, isLoading, total}= state;

  return (
    <>
      <div className="m-20">
        <h1 className="text-3xl font-bold mb-5">Products</h1>
        {!items ? (
          isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <Empty />
          )
        ) : (
          items?.map((item) => <Item key={item.id} {...item} />)
        )}
      </div>
      {
        items && <div className="border-t-2 border-gray-300 border-solid flex flex-col items-center mx-20">
        <div className="flex justify-between w-full py-5">
          <h2 className="text-xl font-bold">total</h2>
          <p className="bg-[#F97316] text-white text-xl font-bold px-5">${total}</p>
        </div>
        <button
          className="btn text-gray-500"
          onClick={() => dispatch({ type: action.CLEAR_ITEMS })}
        >
          clear cart
        </button>
      </div>
      }
      
    </>
  );
};

export default Home;
