/**
 * 数据库连接
 */



const Sequelize = require('sequelize')
const { print } = require('./common')
const { DB_MYSQL_CONFIG } = require('../config/common')

/**
 * 连接数据库
 */
function connectDB() {
  print('连接数据库...' + JSON.stringify(DB_MYSQL_CONFIG))
  // print(DB_MYSQL_CONFIG)
  const sequelize = new Sequelize(
    DB_MYSQL_CONFIG.dbbase,
    DB_MYSQL_CONFIG.user,
    DB_MYSQL_CONFIG.password,
    {
      host: DB_MYSQL_CONFIG.host,
      port: DB_MYSQL_CONFIG.port,
      dialect: 'mysql',
      operatorsAliases: false,
      // 是否启用日志，默认true
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      // 默认配置
      define: {
        // underscored: false,
        // freezeTableName: false,
        charset: 'utf8',
        dialectOptions: {
          collate: 'utf8_general_ci'
        },
        // 默认true
        timestamps: false
      },
    })

  // 测试连接
  sequelize
    .authenticate()
    .then(() => {
      print('数据库连接成功')
    })
    .catch(err => {
      print('数据库连接失败:' + err, 'error')
    })

  return sequelize
}



module.exports = {
  connectDB,
  Sequelize,
}


const query = async () => {
  console.log('数据库连接已经建立')
  const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  })

  // force: true 创建表，如果表已存在，删除再创建
  await User.sync({ force: true })
  // 删除表
  // User.drop()

  // 增
  let res1 = await User.create({ firstName: 'hu', lastName: 'yu' })
  console.log('添加成功', res1)
  // 查
  // 总条数
  let res2 = await User.count()
  console.log('总条数：', res2)
  // 查找单个
  let res3 = await User.findOne({ where: { firstName: 'hu' } })
  console.log('查找成功', res3.get('firstName'))
  // 原生sql查询
  let res4 = await sequelize.query('select * from users where firstName=:fn', {
    raw: true, // 必填
    replacements: { fn: 'hu' }, // 替代
  })
  console.log('原生查询结果：', res4)
  //删
  let res5 = await User.destroy({ where: { firstName: 'hu' } })
  console.log('删除', res5)
  // 改
  let res6 = await User.update({ firstName: 'hu2' }, { where: { firstName: 'hu' } })
  console.log('改变', res6)
}