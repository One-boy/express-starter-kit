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

  async login(ctx) {
    console.log('UserController login')
    ctx.response.send(resultFormat({ userName: 'huyu', age: 100 }, RESULT_CODE.SUCCESS.code, RESULT_CODE.SUCCESS.msg))
  }


  async logout() {
    console.log('UserController logout')
  }
}

module.exports = UserController