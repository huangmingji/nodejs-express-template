const express = require('express');
const HttpException = require('../utils/exceptions/http-exception');
const router = express.Router();
const { success, error, unauthorized } = require('../utils/restfulapi/json-result');
const User = require('../models/user');

/* GET users listing. */
router.get('/users ', function (req, res, next) {
    // throw new HttpException(400, '服务器内部错误');
    json(res, { 'id': 1, 'name': 'zhangsan' });
});

router.post('/users', async function (req, res, next) {
    try {
        var user = new User({
            account: req.body.account,
            nick_name: req.body.nick_name,
            password: req.body.password,
            email: req.body.email,
            phone_number: req.body.phone
        });

        if (user.account == null || user.account == '') {
            error(res, "用户名不能为空");
            return;
        }
        if (user.password == null || user.password == '') {
            error(res, "密码不能为空");
            return;
        }
        if (user.email == null || user.email == '') {
            error(res, "邮箱不能为空");
            return;
        }
        if (user.phone_number == null || user.phone_number == '') {
            error(res, "手机号不能为空");
            return;
        }
        var existingUser = await user.get(user.account);
        if (existingUser != null) {
            error(res, "用户已存在");
            return
        }
        existingUser = await user.getByEmail(user.email);
        if (existingUser != null) {
            error(res, "邮箱已存在");
            return;
        }

        existingUser = await user.getByPhoneNumber(user.phone_number);
        if (existingUser != null) {
            error(res, "手机号已存在");
            return;
        }
        user.save(user).then(result => {
            success(res, result);
        });
    } catch (error) {
        error(res, error);
    }
});

module.exports = router;
