import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  increaseNumber = () => {
    this.props.onCounterValueChanged(1);
    this.props.onClickIncreased(1, this.props.id);
  };

  decreaseNumber = () => {
    this.props.onCounterValueChanged(-1);
    this.props.onClickDecreased(1, this.props.id);
  };

  render() {
    return (
      <p>
        <button onClick={this.increaseNumber}>+</button>
        <span>{this.props.countValue}</span>
        <button onClick={this.decreaseNumber}>-</button>
      </p>
    );
  }
}

export default Counter;
