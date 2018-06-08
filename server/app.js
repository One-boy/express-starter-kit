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

// 赋值公共工具
global.commons = commons

// 引用路由
app.use(router.routes())

// 监听服务
global.commons.print('正在启动服务...')
app.listen(PORT, '', () => {
  global.commons.print(`服务已启动，监听${PORT}端口`)
})

// 数据库
global.sequelizeIns = db.connectDB()
global.Sequelize = db.Sequelize