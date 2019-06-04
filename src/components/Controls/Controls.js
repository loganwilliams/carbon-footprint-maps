import React, { Component } from "react";
import { dirs, options, stats } from "../../constants/constants";
import "./Controls.scss";

export default class Controls extends Component {
  onChange(part, value, i) {
    let comparison = JSON.parse(JSON.stringify(this.props.comparison));
    comparison[i][part] = value;
    this.props.onChange(comparison);
  }

  render() {
    let rows = [0, 1, 2];

    return (
      <div className="Controls">
        {rows.map(i => {
          return (
            <div className="row">
              <select
                onChange={e =>
                  this.onChange("dir", e.nativeEvent.target.value, i)
                }
                defaultValue={this.props.comparison[i].dir}
              >
                {dirs.map(dir => (
                  <option value={dir}>{dir}</option>
                ))}
              </select>
              <select
                onChange={e =>
                  this.onChange("value", e.nativeEvent.target.value, i)
                }
                defaultValue={this.props.comparison[i].value}
              >
                {options[i].map(option => (
                  <option
                    value={option}
                    selected={this.props.comparison[i].value === option}
                  >
                    {stats[option].shortname}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    );
  }
}
