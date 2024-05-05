const DataAlreadyExistsException = require('./data-already-exists-exception');
const ParameterNullException = require('./parameter-null-exception');
const ParameterEmptyException = require('./parameter-empty-exception');
const ParameterInvalidException = require('./parameter-invalid-pxception');
const UnauthorizedException = require('./unauthorized-exception');
const VerifyPasswordException = require('./verify-password-exception');
const DataNotExistsException = require('./data-not-exists-exception');
const TokenExpirationException = require('./token-expiration-exception');
const HttpException = require('./http-exception')

function GlobalExceptionHandler(error, request, response, next) {
    console.error(error);
    var data = {
        code: error.code,
        message: error.message,
        detail: error.detail,
        data: error.data,
        name: error.name
    };
    response.locals.data = data;
    if (error instanceof DataAlreadyExistsException
        || error instanceof ParameterNullException
        || error instanceof ParameterEmptyException
        || error instanceof ParameterInvalidException
        || error instanceof UnauthorizedException
        || error instanceof VerifyPasswordException
        || error instanceof DataNotExistsException
        || error instanceof TokenExpirationException
        || error instanceof HttpException) {
        response.status(error.code).json(data);
    } else {
        data.code = 500;
        response.status(500).json(data);
    }
}

module.exports = GlobalExceptionHandler