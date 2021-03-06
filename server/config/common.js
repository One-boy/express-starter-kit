/**
 * 基础配置
 */

// 监听端口
const PORT = 12580
// 数据库配置
const DB_MYSQL_CONFIG = {
  // 数据库
  dbbase: 'node',
  // 用户名
  user: 'node',
  // 密码
  password: '123',
  // 地址
  host: '127.0.0.1',
  // 端口
  port: 3306,
}

// 一些服务端返回码定义
const RESULT_CODE = {
  SUCCESS: {
    code: 1,
    msg: '成功',
  },
  NOT_LOGIN: {
    code: -1,
    msg: '未登录',
  },
  COMMON_ERROR: {
    code: 201,
    msg: '常规错误',
  },
  SYS_ERROR: {
    code: -2,
    msg: '系统内部错误',
  },
}

// 图片服务器前缀
const IMGFILE_PREFIX = 'http://127.0.0.1:12580'

module.exports = {
  RESULT_CODE,
  PORT,
  DB_MYSQL_CONFIG,
  IMGFILE_PREFIX,
}