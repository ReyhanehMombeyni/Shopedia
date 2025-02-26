import { useContext, useReducer, useState } from "react";
import { HomeContext } from "./Home";
import { action } from "../js/action";

const Item = ({id,  attributes, deleteHandler}) => {
  const {items}= useContext(HomeContext)
  const { title, image, price } = attributes;

  const [counter, setCounter]= useState(1);
  
  const increaseHandler= ()=> {
    setCounter(counter+1);
    // state.total+=Number(price)
    // setTotal(total+Number(price))
    console.log(items);
  }
  const decreaseHandler=() => {
    if(counter>1){
      setCounter(counter-1)
      // setTotal(total-Number(price))
    }
  }

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl mb-10">
      
        <figure className="w-40 h-40 p-10">
          <img src={image} alt={title} />
        </figure>
        <div className="card-body flex flex-row justify-between">
          <div>
            <h2 className="card-title">{title}</h2>
            <div className="flex">
              <p>${price}</p>
              <button className="btn btn-primary w-fit" onClick={()=>deleteHandler(id)}>delete</button>
            </div>
          </div>
          <div className="card-actions justify-end flex">
            <button onClick={decreaseHandler}>-----</button>
            <p>{counter}</p>
            <button onClick={increaseHandler}>++++++</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
