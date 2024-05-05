var crypto = require('crypto');
var VerifyPasswordException = require('./exceptions/verify-password-exception');

class PasswordSecurity {
    createHash(password, salt) {
        const iterations = 100000;
        const keylen = 64;
        const key = crypto.pbkdf2Sync(password, salt, iterations, keylen, 'sha512');
        return key.toString('hex');
    }

    createSalt() {
        return crypto.randomBytes(16).toString('hex');
    }

    verifyPassword(password, salt, hash) {
        if(this.createHash(password, salt) != hash) {
            throw new VerifyPasswordException();
        }
    }
}

module.exports = PasswordSecurity;