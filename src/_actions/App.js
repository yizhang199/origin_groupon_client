import types from "./actionTypes";

import { kidsnParty } from "../_apis";

const index = () => {
  return async function(dispatch) {
    const response = await kidsnParty.get("/initial", {
      params: {
        language_id: localStorage.getItem("aupos_language_id")
          ? localStorage.getItem("aupos_language_id")
          : null
      }
    });
    dispatch({ type: types.initialApp, payload: response.data });
  };
};

const switchLanguage = language_id => {
  language_id = parseInt(language_id);
  language_id = language_id === 1 ? 2 : 1;

  return {
    type: types.switchLanguage,
    payload: language_id
  };
};

export default {
  index,
  switchLanguage
};
