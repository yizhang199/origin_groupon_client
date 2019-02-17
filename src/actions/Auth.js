import types from "./actionTypes";
import { makeHeader } from "../helpers";

import kidsnParty from "../apis/kidsnParty";
import { history } from "../history";

const login = () => {
  return async function(dispatch, getState) {
    const { values } = getState().form.loginForm;

    const response = await kidsnParty.post(`/user/login`, values);
    if (response.data.success) {
      dispatch({ type: types.login, payload: response.data.data });
      localStorage.setItem("user", JSON.stringify(response.data.data));
      history.push("/");
    } else {
      alert("email or password incorrect");
    }
  };
};

const register = () => {
  return async function(getState) {
    const { values } = getState().form.registerForm;
    const response = await kidsnParty.post(`/user/register`, values);
    console.log("register response: ", response);
    history.push("/");
  };
};

const show = () => {
  return async function(dispatch) {
    if (localStorage.getItem("user")) {
      const headers = makeHeader();
      const response = await kidsnParty
        .get("/user", { headers })
        .catch(error => {
          localStorage.removeItem("user");
          history.push("/login");
          return { type: "abc", payload: error };
        });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: types.login, payload: response.data });
      } else {
        localStorage.removeItem("user");
        history.push("/login");
      }
    } else {
      history.push("/login");
      return { type: "abc" };
    }
  };
};

export default {
  login,
  register,
  show
};
