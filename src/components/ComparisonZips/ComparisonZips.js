import React, { Component } from "react";
import ZipCode from "../ZipCode/ZipCode";
import "./ComparisonZips.scss";

class ComparisonZips extends Component {
  constructor(props) {
    super(props);
  }

  sortValues(criteria) {
    let scores = this.props.zipcodes
      .filter(z =>
        criteria.reduce(
          (acc, cur) =>
            acc &&
            (cur.tolerance
              ? z[cur.value] > cur.target * cur.tolerance &&
                z[cur.value] < cur.target * (1.0 / cur.tolerance)
              : true),
          true
        )
      )
      .map(z => ({
        score: Math.sqrt(
          criteria.reduce((acc, cur) => {
            return (
              (cur.weight || 1) * Math.pow(z[cur.value] - cur.target, 2) + acc
            );
          }, 0)
        ),
        ...z
      }));

    let sorted = scores.sort((a, b) => a.score - b.score).slice(1, 10);
    return sorted;
    // return sorted.sort((a, b) => b.popden - a.popden);
  }

  render() {
    let sorted = this.sortValues([
      {
        value: "Total Household Carbon Footprint (tCO2e/yr)",
        target: this.props.targetZip[
          "Total Household Carbon Footprint (tCO2e/yr)"
        ],
        tolerance: 0.9,
        weight: 100
      },
      {
        value: "IncomePerHousehold",
        target: this.props.targetZip.IncomePerHousehold,
        tolerance: 0.8,
        weight: 1
      },
      {
        value: "Population",
        target: this.props.targetZip.Population,
        weight: 5
      }
    ]);

    console.log(sorted);

    return (
      <div className="ComparisonZips">
        {sorted.map(s => (
          <ZipCode
            zip={s}
            onClick={() => {
              this.props.onClick(s);
            }}
          />
        ))}
      </div>
    );
  }
}

export default ComparisonZips;
