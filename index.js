const Koa = require('koa')
const app = new Koa()
const {table: proxy_table} = require('./config/proxy_table')

app.use(async (ctx) => {
  const { host } = ctx.req.headers
  const hostname = host.split(':').shift()

  if (Object.keys(proxy_table).includes(hostname)) {
    ctx.status = 302
    
    let toHost = proxy_table[hostname]
    if (!toHost.includes('http')) {
      toHost = 'https://' + toHost
    }
    ctx.redirect(toHost)
  } else {
    ctx.status = 200
    ctx.body = `
    hello world
    domain: ${hostname} not in table.
    `
  }
})

module.exports = app.callback()