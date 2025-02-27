export const initialState = {
  items: null,
  isLoading: false,
  isError: false,
  total: 0,
};

export const reducer= (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {...state, items: action.payload}
    case "SET_ISERROR":
      return {...state, isError: action.payload}
    case "SET_ISLOADING":
      return {...state, isLoading: action.payload}
    case "SET_TOTAL":
      let count=0;
      state.items.map(item => count+=(Number(item.attributes.price)))
      return {...state, total: count}
    case "CLEAR_ITEMS":
      return {...state, items: null, total: 0}
    case "INCREASE":
      return {...state, total: state.total + action.payload}
    case "DECREASE":
      return {...state, total: state.total - action.payload}
    case "DELETE_ITEM":
      const {totalPriceItem, newItems}= action.payload;
      return {...state, total: state.total - totalPriceItem, items: newItems}
    default:
      break;
  }
}
