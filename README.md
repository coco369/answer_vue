# answer_vue

> 开发人员：王海飞
>
> github地址: github.com/coco369
>
> 本项目为Vue框架项目，打造面试题搜索引擎项目。项目才用前后分离技术实现，前端为Vue框架、后端采用Python的 Django框架。

## 运行项目

``` 
# 安装依赖
npm install

cnpm install --save axios element-ui

# 启动项目，启动地址为localhost:8080
npm run dev

```

## 打包项目

如果执行 npm run build命令时报错，出错为npm: 6.5.0-next.0 should be >= 3.0.0

解决办法如下：

``` 
npm install npm@latest -g
``` 

 Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.

npm install -g http-server // 该命令只需执行一次, 安装过之后, 以后就不需要重复安装了.
