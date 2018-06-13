/**
 * 用户相关处理器
 */
const baseController = require('./baseController')
const { RESULT_CODE } = require('../config/common')
const { resultFormat } = require('../utils/common')
const userModel = require('../models/userModel')
const global = require('../global')
const jwt = require('jsonwebtoken')

class UserController extends baseController {

  constructor(ctx) {
    super(ctx)
  }

  /**
   * 登录
   * @param {*} ctx 
   */
  async login(ctx) {
    let userName = ctx.request.body.userName
    let password = ctx.request.body.password
    if (!userName) {
      ctx.response.json(resultFormat(null, RESULT_CODE.COMMON_ERROR.code, '用户名不能为空'))
      return
    }
    if (!password) {
      ctx.response.json(resultFormat(null, RESULT_CODE.COMMON_ERROR.code, '密码不能为空'))
      return
    }

    let ins = global.getInts(userModel)
    // 根据用户名获取该用户记录
    let record = await ins.findByUserName(userName)

    if (!record) {
      ctx.response.json(resultFormat(null, RESULT_CODE.COMMON_ERROR.code, '用户不存在'))
      return
    }

    // 验证密码
    if (global.commons.generatePassword(password, record.passwdsalt) === record.password) {
      // 写入cookie
      this.setLoginCookie(record.id, record.passwdsalt)
      // 返回数据
      ctx.response.json(resultFormat(
        {
          userName: record.userName,
          nickName: record.nickName,
          time: new Date().toLocaleString(),
        },
        RESULT_CODE.SUCCESS.code,
        '登录成功'
      ))
      return
    }

    // 登录失败
    ctx.response.json(resultFormat(null, RESULT_CODE.COMMON_ERROR.code, '密码错误'))
    return
  }


  /**
   * 设置登录cookie
   */
  setLoginCookie(uid, passwdsalt) {
    this.ctx.request.cookie('_uid_', uid, {
      // 过期时间
      expires: global.commons.expireDate(7),
      // 只适用于http
      httpOnly: true,
      // 适用路径
      path: '/',
    })
    // 生成签名
    const token = jwt.sign({ uid, }, passwdsalt, { expiresIn: '7 days' })
    this.ctx.request.cookie('_token_', token, {
      // 过期时间
      expires: global.commons.expireDate(7),
      // 只适用于http
      httpOnly: true,
      // 适用路径
      path: '/',
    })
  }

  /**
   * 登出
   */
  async logout(ctx) {
    global.commons.print('UserController logout')

    ctx.response.json(resultFormat(
      null,
      RESULT_CODE.SUCCESS.code,
      '退出成功'
    ))
  }

  /**
   * 注册
   */
  async register(ctx) {
    global.commons.print('UserController register')

    let userName = ctx.request.body.userName
    let nickName = ctx.request.body.nickName
    let password = ctx.request.body.password
    if (!userName) {
      ctx.response.json(resultFormat(null, RESULT_CODE.COMMON_ERROR.code, '用户名不能为空'))
      return
    }
    if (!nickName) {
      ctx.response.json(resultFormat(null, RESULT_CODE.COMMON_ERROR.code, '昵称不能为空'))
      return
    }
    if (!password) {
      ctx.response.json(resultFormat(null, RESULT_CODE.COMMON_ERROR.code, '密码不能为空'))
      return
    }

    // 生成加密盐
    let salt = global.commons.randomStr()
    let ins = global.getInts(userModel)
    let time = global.commons.time()
    await ins.add({ nickName, userName, password, passwdsalt: salt, updatedTime: time, createdTime: time })

    ctx.response.json(resultFormat(
      null,
      RESULT_CODE.SUCCESS.code,
      '注册成功'
    ))
  }
}

module.exports = UserController