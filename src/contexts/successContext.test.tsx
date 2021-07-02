import React from "react";
import { shallow, mount } from "enzyme";
import { SuccessProvider, useSuccess } from "./successContext";

//just calling useSuccess for our tests
const FunctionalComponent = () => {
  useSuccess();
  return <div />;
};

test("useSuccess thorws error wne not wrapped in SuccessProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used within a SuccessProvider");
});

test("useSuccess does not fail when whrapped is SuccessProvider", () => {
  expect(() => {
    mount(
      <SuccessProvider>
        <FunctionalComponent />
      </SuccessProvider>
    );
  }).not.toThrow("useSuccess must be used within a SuccessProvider");
});
