class HttpException extends Error {
    constructor (code, message, detail = null, data = null) {
      super(message)
      this.code = code
      this.message = message
      this.detail = detail
      this.data = data
      this.name = 'HttpException'
    }
  }
  
  module.exports = HttpException