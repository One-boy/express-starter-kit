/**
 * 基础控制器
 * 所有的其它控制器都要继承此类
 */

class BaseController {

  constructor(ctx) {
    this.ctx = ctx
  }

  /**
   * 初始化，做一些是否登录的判断，过滤等操作
   */
  async init() {
    // 是否已经登录
    this.isLogin = true
    await new Promise((resolve) => {
      console.log('BaseController init')
      resolve()
    })
  }
}

module.exports = BaseController