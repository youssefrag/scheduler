import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application
      key="1"
      id="1"
      time="4pm"
      interview={null}
      bookInterview={() => {}}
      cancelInterview={() => {}}
      interviewers={{"1":{"id":1,"name":"Sylvia Palmer","avatar":"https://i.imgur.com/LpaY82x.png"}}}
    />);
  });
})