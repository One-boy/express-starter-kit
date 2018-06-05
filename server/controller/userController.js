/**
 * 用户相关处理器
 */
const baseController = require('./baseController')
const { RESULT_CODE } = require('../config/common')
const { resultFormat } = require('../utils/common')

class UserController extends baseController {

  constructor() {
    super()
  }

  /**
   * 登录
   * @param {*} ctx 
   */
  async login(ctx) {
    console.log('UserController login')
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