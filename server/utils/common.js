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
  data,
  code = 0,
  msg,
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
    await controllerIns.init(ctx)
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

module.exports = {
  resultFormat,
  createAction,
}