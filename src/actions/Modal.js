import types from "./actionTypes";

const hide = () => {
  return {
    type: types.hideModal
  };
};

const show = () => {
  return {
    type: types.showModal
  };
};

export default {
  hide,
  show
};
