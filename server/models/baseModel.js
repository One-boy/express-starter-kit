/**
 * 基础model类
 */

const global = require('./global')

/**
 * 所有model需要继承BaseModel类，
 * 并且需要实现getName和getScheme方法，否则报错
 */
class BaseModel {
  constructor() {
    // 定义模式
    this.model = global.sequelizeIns.define(
      // 表名
      this.getName(),
      // 配置
      this.getScheme(global.Sequelize),
      //
    )
  }

  getName() {
    global.commons.print('baseModel getName方法执行。', 'error')
  }


  getScheme() {
    global.commons.print('baseModel getScheme方法执行。', 'error')
  }
}

module.exports = BaseModel