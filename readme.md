# Redirect

> serverless Function domain proxy.

it worked.

本意是在 ```config/proxy_table.js``` 中添加一条映射后，就能跳转到对应域名。

但 nowsh 的限制是域名必须在后台添加后才可用。

所以现在的流程是：

- 在 ```config/proxy_table.js``` 中添加一条映射

- 在 cloudflare 添加一条 CNAME （可选，因为可以直接通配 CNAME 到 nowsh 第一次配置到域名

- 在 nowsh 后台添加一条记录

多了一步，先这样吧问题不大。