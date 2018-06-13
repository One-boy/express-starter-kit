/**
 * 安装和初始化
 */
const db = require('./utils/db')
const commons = require('./utils/common')
const global = require('./global')

// 赋值公共工具
global.commons = commons

// 初始化数据库

db.initDB()

