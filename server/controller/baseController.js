/**
 * 基础控制器
 * 所有的其它控制器都要继承此类
 */

class BaseController {

  constructor(ctx) {
    this.ctx = ctx
  }

  async init() {
    this.isLogin = true
    await new Promise((resolve) => {
      console.log('BaseController init')
      resolve()
    })
  }
}

module.exports = BaseController