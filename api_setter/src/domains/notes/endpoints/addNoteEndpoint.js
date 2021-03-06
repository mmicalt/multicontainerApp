const BaseEndpoint = require('../../../core/baseEndpoint');
const AppResponse = require('../../../core/appResponse');
const AppError = require('../../../core/appError');

const addNoteValidator = require('../validators/addNoteValidator');

class AddNoteEndpoint extends BaseEndpoint {
  constructor({ service, logger }) {
    super('POST', '/notes', logger);
    this.service = service;
  }

  get validator() {
    return addNoteValidator;
  }

  async process({ body: { note } }) {
    this.logger.info('ENDPOINT: AddNoteEndpoint');

    const response = await this.service.process(note);

    return new AppResponse(200, {message: JSON.stringify(response)});
  }
}

module.exports = AddNoteEndpoint;
