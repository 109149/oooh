import App from "../App";
import { render, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<App />", function () {
  let triviaInitialData = {
    trivia: ["trivia 1", "trivia 2", "trivia 3", "trivia 4"],
    spoilers: ["spoiler 1", "spoiler 2", "spoiler 3", "spoiler 4"],
  };

  let imageUrlsInitialData = {
    imageUrls: ["img url 1", "img url 2", "img url 3", "img url 4"],
  };

  const mockFetch = (triviaData, imageUrlsData, id) => async (url) => {
    // console.log("mockFetch", url);
    switch (url) {
      case `/trivia/${id || "ID1"}`: {
        return { json: () => Promise.resolve(triviaData || triviaInitialData) };
      }
      case `/imageUrls/${id || "ID1"}`: {
        return {
          json: () => Promise.resolve(imageUrlsData || imageUrlsInitialData),
        };
      }
      default: {
        throw new Error(`Unhandled request: ${url}`);
      }
    }
  };

  beforeAll(() => {
    jest.spyOn(window, "fetch");
  });
  beforeEach(function () {
    window.fetch.mockImplementation(mockFetch());
  });
  afterEach(function () {
    window.fetch.mockRestore();
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
    expect(screen.getByRole(/textbox/)).toHaveValue("");
    expect(screen.getAllByRole(/button/)).toHaveLength(5);

    // assert initial state
    expect(screen.getAllByText(/trivia/)).toHaveLength(4);

    // assert change of id
    userEvent.type(screen.getByRole(/textbox/), "ID2");
    expect(screen.getByRole(/textbox/)).toHaveValue("ID2");

    // mock new data
    let newTriviaData = {
      trivia: [],
      spoilers: [],
    };
    let newImageUrlData = {
      imageUrls: [],
    };

    // mock fetch with new data
    window.fetch.mockImplementation(
      mockFetch(newTriviaData, newImageUrlData, "ID2")
    );

    // assert new state
    await act(async function () {
      userEvent.click(screen.getAllByRole(/button/)[0]); // get search button, which is first on the list
    });
    expect(screen.getByRole(/textbox/)).toHaveValue("");
    expect(screen.queryAllByText(/trivia/)).toHaveLength(0);

    // assert change of new id
    userEvent.type(screen.getByRole(/textbox/), "ID3");
    expect(screen.getByRole(/textbox/)).toHaveValue("ID3");

    // mock new data
    newTriviaData = {
      trivia: ["new trivia"],
      spoilers: ["new spoiler"],
    };
    newImageUrlData = {
      imageUrls: ["new image url"],
    };

    // mock fetch with new data
    window.fetch.mockImplementation(
      mockFetch(newTriviaData, newImageUrlData, "ID3")
    );

    // assert new state
    await act(async function () {
      userEvent.click(screen.getAllByRole(/button/)[0]); // get search button, which is first on the list
    });
    expect(screen.getByRole(/textbox/)).toHaveValue("");
    expect(screen.queryAllByText("new trivia")).toHaveLength(1);
    expect(screen.queryAllByText("new spoiler")).toHaveLength(0);
    expect(screen.getByRole("img").src).toMatch(
      encodeURIComponent(newImageUrlData.imageUrls[0])
    );

    // assert change to initial id
    userEvent.type(screen.getByRole(/textbox/), "ID1");
    expect(screen.getByRole(/textbox/)).toHaveValue("ID1");

    // mock fetch with initial data
    window.fetch.mockImplementation(mockFetch(undefined, undefined, "ID3"));

    // assert initial data
    await act(async function () {
      userEvent.click(screen.getAllByRole(/button/)[0]);
    });
    expect(screen.getByRole(/textbox/)).toHaveValue("");
    expect(screen.queryAllByText(/trivia/)).toHaveLength(4);
    expect(screen.getAllByRole("img")).toHaveLength(4);
  });
});
