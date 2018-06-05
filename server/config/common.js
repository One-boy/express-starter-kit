/**
 * 基础配置
 */

// 监听端口
const PORT = 12580

// 一些服务端返回码定义
const RESULT_CODE = {
  SUCCESS: {
    code: 100,
    msg: '成功',
  },
  NOT_LOGIN: {
    code: 101,
    msg: '未登录',
  },
  SYS_ERROR: {
    code: 202,
    msg: '系统内部错误',
  },
}


module.exports = {
  RESULT_CODE,
  PORT,
}