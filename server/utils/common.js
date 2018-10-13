/**
 * 一些公用的方法
 * 
 */

const { RESULT_CODE } = require('../config/common')
const sha1 = require('sha1')

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
    status: code,
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
  router[method](baseurl + path, async (request, response, next) => {
    try {
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
    } catch (error) {
      next(error)
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

// 根据密码和盐，生成密码
function generatePassword(password, passwdsalt) {
  return sha1(passwdsalt + sha1(password))
}

/**
 * 生成多少天后的date对象，
 * 用于cookie等
 * @param {Number} day 
 */
function expireDate(day) {
  let date = new Date()
  date.setTime(date.getTime() + day * 86400000)
  return date
}

/**
 * 生成随机字符串
 */
function randomStr() {
  return Math.random().toString(36).substr(2)
}

/**
 * 时间戳
 */
function time() {
  return Date.parse(new Date()) / 1000;
}

/**
 * 时间对象格式化
 * @param {Date} date 
 * @param {string} fmt 
 */
const dateFormat = (date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    // eslint-disable-next-line no-param-reassign
    fmt = fmt.replace(RegExp.$1,
      (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  for (const k in o) { // eslint-disable-line no-restricted-syntax
    if (new RegExp(`(${k})`).test(fmt)) {
      // eslint-disable-next-line no-param-reassign
      fmt = fmt.replace(RegExp.$1,
        (RegExp.$1.length === 1) ?
          (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
  }
  return fmt
}


module.exports = {
  resultFormat,
  createAction,
  print,
  generatePassword,
  expireDate,
  randomStr,
  time,
  dateFormat,
}