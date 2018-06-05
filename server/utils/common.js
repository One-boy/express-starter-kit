/**
 * 一些公用的方法
 */

const { RESULT_CODE } = require('../config/common')

/**
 * 返回结果封装，格式化
 * @param {*} data 
 * @param {*} errcode 
 * @param {*} errmsg 
 * @param {*} type 
 */
const resultFormat = (
  data,
  errcode = 0,
  errmsg,
  type = 'json',
) => {
  if (type === 'json') {
    return JSON.stringify({
      errcode,
      errmsg,
      data,
    })
  }
  return {
    errcode,
    errmsg,
    data,
  }
}

/**
 * 路由创建和分配
 * @param {*} router 
 * @param {*} baseurl 
 * @param {*} routerController 
 * @param {*} action 
 * @param {*} path 
 * @param {*} method 
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
      response.send(resultFormat(null, RESULT_CODE.NOT_LOGIN.code, RESULT_CODE.NOT_LOGIN.msg))
    }
  })
}

module.exports = {
  resultFormat,
  createAction,
}