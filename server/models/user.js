/**
 * user model类
 */

const global = require('../global')
const BaseModel = require('./base')
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
   * String相当于VARCHAR(255)
   * INTEGER最大四个字节
   * 
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
      // 创建记录的时间戳
      createdTime: {
        type: Sequelize.INTEGER,
      },
      // 最近更新的时间戳
      updatedTime: {
        type: Sequelize.INTEGER,
      },
    }
  }


  /**
   * 表结构其它配置项
   */
  getOptions() {
    return {
      // 对于user表，自增id从一百万开始。
      initialAutoIncrement: 1000000,
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
   * 根据id查找记录
   * @param {*} uid 
   */
  findById(uid) {
    return this.model.findById(uid)
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