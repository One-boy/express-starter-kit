/**
 * 全局工具
 */

// model实例集合
let insts = new Map()

// 根据对应model获取一个model实例
// 如果没有，就添加一个

function getInts(model) {
  if (!insts.get(model)) {
    insts.set(model, new model())
  }
  return insts.get(model)
}


const obj = {
  getInts,
}

module.exports = obj