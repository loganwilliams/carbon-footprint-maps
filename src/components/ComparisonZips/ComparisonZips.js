import React, { Component } from "react";
import ZipCode from "../ZipCode/ZipCode";
import { stats } from "../../constants/constants";
import "./ComparisonZips.scss";

class ComparisonZips extends Component {
  constructor(props) {
    super(props);
  }

  sortValues(criteria) {
    let scores = this.props.zipcodes
      .filter(z =>
        criteria.reduce((acc, cur) => {
          let target =
            this.props.mapLayer.norm === "capita"
              ? cur.target / cur.PersonsPerHousehold
              : cur.target;

          let value =
            this.props.mapLayer.norm === "capita"
              ? z[cur.value] / z.PersonsPerHousehold
              : z[cur.value];

          return (
            acc &&
            (cur.tolerance
              ? value > target * cur.tolerance &&
                value < target * (1.0 / cur.tolerance)
              : true)
          );
        }, true)
      )
      .map(z => ({
        score: Math.sqrt(
          criteria.reduce((acc, cur) => {
            let target =
              this.props.mapLayer.norm === "capita"
                ? cur.target / cur.PersonsPerHousehold
                : cur.target;

            let value =
              this.props.mapLayer.norm === "capita"
                ? z[cur.value] / z.PersonsPerHousehold
                : z[cur.value];

            return (cur.weight || 1) * Math.pow(value - target, 2) + acc;
          }, 0)
        ),
        ...z
      }));

    let sorted = scores.sort((a, b) => a.score - b.score).slice(1, 10);
    return sorted;
    // return sorted.sort((a, b) => b.popden - a.popden);
  }

  render() {
    let sortArray = this.props.comparison.map(c => {
      let multiple = 1;

      if (c.dir === "higher") multiple = 1 / 1.5;
      if (c.dir === "lower") multiple = 1.5;
      console.log(c);

      return {
        value: stats[c.value].id,
        target: this.props.targetZip[stats[c.value].id] / multiple,
        PersonsPerHousehold: this.props.targetZip.PersonsPerHousehold,
        tolerance: 0.8,
        weight: 100 / Math.sqrt(stats[c.value].max - stats[c.value].min)
      };
    });

    console.log(sortArray);
    let sorted = this.sortValues(sortArray);

    //     [
    //   {
    //     value: "Total Household Carbon Footprint (tCO2e/yr)",
    //     target:
    //       this.props.targetZip["Total Household Carbon Footprint (tCO2e/yr)"] /
    //       1,
    //     tolerance: 0.9,
    //     weight: 100
    //   },
    //   {
    //     value: "IncomePerHousehold",
    //     target: this.props.targetZip.IncomePerHousehold,
    //     tolerance: 0.8,
    //     weight: 1
    //   },
    //   {
    //     value: "Population",
    //     target: this.props.targetZip.popden,
    //     weight: 5
    //   }
    // ]);

    console.log(sorted);

    return (
      <div className="ComparisonZips">
        {sorted.map(s => (
          <ZipCode
            zip={s}
            onClick={() => {
              this.props.onClick(s);
            }}
            norm={this.props.mapLayer.norm}
            stats={[
              this.props.comparison[0].value,
              this.props.comparison[1].value
            ]}
          />
        ))}
      </div>
    );
  }
}

export default ComparisonZips;
