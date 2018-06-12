/**
 * 用户相关处理器
 */
const baseController = require('./baseController')
const { RESULT_CODE } = require('../config/common')
const { resultFormat } = require('../utils/common')
const userModel = require('../models/userModel')
const global = require('../global')


class UserController extends baseController {

  constructor(ctx) {
    super(ctx)
  }

  /**
   * 登录
   * @param {*} ctx 
   */
  async login(ctx) {
    let ins = global.getInts(userModel)
    let record = await ins.findByUserName('huyu')
    let countAll = await ins.countAll()
    global.commons.print('UserController login')
    global.commons.print('record=', record)
    global.commons.print('countAll=', countAll)

    ctx.response.json(resultFormat(
      {
        userName: 'huyu',
        age: 100,
        time: new Date().toLocaleString()
      },
      RESULT_CODE.SUCCESS.code,
      RESULT_CODE.SUCCESS.msg
    ))
  }


  /**
   * 登出
   */
  async logout(ctx) {
    console.log('UserController logout')
    ctx.response.json(resultFormat(
      null,
      RESULT_CODE.SUCCESS.code,
      '退出成功'
    ))
  }
}

module.exports = UserController