import types from "./actionTypes";
import kidsnParty from "../apis/kidsnParty";

const index = () => {
  const language_id = localStorage.getItem("aupos_language_id")
    ? localStorage.getItem("aupos_language_id")
    : null;

  return async function(dispatch) {
    const response = await kidsnParty.get(`/products`, {
      params: { language_id }
    });

    dispatch({ type: types.getProducts, payload: response });
  };
};

export default {
  index
};
