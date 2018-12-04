
const initialState = { 
  counterSum: 0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "COUNTERSUM":
      return { counterSum: state.counterSum + payload };
	case "INITIAISATION":
	  return  {counterSum:0};
    default:
      return state;
  }
};

