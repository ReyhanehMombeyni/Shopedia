import { useContext, useState } from "react";
import { action } from "../js/action";
import { AppContext } from "../App";
import { BiTrash } from "react-icons/bi";

const Item = ({id,  attributes}) => {
  const {state, dispatch}= useContext(AppContext)
  const {items}= state;
  const { title, image, price } = attributes;
  
  const [counter, setCounter]= useState(1);
  const priceNumber= Number(price);

  const deleteHandler= (index) => {
    const newItems= items.filter(item => item.id!==index);
    const totalPriceItem= counter*priceNumber;    
    dispatch({type: action.DELETE_ITEM, payload: {totalPriceItem, newItems}})

  }
  
  const increaseHandler= ()=> {
    setCounter(counter+1);
    dispatch({type: action.INCREASE, payload: priceNumber})
  }
  const decreaseHandler=() => {
    if(counter>1){
      setCounter(counter-1)
      dispatch({type: action.DECREASE, payload: priceNumber})
    }
  }

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl mb-10 flex items-center">
        <figure className="w-40 h-40 p-10">
          <img src={image} alt={title} />
        </figure>
        <div className="card-body flex flex-row justify-between">
          <div className="flex flex-col justify-center gap-3">
            <h2 className="card-title">{title}</h2>
            <div className="flex items-center w-fit gap-5">
              <p>${priceNumber}</p>
              {/* <BiTrash /> */}
              <button className="text-xl" onClick={()=>deleteHandler(id)}><BiTrash /></button>
            </div>
          </div>
          <div className="card-actions justify-end flex items-center gap-3">
            <button className={counter>1 ? "px-2 text-white text-xl font-bold rounded-sm bg-[#F97316]" : "px-[7px] py-0 text-xl font-bold rounded-sm border-1 bg-none text-gray-400"} onClick={decreaseHandler}>-</button>
            <p className="text-md font-medium">{counter}</p>
            <button className="px-1 text-white text-xl font-bold rounded-sm bg-[#F97316]" onClick={increaseHandler}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
