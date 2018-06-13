# express-starter-kit
- 基于express的nodeJs脚手架
### 安装及使用
- `git clone `本项目
- 安装：`npm install`
- 启动：`npm start`
- 另：监听端口可以在`config/common.js`里修改
### 文件夹介绍
- `config`：配置文件，如一些返回码
- `controller`：控制器，接口逻辑处理
- `routers`：路由配置
- `utils`：通用工具
- `app.js`：入口文件
### 技术栈
- `express@4.16.3+node@8.6`
### 其它辅助
- 使用curl命令post数据：
```
curl -X POST 'http://127.0.0.1:12580/user/login' -d 'a=1'

// post json以及带cookie
 curl -i -H 'content-type:application/json' -X POST 'http://127.0.0.1:12580/user/login' -d '{"userName":"huyu","password":"123"}' --cookie '_uid_=1222;_token_=fdsf2'
```

- ubuntu18.04上安装mariadb（10.3）
```
安装：
sudo apt-get update
sudo apt install mariadb-server

启动：
mysqld_safe &

登录：
mysql -uroot -p

配置：
/etc/mysql/mariadb.conf.d/50-server.cnf
```

