/**
 * 入口文件
 */

const express = require('express')
const app = express()
const router = require('./routers/index')
const { PORT } = require('./config/common')
const global = require('./global')
const db = require('./utils/db')
const commons = require('./utils/common')
const { RESULT_CODE } = require('./config/common')
const { resultFormat } = require('./utils/common')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const multer = require('multer')

// 赋值公共工具
global.commons = commons

// 请求body解析中间件
app.use(bodyParser.json()) //application/json解析
app.use(bodyParser.urlencoded({ extended: true })) //application/x-www-form-urlencoded解析
// app.use(multer()) // multipart/form-data解析，需要在具体方法里使用

// cookie解析中间件
app.use(cookieParser())

// 引用路由
app.use(router.routes())

// 错误处理
app.use(function (err, req, res, next) {
  global.commons.print(err.stack, 'error')
  res.json(resultFormat(null, RESULT_CODE.SYS_ERROR.code, RESULT_CODE.SYS_ERROR.msg))
})

// 监听服务
global.commons.print('正在启动服务...')
app.listen(PORT, '', () => {
  global.commons.print(`服务已启动，监听${PORT}端口`)
})

// 数据库
global.sequelizeIns = db.connectDB()
global.Sequelize = db.Sequelize