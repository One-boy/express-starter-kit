/**
 * 产品相关处理器
 */
const baseController = require('./baseController')
const { RESULT_CODE } = require('../config/common')
const { resultFormat } = require('../utils/common')
const multer = require('multer')
const { IMGFILE_PREFIX } = require('../config/common')

// 文件存储器
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    let fileExt = ''
    // 提取文件后缀
    if (file.originalname && file.originalname.lastIndexOf('.') !== -1) {
      fileExt = file.originalname.substr(file.originalname.lastIndexOf('.') + 1)
      fileExt = '.' + fileExt
    }
    cb(null, file.fieldname + '-' + Date.now() + fileExt)
  }
})
const multerUpload = multer({ storage }).single('file')

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


  /**
   * 上传图片的处理
   * @param {*} ctx 
   */
  upload(ctx) {
    // 上传的文件再ctx.request.file当中（使用single时）
    // 如果 formdata有非文件数据，则放在ctx.request.body中
    multerUpload(ctx.request, ctx.response, (err) => {
      if (err) {
        ctx.response.json(resultFormat(
          null,
          RESULT_CODE.COMMON_ERROR.code,
          '上传失败，请检查文件是否正确'
        ))
      } else {
        // 正常处理
        ctx.response.json(resultFormat(
          {
            imgUrl: ctx.request.file.path,
            imgFullUrl: `${IMGFILE_PREFIX}/${ctx.request.file.path}`,
            filename: ctx.request.file.filename,
          },
          RESULT_CODE.SUCCESS.code,
          '上传成功'
        ))
      }
    })
  }
}


module.exports = ProductController