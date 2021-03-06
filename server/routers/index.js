/**
 * 路由配置文件
 */


const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const productController = require('../controller/product')
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
      path: 'register',
      action: 'register'
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
      method: 'get',
      path: 'list',
      action: 'list'
    },
    {
      method: 'get',
      path: 'add',
      action: 'add'
    },
    {
      method: 'get',
      path: 'delete',
      action: 'delete'
    },
    {
      method: 'get',
      path: 'update',
      action: 'update'
    },
    {
      method: 'post',
      path: 'upload',
      action: 'upload'
    },
  ],
}


// 路由遍历
const routes = () => {
  Object.keys(routerConfig).forEach(item => {
    // 获取对应路由的接口
    const inf = interfaceConfig[item]
    routerConfig[item].forEach(value => {
      // 组装路由的访问路径
      const routerPath = `${inf.prefix}${value.path}`
      // 执行动作
      createAction(router, '', inf.contronller, value.action, routerPath, value.method)
      // options请求，放过它？
      router.options('*', (request, response) => {
        response.setHeader('Access-Control-Allow-Origin', request.headers.origin)
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        response.setHeader('Access-Control-Allow-Credentials', true)
        response.end()
      })
    })
  })
  return router
}

module.exports = {
  routes,
}