/**
 * 一些公用的方法
 */

const { RESULT_CODE } = require('../config/common')

/**
 * 返回结果封装，格式化
 * @param {*} data // 返回的数据
 * @param {*} code // 返回的code
 * @param {*} msg  // 返回的消息内容
 */
const resultFormat = (
  data = null,
  code = 0,
  msg = '',
) => {
  return {
    code,
    msg,
    data,
  }
}

/**
 * 路由创建和分配
 * @param {*} router // 路由方法
 * @param {*} baseurl  // 路由基础路径
 * @param {*} routerController // 处理的控制器
 * @param {*} action // 控制器执行的方法
 * @param {*} path // 路径
 * @param {*} method // http方法，如get,post,put,delete
 */
const createAction = (
  router,
  baseurl,
  routerController,
  action,
  path,
  method,
) => {
  router[method](baseurl + path, async (request, response) => {
    const ctx = {
      request,
      response,
    }
    const controllerIns = new routerController(ctx)
    await controllerIns.init()
    if (controllerIns.isLogin) {
      // 如果已经是登录状态
      // 执行正常操作
      await controllerIns[action].call(controllerIns, ctx)
    } else {
      // 未登录，提示未登录
      response.json(resultFormat(null, RESULT_CODE.NOT_LOGIN.code, RESULT_CODE.NOT_LOGIN.msg))
    }
  })
}


/**
 * 日志打印
 * @param {*} content 
 * @param {String} type 
 */
const print = (content, type = 'log') => {
  let func = null
  let ansi = ''
  switch (type) {
    case 'log':
      func = console.log
      // 默认效果，取消所有属性
      ansi = '\033[0m'
      break
    case 'error':
      func = console.error
      // 红色
      ansi = '\033[31m'
      break
    case 'warn':
      func = console.warn
      // 黄色
      ansi = '\033[33m'
      break
    default:
      func = console.log
      ansi = '\033[0m'
      break
  }
  const date = new Date().toLocaleString()

  func(`${ansi}===${type.toUpperCase()}=== ${date}：`, content)
}


module.exports = {
  resultFormat,
  createAction,
  print,
}