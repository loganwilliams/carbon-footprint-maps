import React, { Component } from "react";
// import { ranges }
import "./Controls.scss";

export default class Controls extends Component {
  render() {
    return (
      <div className="Controls">
        <div className="row">
          <select>
            <option value="similar">Similar</option>
            <option value="higher">Higher</option>
            <option value="lower">Lower</option>
          </select>
          income
        </div>
        <div className="row">
          <select>
            <option value="similar">Similar</option>
            <option value="higher">Higher</option>
            <option value="lower">Lower</option>
          </select>
          population
        </div>
        <div className="row">
          <select>
            <option value="similar">Similar</option>
            <option value="higher">Higher</option>
            <option value="lower">Lower</option>
          </select>
          carbon footprint
        </div>
      </div>
    );
  }
}
