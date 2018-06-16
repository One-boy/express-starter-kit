/**
 * 基础控制器
 * 所有的其它控制器都要继承此类
 * 对请求或返回数据，做一些公共操作
 */
const global = require('../global')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

class BaseController {

  constructor(ctx) {
    // 是否登录
    this.isLogin = false
    // 操作句柄
    this.ctx = ctx
  }

  /**
   * 初始化，做一些是否登录的判断，过滤等操作
   */
  async init() {
    global.commons.print('============BaseController init================')
    const { request, response } = this.ctx
    // 请求的主要信息
    global.commons.print('method=' + request.method)
    global.commons.print('path=' + request.path)
    global.commons.print('protocol=' + request.protocol)
    global.commons.print('httpVersion=' + request.httpVersion)
    // 允许的域，跨域时用
    response.append('Access-Control-Allow-Origin', request.headers.origin)
    // 跨域时是否允许带认证信息
    response.append('Access-Control-Allow-Credentials', true)
    // 允许客户端修改的头部
    response.append('Access-Control-Allow-Headers', 'Content-Type')
    // 检查登录
    await this.checkLogin()
  }

  /**
   * 检查是否登录
   * 目前的方法：
   * 1，获取cookie中的uid和token
   * 2，解析出token中的uid
   * 3，如果解析出的uid和cookie的uid一样，则是登录状态
   * 
   * 如果要下线其它地方，再采取存储token（sessionId）的方式
   */
  async checkLogin() {
    // 过滤登录的路径
    let ignoreRouter = [
      '/user/login',
      '/user/logout',
      '/user/register',
    ]
    if (ignoreRouter.indexOf(this.ctx.request.path) !== -1) {
      this.isLogin = true
    } else {
      let { _uid_, _token_ } = this.ctx.request.cookies
      if (!_uid_ || !_token_) {
        this.isLogin = false
        return false
      }
      let ins = global.getInts(userModel)
      let userObj = await ins.findById(_uid_)
      if (!userObj) {
        this.isLogin = false
        return false
      }
      try {
        let docodedToken = jwt.verify(_token_, userObj.passwdsalt)

        /**
         * docodedToken的数据：
         * exp:过期时间戳
         * iat:签名时的时间戳
         * ...其它签入其中的参数
         */
        if (docodedToken.uid == _uid_ && Date.now() < docodedToken.exp * 1000) {
          this.isLogin = true
          return true
        }
      } catch (error) {
        // ...
        global.commons.print(error, 'error')
      }
      this.isLogin = false
      return false
    }

  }
}

module.exports = BaseController