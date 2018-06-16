/**
 * 基础model类
 */

const global = require('../global')

/**
 * 所有model需要继承BaseModel类，
 * 并且需要实现getName和getScheme以及getOptions方法，否则报错
 */
class BaseModel {
  constructor() {
    // 定义模式，有各种对表的操作方法
    this.model = global.sequelizeIns.define(
      // 表名
      this.getName(),
      // 表结构配置
      this.getScheme(global.Sequelize),
      // 表结构其它配置项
      this.getOptions(),
    )
  }

  getName() {
    global.commons.print('baseModel getName方法执行。', 'error')
  }

  getScheme() {
    global.commons.print('baseModel getScheme方法执行。', 'error')
  }

  getOptions() {
    global.commons.print('baseModel getOptions方法执行。', 'error')
  }

  /**
   * 创建表
   */
  async createTable() {
    // force: true 创建表，如果表已存在，删除再创建
    await this.model.sync({ force: true })
  }
}

module.exports = BaseModel