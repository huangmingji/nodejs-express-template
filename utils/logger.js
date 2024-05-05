// 日志的封装
// 写入文件中 file-stream-rotator所有日志
var express = require('express');
var logger = require('morgan');
var fileStreamRotato = require('file-stream-rotator')
var app = express()
var accessLogStream = fileStreamRotato.getStream({
    filename: './logs/access/%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYY-MM-DD',
    max_logs: '30d',
    size: '30M',
    audit_file: './logs/access/audit.json'
})

// 格式化日志输出格式  由于代码重复，对输出格式进行封装
function formatLog(tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        decodeURI(tokens.url(req, res)), // 获取get参数
        JSON.stringify(req.body),
        JSON.stringify(res.locals.data),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
    ].join(' ')
}

const accessLog = (logger(function (tokens, req, res) {
    return formatLog(tokens, req, res);
}, {
    stream: accessLogStream,
    skip: function (req, res) {
        return res.statusCode >= 400
    }
}));
// 写入文件中 file-stream-rotator 错误日志
var accessLogStreamErr = fileStreamRotato.getStream({
    filename: './logs/error/%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYY-MM-DD',
    max_logs: '30d',
    size: '30M',
    audit_file: './logs/error/audit.json'
})
const accessLogErr = (logger(function (tokens, req, res) {
    return formatLog(tokens, req, res);
}, {
    stream: accessLogStreamErr,
    skip: function (req, res) {
        return res.statusCode < 400
    }
}));
// 导出代码
module.exports = { accessLog, accessLogErr, logger }
