/**
 * user model类
 */

const global = require('../global')
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
    global.commons.print('UserModel getName方法执行。')
    return 'user'
  }

  /**
   * 表结构
   * @param {*} Sequelize 
   */
  getScheme(Sequelize) {
    global.commons.print('UserModel getScheme方法执行。')
    return {
      // 唯一id
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '唯一id'
      },
      // 昵称
      nickName: {
        type: Sequelize.STRING,
        comment: '昵称'
      },
      // 用户名
      userName: {
        type: Sequelize.STRING,
        comment: '用户名'
      },
      // 密码
      password: {
        type: Sequelize.STRING,
        comment: '密码'
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

  /**
   * 根据用户名查找纪录
   * @param {String} userName 
   */
  findByUserName(userName) {
    // 返回第一条匹配的记录
    return this.model.findOne({ where: { userName, } })
  }

  /**
   * 增加一条记录
   * {
   * nickName:'',
   * userName:'',
   * password:'',
   * }
   * @param {Object} obj 
   */
  add(obj) {
    // const {}
    return this.model.create(obj)
  }

  /**
   * 统计所有记录数量
   */
  countAll() {
    return this.model.count()
  }
}

module.exports = UserModel