import React, { Component } from "react";
import "./LayerControl.scss";

class LayerControl extends Component {
  render() {
    const { onChange, mapLayer } = this.props;

    return (
      <div className="LayerControl">
        <div className="normalization">
          <div
            className={mapLayer.value === "tco2" ? "active" : ""}
            onClick={() => onChange({ value: "tco2" })}
          >
            Total CO<sub>2</sub> footprint
          </div>
        </div>
        <div className="subcomponents">
          <div className="label">Footprint components</div>

          <div className="normalization">
            <div
              className={mapLayer.value === "housing" ? "active" : ""}
              onClick={() => onChange({ value: "housing" })}
            >
              Housing
            </div>
            <div
              className={mapLayer.value === "transport" ? "active" : ""}
              onClick={() => onChange({ value: "transport" })}
            >
              Transportation
            </div>
          </div>
          <div className="normalization">
            <div
              className={mapLayer.value === "food" ? "active" : ""}
              onClick={() => onChange({ value: "food" })}
            >
              Food
            </div>
            <div
              className={mapLayer.value === "goods" ? "active" : ""}
              onClick={() => onChange({ value: "goods" })}
            >
              Goods
            </div>
            <div
              className={mapLayer.value === "services" ? "active" : ""}
              onClick={() => onChange({ value: "services" })}
            >
              Services
            </div>
          </div>
        </div>
        <div className="subcomponents">
          <div className="label">Census statistics</div>

          <div className="normalization">
            <div
              className={mapLayer.value === "income" ? "active" : ""}
              onClick={() => onChange({ value: "income" })}
            >
              Income
            </div>
            <div
              className={mapLayer.value === "popden" ? "active" : ""}
              onClick={() => onChange({ value: "popden" })}
            >
              Population density
            </div>
          </div>
          <div className="normalization">
            <div
              className={mapLayer.value === "vmt" ? "active" : ""}
              onClick={() => onChange({ value: "vmt" })}
            >
              Yearly driving
            </div>
            <div
              className={mapLayer.value === "homevalue" ? "active" : ""}
              onClick={() => onChange({ value: "homevalue" })}
            >
              Home value
            </div>
          </div>

          <div className="subcomponents">
            <div className="label">Normalization</div>

            <div className="normalization">
              <div
                className={mapLayer.norm === "household" ? "active" : ""}
                onClick={() => onChange({ norm: "household" })}
              >
                per household
              </div>
              <div
                className={mapLayer.norm === "capita" ? "active" : ""}
                onClick={() => onChange({ norm: "capita" })}
              >
                per capita
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LayerControl;
