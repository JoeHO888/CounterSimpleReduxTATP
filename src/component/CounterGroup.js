import React, { Component } from "react";
import Counter from "./Counter";
import { connect } from "react-redux";

class CounterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
       counterSum: 0,// ,   move this state to ./reducer which can do the data logic and return the new state to mapStateToProps
	  counterArr: new Array(parseInt(this.props.defaultCount))
        .fill(0)
        .map(() => ({ count: 0, id: this.generateID() }))
    };
  }

  generateID = () => {
    return new Date().getTime() + Math.random();
  };

  regenrateCounters = () => {
    this.setState({
      counterArr: new Array(parseInt(this.refs.countInput.value))
        .fill(0)
        .map(() => ({ count: 0, id: this.generateID() })),
      counterSum: 0
    });
	this.props.dispatch({ //this dispatch will wuto inject by connect() method
      type: "INITIAISATION",
      payload: 0
    });
  };

  counterUpdateCallback = changedNum => {
    // this.setState({ counterSum: this.state.counterSum + changedNum });
    this.props.dispatch({ //this dispatch will wuto inject by connect() method
      type: "COUNTERSUM",
      payload: changedNum
    }); //{type: "", payload: xxx} named action, it will bo translated to ./reducer
  };

  increaseNumber = (changedNum, id) => {
    const changedArr = this.state.counterArr.map(counterItem => {
      if (counterItem.id === id) {
        return { id: id, count: counterItem.count + changedNum };
      } else {
        return counterItem;
      }
    });

    this.setState({ counterArr: [...changedArr] });
  };

  decreaseNumber = (changedNum, id) => {
    const changedArr = this.state.counterArr.map(counterItem => {
      if (counterItem.id === id) {
        return { id: id, count: counterItem.count - changedNum };
      } else {
        return counterItem;
      }
    });

    this.setState({ counterArr: [...changedArr] });
  };

  render() {
    return (
      <div>
        {this.state.counterArr.map(counterItem => (
          <Counter
            key={counterItem.id}
            id={counterItem.id}
            countValue={counterItem.count}
            onCounterValueChanged={this.counterUpdateCallback}
            onClickIncreased={this.increaseNumber}
            onClickDecreased={this.decreaseNumber}
          />
        ))}
        <input type="text" ref="countInput" />
        <button onClick={this.regenrateCounters}>
          Regenerate indicated Counters
        </button>
        <br />
        <span>总和：{this.props.counterSum}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counterSum: state.counterSum
}); 
// counterSum is a prop in CounterGroup, it will give counterSum a new value of state.counterSum whitch come from ./reducer switch return
// you try to imagine counterSum will be passed to this.props.counterSum in CounterGroup like the result of <CounterGroup counterSum={state.counterSum}/>

connect(mapStateToProps)(CounterGroup)

export default connect(mapStateToProps)(CounterGroup);//let CounterGroup and Redux know each other
