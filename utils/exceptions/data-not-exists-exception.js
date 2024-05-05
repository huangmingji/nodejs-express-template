class DataNotExistsException extends Error {
    constructor (message, detail = null, data = null) {
      super(message)
      this.code = 400
      this.message = message
      this.detail = detail
      this.data = data
      this.name = 'DataNotExistsException'
    }
  }
  
  module.exports = DataNotExistsException