import React from "react";
import renderer from "react-test-renderer";
import PieChart from "../../src/components/PieChart";

const mockData = [
  { label: "Kitchen", value: 241, color: "#7459D9" },
  { label: "Living room", value: 132, color: "#B9ABEB" },
  { label: "Other", value: 32, color: "#E3DEF7" },
];
describe("PieChart component test", () => {
  it("component snapshot", () => {
    const componentWithoutProps = renderer.create(<PieChart />);
    expect(componentWithoutProps.toJSON()).toMatchSnapshot();
    const componentWithProps = renderer.create(
      <PieChart data={mockData} label="Consumption details" unit="kW/h" />
    );
    expect(componentWithProps.toJSON()).toMatchSnapshot();
  });
});
