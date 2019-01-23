import React from "react";
import { connect } from "react-redux";

import { addToShoppingCartList } from "../actions";

import "../css/ChoiceForm.css";
class ChoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { choices: [] };
  }

  componentDidMount() {
    let newArray = [];
    this.props.product.options.map(option => {
      if (option.type === "radio") {
        newArray = [
          ...newArray,
          { name: option.option_name, choice: option.values[0].name }
        ];
      } else if (option.type === "checkbox") {
        newArray = [...newArray, { name: option.option_name, choice: [] }];
      }
    });

    this.setState({ choices: newArray });
  }

  handleChange = e => {
    switch (e.target.type) {
      case "radio":
        this.radioButtonEvent(e.target.value, e.target.name);
        break;
      case "checkbox":
        this.checkboxEvent(
          e.target.name,
          e.target.getAttribute("data-group-product-option-id"),
          e.target.checked
        );
        break;
      default:
        break;
    }
  };

  radioButtonEvent = (value, name) => {
    this.setState({
      choices: this.state.choices.map(ele => {
        if (ele.name === name) {
          return { ...ele, choice: value };
        } else {
          return ele;
        }
      })
    });
  };

  checkboxEvent = (value, name, status) => {
    console.log({ value, name, status });

    this.setState({
      choices: this.state.choices.map(ele => {
        if (ele.name === name && status) {
          return { ...ele, choice: [...ele.choice, value] };
        } else if (ele.name === name) {
          return { ...ele, choice: ele.choice.filter(item => item === value) };
        } else {
          return ele;
        }
      })
    });
  };

  makePrice = value => {
    if (value > 0) {
      return `$${value}`;
    }
    return "";
  };

  renderOption = option => {
    switch (option.type) {
      case "radio":
        return option.values.map(option_value => {
          return (
            <label key={`optionValue${option_value.product_option_value_id}`}>
              <input
                name={option.option_name}
                type="radio"
                value={option_value.product_option_value_id}
                onChange={this.handleChange}
              />
              {option_value.name}
            </label>
          );
        });

      case "checkbox":
        return option.values.map(value => {
          return (
            <label key={`optionValue${value.product_option_value_id}`}>
              <input
                name={value.product_option_value_id + ""}
                type="checkbox"
                data-group-product-option-id={option.product_option_id}
                onChange={this.handleChange}
              />
              {value.name}
            </label>
          );
        });

      default:
        break;
    }
  };

  renderOptions = () => {
    return this.props.product.options.map((option, index) => {
      return (
        <div className="component-choice-form__body" key={`option${index}`}>
          <div className="component-choice-form__option-name">
            {option.option_name}
          </div>

          {this.renderOption(option)}
        </div>
      );
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newOrderItem = { ...this.props.product, choices: this.state.choices };
    console.log("newOrderItem: ", newOrderItem);

    // this.props.addToShoppingCartList(newOrderItem);
  };

  render() {
    return (
      <div className="component-choice-form">
        <div className="component-choice-form__header">
          <div className="component-choice-form__header__image-container">
            <img src={this.props.product.image} alt={this.props.product.name} />
          </div>
          <div className="component-choice-form__header__product-info">
            <div className="component-choice-form__product-name">
              {this.props.product.name}
            </div>
            <div className="component-choice-form__product-price">
              ${this.props.product.price}
            </div>
          </div>
        </div>

        <form onSubmit={this.onSubmit}>
          {this.renderOptions()}
          <div className="component-choice-form__footer">
            <div className="componente-choice-form__button-container">
              <button>确定</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addToShoppingCartList }
)(ChoiceForm);
