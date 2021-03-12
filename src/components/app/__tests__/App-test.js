import App from "../App";
import { render, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<App>", function () {
  let initialData = {
    trivia: ["trivia 1", "trivia 2", "trivia 3", "trivia 4"],
    spoilers: ["spoiler 1", "spoiler 2", "spoiler 3", "spoiler 4"],
  };
  beforeEach(function () {
    global["fetch"] = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(initialData),
      })
    );
  });

  afterEach(function () {
    global.fetch.mockRestore();
  });

  it("should render normally", async function () {
    const ID = "ID1";
    const args = {
      ID,
    };

    await act(async function () {
      render(<App {...args} />);
    });

    // assert initial DOM
    expect(screen.getByRole(/textbox/)).toHaveAttribute("value");
    expect(screen.getByRole(/button/)).toHaveTextContent("Search");

    // assert initial state
    expect(screen.getAllByText(/trivia/)).toHaveLength(4);

    // assert change of id
    userEvent.type(screen.getByRole(/textbox/), "ID2");
    expect(screen.getByRole(/textbox/)).toHaveValue("ID2");

    // new mock data
    const newData = {
      trivia: [],
      spoilers: [],
    };

    // mock fetch with new data
    global["fetch"] = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(newData),
      })
    );

    // assert new state
    await act(async function () {
      userEvent.click(screen.getByRole(/button/));
    });
    expect(screen.queryAllByText(/trivia/)).toHaveLength(0);
  });
});
