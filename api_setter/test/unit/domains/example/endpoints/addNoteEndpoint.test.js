const AddNoteEndpoint = require("../../../../../src/domains/notes/endpoints/addNoteEndpoint");

const fakeLogger = {
  info: jest.fn()
};

describe("addNoteEndpoint", () => {
  describe("process", () => {
    test("runs correctly", async () => {
      const addNoteService = {
        process: jest.fn()
      };
      const endpoint = new AddNoteEndpoint({
        service: addNoteService,
        logger: fakeLogger
      });
      const result = await endpoint.process({
        body: {
          note: "note"
        }
      });

      expect(fakeLogger.info).toBeCalled();
      expect(addNoteService.process).toBeCalledWith("note");
    });
  });
});
