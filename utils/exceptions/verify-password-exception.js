class VerifyPasswordException extends Error {
    constructor (message = null, detail = null, data = null) {
      super(message)
      this.code = 400
      this.message = message
      this.detail = detail
      this.data = data
      this.name = 'VerifyPasswordException'
    }
  }
  
  module.exports = VerifyPasswordException