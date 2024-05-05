const connection = require('../utils/db');
const PasswordSecurity = require('../utils/password-security');
const SnowflakeId = require('../utils/snowflake');
const setting = require('../settings');

function User(user) {
    this.id = user.id;
    this.account = user.account;
    this.password = user.password;
    this.secret_key = user.secret_key;
    this.nick_name = user.nick_name;
    this.avatar = user.avatar === null || user.avatar === undefined ? '' : user.avatar;
    this.email = user.email;
    this.phone_number = user.phone_number;
    this.enabled = user.enabled === null || user.enabled === undefined ? true : user.enabled;
    this.creator_id = user.creator_id === null || user.creator_id === undefined ? 0 : user.creator_id;
    this.creation_time = user.creation_time === null || user.creation_time === undefined ? new Date() : user.creation_time;
    this.last_modifier_id = user.last_modifier_id === null || user.last_modifier_id === undefined ? 0 : user.last_modifier_id;
    this.last_modification_time = user.last_modification_time === null || user.last_modification_time === undefined ? new Date() : user.last_modification_time;
}

module.exports = User;

User.prototype.closeConnection = function () {
    connection.end();
}

User.prototype.save = function (newUser) {
    return new Promise((resolve, reject) => {
        try {
            const snowflake = new SnowflakeId(setting.snowflake.databaseid, setting.snowflake.workerid, setting.snowflake.sequence);
            const passwordSecurity = new PasswordSecurity();
            const secret_key = passwordSecurity.createSalt();
            var user = new User({
                id: snowflake.nextId().toString(),
                account: newUser.account,
                password: passwordSecurity.createHash(newUser.password, secret_key),
                secret_key: secret_key,
                nick_name: newUser.nick_name,
                avatar: newUser.avatar,
                email: newUser.email,
                phone_number: newUser.phone_number,
                enabled: newUser.enabled,
                creator_id: newUser.creator_id,
                creation_time: newUser.creation_time,
                last_modifier_id: newUser.last_modifier_id,
                last_modification_time: newUser.last_modification_time
            });
            connection.query('insert into user (id, account, password, secret_key, nick_name, avatar, email, phone_number, enabled, creator_id, creation_time, last_modifier_id, last_modification_time)'
                + 'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [user.id, user.account, user.password, user.secret_key, user.nick_name, user.avatar, user.email, user.phone_number, user.enabled, user.creator_id, user.creation_time, user.last_modifier_id, user.last_modification_time],
                function (error, result) {
                    if (error) {
                        console.log('Error: ' + error.message);
                        reject(error);
                    } else {
                        resolve(user);
                    }
                });
        } catch (e) {
            reject(e)
        }
    })
};

User.prototype.get = function (account) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('select * from user where account = ?', [account], function (error, result) {
                console.log(result);
                if (error) {
                    console.log('Error: ' + error.message);
                    reject(error)
                } else {
                    resolve(result[0]);
                }
            });
        } catch (e) {
            reject(e)
        }
    })
};

User.prototype.getByEmail = function (email) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('select * from user where email = ?', [email], function (error, result) {
                console.log(result);
                if (error) {
                    console.log('Error: ' + error.message);
                    reject(error)
                } else {
                    resolve(result[0]);
                }
            });
        } catch (e) {
            reject(e)
        }
    });
}

User.prototype.getByPhoneNumber = function (phone_number, callback) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('select * from user where phone_number = ?', [phone_number], function (error, result) {
                console.log(result);
                if (error) {
                    console.log('Error: ' + error.message);
                    reject(error)
                } else {
                    resolve(result[0]);
                }
            });
        } catch (e) {
            reject(e)
        }
    });
}

User.prototype.getById = function (id, callback) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('select * from user where id = ?', [id], function (error, result) {
                console.log(result);
                if (error) {
                    console.log('Error: ' + error.message);
                    reject(error)
                } else {
                    resolve(result[0]);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

User.prototype.update = function (user) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('update user set account = ?, password = ?, secret_key = ?, name = ?, avatar = ?, email = ?, phone_number = ?, enabled = ?, creator_id = ?, creation_time = ?, last_modifier_id = ?, last_modification_time = ? where id = ?',
                [user.account, user.password, user.secret_key, user.name, user.avatar, user.email, user.phone_number, user.enabled, user.last_modifier_id, user.last_modification_time, user.id], function (error, result) {
                    if (error) {
                        console.log('Error: ' + error.message);
                        reject(error)
                    } else {
                        resolve(user);
                    }
                });
        } catch (e) {
            reject(e);
        }
    });
};

User.prototype.delete = function (id) {
    return new Promise((resolve, reject) => {
        try {
            connection.query('delete from user where id = ?', [id], function (error, result) {
                if (error) {
                    console.log('Error: ' + error.message);
                    reject(error)
                } else {
                    resolve(result);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

User.prototype.verifyPassword = function (password) {
    var passwordSecurity = new PasswordSecurity();
    passwordSecurity.verifyPassword(password, this.salt, this.password)
};

