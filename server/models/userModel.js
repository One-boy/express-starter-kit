/**
 * user model类
 */

const global = require('./global')
const BaseModel = require('./baseModel')
/**
 * 所有model需要继承BaseModel类，
 * 并且需要实现getName和getScheme方法，否则报错
 */
class UserModel extends BaseModel {

  /**
   * 表名
   */
  getName() {
    global.commons.print('UserModel getName方法执行。', 'error')
    return 'user'
  }


  /**
   * 表结构
   * @param {*} Sequelize 
   */
  getScheme(Sequelize) {
    global.commons.print('UserModel getScheme方法执行。', 'error')
    return {
      // 唯一id
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '唯一id'
      },
      // 用户名
      name: {
        type: Sequelize.STRING,
        comment: '用户名'
      },
      // 密码盐
      passwdsalt: {
        type: Sequelize.STRING,
        comment: '密码盐'
      },
      // 时间戳
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }
  }
}

module.exports = UserModel