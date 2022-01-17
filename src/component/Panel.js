import React, { Component } from "react";
import styles from "./styles";

const utils = require('./utils');

class Panel extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    finalAmount: 0,
    term: ''
  };

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }

    let amount = utils.getConvertion(formData.base, formData.term, formData.amount);
    this.setState({finalAmount: amount});
    this.setState({term: formData.term});
  }
  
  render() {
    const {
      finalAmount,
      term
  } = this.state;
    return (
        <div style={styles.panel}>
            <h1 style={styles.headline}>Currency Converter</h1>
          <div style={styles.container}>
            <form onSubmit={this.handleSubmit}>
                <div>
                  <span style={styles.inputSection} >From : <input ref="base" className="base" name="base"/> </span>
                  <span style={styles.inputSection} >Amount: <input ref="amount" className="amount" type="number" name="amount"/> </span>
                  <span style={styles.inputSection} >To: <input ref="term" className="term" name="term"/></span>
                </div>
                <div style={styles.buttonSubmit}>
                  <input type="submit" value="Convert"/>
                </div>
                { finalAmount != 0 ? (
                    <div style={styles.amount} >{term} {finalAmount}</div>
                  ) : <span>&nbsp;</span>
                } 
            </form>
          </div>
        </div>
    );
  }
}

export default Panel;