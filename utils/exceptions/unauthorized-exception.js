class UnauthorizedException extends Error {
    constructor (message = null, detail = null, data = null) {
      super(message)
      this.code = 401
      this.message = message
      this.detail = detail
      this.data = data
      this.name = 'UnauthorizedException'
    }
  }
  
  module.exports = UnauthorizedException