/**
 * 入口文件
 */


const express = require('express')
const app = express()
const router = require('./routers/index')
const { PORT } = require('./config/common')

// 引用路由
app.use(router.routes())

// 监听服务
app.listen(PORT, '', () => {
  console.log(`服务已启动，监听${PORT}端口`)
})