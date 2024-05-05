function success(response, data) {
    response.locals.data = data;
    response.status(200)
    response.set('Content-Type', 'application/json')
    response.send(JSON.stringify(data))
}

function error(response, message, detail = null, data = null, name = null) {
    var result = {
        code: 400,
        message: message,
        detail: detail,
        data: data,
        name: name
    };
    response.locals.error = error;
    response.status(400)
    response.set('Content-Type', 'application/json')
    response.send(JSON.stringify(result))
}

function unauthorized(response, message = null, detail = null, data = null) {
    var result = {
        code: 401,
        message: message,
        detail: detail,
        data: data,
        name: 'unauthorized'
    };
    response.locals.error = error;
    response.status(401)
    response.set('Content-Type', 'application/json')
    response.send(JSON.stringify(result))
}

module.exports = {success, error, unauthorized}