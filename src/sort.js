 sortValues(criteria) {
    let scores = this.state.zipcodes
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

    let sorted = scores.sort((a, b) => a.score - b.score).slice(0, 10);

    return sorted.sort((a, b) => b.popden - a.popden);
  }

  updateValue(e) {
    this.setState({ targetIncome: e.nativeEvent.target.value });
  }

  render() {
    let emissions = [20, 25, 30, 35, 40, 50, 60, 80, 100];

    return (
      <div className="App">
        <div className="controls">
          <input
            type="range"
            id="slider"
            min={10000}
            max={150000}
            step={1000}
            onChange={this.updateValue.bind(this)}
          />
          <div className="currenttitle">
            {"$" + this.state.targetIncome + "/year"}
          </div>
          <div className="currenttitle">{"household tCO2e/year"}</div>
        </div>
        {/* <div className="columns">
          {emissions.map((emission, i) => {
            let sorted = this.sortValues([
              {
                value: "Total Household Carbon Footprint (tCO2e/yr)",
                target: emission,
                tolerance: 0.9,
                weight: 100
              },
              {
                value: "IncomePerHousehold",
                target: this.state.targetIncome,
                tolerance: 0.8,
                weight: 1
              }
              // {
              //   value: "popden",
              //   target: 1000,
              //   weight: 1
              // }
            ]);

            let colorScale = v => {
              let c = d3.interpolateViridis(
                d3
                  .scaleLog()
                  .range([0, 1.0])
                  .domain([1, 40000])
                  .clamp(true)(v)
              );

              return c;
            };

            return (
              <React.Fragment>
                <div
                  className="zip"
                  key={emission}
                  style={{ position: "absolute", left: i * 150, top: 0 }}
                >
                  {emission}
                </div>
                <div className="App">
                  {sorted.map((s, j) => (
                    <ZipCode zip={s} />
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </div> */}
      </React.Fragment>
    );