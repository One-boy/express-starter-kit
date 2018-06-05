/**
 * 产品相关处理器
 */
const baseController = require('./baseController')
const { RESULT_CODE } = require('../config/common')
const { resultFormat } = require('../utils/common')

class ProductController extends baseController {

  constructor(ctx) {
    super(ctx)
  }


  /**
   * 商品列表
   * @param {*} ctx 
   */
  list(ctx) {
    console.log('ProductController list')
    const data = [1, 2, 3].map(item => ({ name: `商品${item}`, value: item, time: new Date().toLocaleString() }))
    ctx.response.json(resultFormat(
      data,
      RESULT_CODE.SUCCESS.code,
      RESULT_CODE.SUCCESS.msg
    ))
  }

  /**
   * 添加商品
   * @param {*} ctx 
   */
  add(ctx) {
    console.log('ProductController add')
    const data = [1, 2, 3].map(item => ({ name: `商品${item}`, value: item, time: new Date().toLocaleString() }))
    ctx.response.json(resultFormat(
      data,
      RESULT_CODE.SUCCESS.code,
      '添加成功'
    ))
  }

  /**
   * 删除商品
   * @param {*} ctx 
   */
  delete(ctx) {
    console.log('ProductController delete')
    const data = [1, 2, 3].map(item => ({ name: `商品${item}`, value: item, time: new Date().toLocaleString() }))
    ctx.response.json(resultFormat(
      data,
      RESULT_CODE.SUCCESS.code,
      '删除成功'
    ))
  }

  /**
  * 更新商品
  * @param {*} ctx 
  */
  update(ctx) {
    console.log('ProductController update')
    const data = [1, 2, 3].map(item => ({ name: `商品${item}`, value: item, time: new Date().toLocaleString() }))
    ctx.response.json(resultFormat(
      data,
      RESULT_CODE.SUCCESS.code,
      '更新成功'
    ))
  }

}


module.exports = ProductController