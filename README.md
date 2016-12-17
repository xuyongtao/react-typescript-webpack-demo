# 91mobile 全民教育移动端

## 概述

技术栈：```webpack + react + redux + typescript + less``` 

运行环境：node（v6.2.0）

## 线下前端人员运行

```bash
$ cd 项目根目录（如：cd ~/workplace/91/moblie）
$ npm install
$ ./debug
```

打开浏览器访问 [http://127.0.0.1:8080/]

## 线下后端人员运行

```bash
$ cd 项目根目录（如：cd ~/workplace/91/moblie）
$ npm install
$ ./release -d ./a/b -p http://m.qmjy.dev/
```

打开浏览器访问 [http://m.qmjy.dev/]
-d 该参数指定前端项目发布到的本地地址，需为相对路径
-p 该参数指定后端跑改项目的服务器地址（如：http://m.qmjy.dev/）

## 线上管理人员运行

```bash
$ cd 项目根目录（如：cd ~/qmjy-mobile）
$ npm install
$ ./release -d ./m.qmin91.com
```

-d 该参数指定前端项目发布到的本地地址，需为相对路径

## 目录结构

```text
├─buile
│  ├─webpack.config.js               # 公共配置
│  ├─webpack.dev.js                  # 开发配置
│  └─webpack.production              # 发布配置
├─node_modules
├─src
│  ├─components                      # 组件目录
│  ├─css                             # 公共CSS目录
│  ├─img                             # 公共图片目录
│  ├─js                              # 公共图片目录
│  └─pages                           # 页面目录
│      ├─common                      # 公共页面目录
│      ├─index                       # 首页目录
│      ├─search                      # 搜索页目录
│      ├─studio                      # 机构相关目录
│      ├─teacher                     # 老师相关目录
│      ├─app.html                    # html模板页
│      ├─app.less                    
│      └─app.tsx                     # 项目入口页
└─typings
```
