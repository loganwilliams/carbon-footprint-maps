export const statsToShow = [
  "popden",
  "Total Household Carbon Footprint (tCO2e/yr)",
  "IncomePerHousehold"
];

export const stats = {
  tco2: {
    id: "Total Household Carbon Footprint (tCO2e/yr)",
    min: 0,
    max: 75,
    name: "Per household carbon footprint (tCO2e/yr)",
    shortname: "carbon footprint",
    units: "tCO2e/yr"
  },
  housing: {
    id: "Housing (tCO2e/yr)",
    min: 3.84,
    max: 25,
    name: "Housing carbon footprint, per household (tCO2e/yr)",
    shortname: "carbon footprint (housing)",
    units: "tCO2e/yr"
  },
  transport: {
    id: "Transport (tCO2e/yr)",
    min: 2.76,
    max: 30,
    name: "Transport carbon footprint, per household (tCO2e/yr)",
    shortname: "carbon footprint (transportation)",
    units: "tCO2e/yr"
  },
  food: {
    id: "Food (tCO2e/yr)",
    min: 3,
    max: 12,
    name: "Food carbon footprint, per household (tCO2e/yr)",
    shortname: "carbon footprint (food)",
    units: "tCO2e/yr"
  },
  goods: {
    id: "Goods (tCO2e/yr)",
    min: 2.5,
    max: 10,
    name: "Goods carbon footprint, per household (tCO2e/yr)",
    shortname: "carbon footprint (goods)",
    units: "tCO2e/yr"
  },
  services: {
    id: "Services (tCO2e/yr)",
    min: 2.5,
    max: 12,
    name: "Services carbon footprint, per household (tCO2e/yr)",
    shortname: "carbon footprint (services)",
    units: "tCO2e/yr"
  },
  vmt: {
    id: "Vehicle miles traveled",
    min: 3271,
    max: 40000,
    name: "Vehicle miles traveled (miles/year)",
    units: "miles/yr"
  },
  income: {
    id: "IncomePerHousehold",
    min: 2500,
    max: 130000,
    name: "Income per household",
    units: "$",
    shortname: "annual income"
  },
  homevalue: {
    id: "AverageHouseValue",
    min: 20000,
    max: 800000,
    name: "Average house value",
    base: 2,
    units: "$",
    shortname: "home value"
  },
  popden: {
    id: "popden",
    min: 0,
    max: 30000,
    name: "Population density (pop/sq. mi.)",
    base: 5,
    shortname: "population density",
    units: "pop/sq. mile."
  },
  population: {
    id: "Population",
    shortname: "population",
    min: 0,
    max: 80000
  }
};

export const dirs = ["similar", "lower", "higher"];
export const options = [
  ["income", "homevalue"],
  ["population", "popden"],
  ["tco2", "housing", "transport", "food", "goods", "services"]
];
