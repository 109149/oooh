import * as hooks from "../hooks";
import { renderHook, act } from "@testing-library/react-hooks";

describe("App.hooks", function () {
  describe("useTrivia hook", function () {
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

    test("allows you to fetch trivia", async function () {
      const cache = {};
      const { result, waitForNextUpdate } = renderHook(() =>
        hooks.useTrivia({ ID: "ID1", cache })
      );

      await waitForNextUpdate({ timeout: 100 });

      // assert initial state
      expect(result.current.trivia).toEqual(initialData);
      expect(result.current.id).toBe("ID1");
      expect(result.current.loading).toBe(false);

      // new mock data
      const newData = {
        trivia: ["a", "b", "c"],
        spoilers: ["1", "2", "3"],
      };

      // mock fetch with new data
      global["fetch"] = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(newData),
        })
      );

      // update state
      await act(async function () {
        result.current.setId("ID2");
      });

      // assert new state
      expect(result.current.trivia).toEqual(newData);
      expect(result.current.id).toBe("ID2");
      expect(result.current.loading).toBe(false);
    });
  });
});
