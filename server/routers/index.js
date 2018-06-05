/**
 * 路由配置文件
 */


const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const productController = require('../controller/productController')
const { createAction } = require('../utils/common')

// 接口配置，定义一个接口的处理器
const interfaceConfig = {
  user: {
    prefix: '/user/',
    contronller: userController,
  },
  product: {
    prefix: '/product/',
    contronller: productController,
  },
}

// 路由配置，配置路由
const routerConfig = {
  // 用户相关的接口
  user: [
    {
      method: 'post',
      path: 'login',
      action: 'login'
    },
    {
      method: 'post',
      path: 'logout',
      action: 'logout'
    },
  ],
  // 产品相关的接口
  product: [
    {
      method: 'post',
      path: 'list',
      action: 'list'
    },
    {
      method: 'post',
      path: 'add',
      action: 'add'
    },
    {
      method: 'post',
      path: 'delete',
      action: 'delete'
    },
    {
      method: 'post',
      path: 'update',
      action: 'update'
    },
  ],
}


// 路由遍历
const routes = () => {
  Object.keys(routerConfig).forEach(item => {
    // 获取对应路由的接口
    const interface = interfaceConfig[item]
    routerConfig[item].forEach(value => {
      // 组装路由的访问路径
      const routerPath = `${interface.prefix}${value.path}`
      // 执行动作
      createAction(router, '', interface.contronller, value.action, routerPath, value.method)
    })
  })
  return router
}

module.exports = {
  routes,
}