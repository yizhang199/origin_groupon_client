import types from "./actionTypes";
import { kidsnParty } from "../_apis/";
import { makeHeader } from "../_helpers";

const index = () => {
  const language_id = localStorage.getItem("aupos_language_id")
    ? localStorage.getItem("aupos_language_id")
    : null;
  const headers = makeHeader();
  return async function(dispatch) {
    const response = await kidsnParty.get(`/products`, {
      headers,
      params: { language_id }
    });

    dispatch({ type: types.getProducts, payload: response });
  };
};

export default {
  index
};
