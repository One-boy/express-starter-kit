/**
 * 基础控制器
 * 所有的其它控制器都要继承此类
 * 对请求或返回数据，做一些公共操作
 */
const global = require('../global')

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
    response.append('Access-Control-Allow-Origin', `${request.headers.protocol}://${request.headers.host}`)
    // 跨域时是否允许带认证信息
    response.append('Access-Control-Allow-Credentials', true)
    // 允许客户端修改的头部
    response.append('Access-Control-Allow-Headers', 'Content-Type')
    // 检查登录
    await this.checkLogin()
  }

  /**
   * 检查是否登录
   */
  async checkLogin() {
    // 是否已经登录
    this.isLogin = true
  }
}

module.exports = BaseController