import renderer from "react-test-renderer";
import React from "react";
import Selector from "../../src/components/Selector";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
const selectorOptions = [
  {
    label: "Realtime",
    value: "realtime",
  },
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
];

configure({adapter: new Adapter()});
describe("Selector component test", () => {
  it("match with snapshot", () => {
    const componentWithOptions = renderer.create(
      <Selector options={selectorOptions} />
    );
    expect(componentWithOptions.toJSON()).toMatchSnapshot();

    const componentWithDefaultValue = renderer.create(
      <Selector options={selectorOptions} defaultValue="daily" />
    );
    expect(componentWithDefaultValue.toJSON()).toMatchSnapshot();
  });

  it("Can call on change on button click", () => {
    const mockCallback = jest.fn();
    const selector = shallow(
      <Selector options={selectorOptions} onChange={mockCallback} />
    );
    expect(selector.find("button").length).toBe(4);
    selector.find("button").at(1).simulate("click");
    expect(mockCallback).toHaveBeenCalledWith("daily");
    selector.find("button").at(2).simulate("click");
    expect(mockCallback).toHaveBeenCalledWith("weekly");
  });
});
