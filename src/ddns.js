const Cloudflare = require('cloudflare-dns')
const { table: domains } = require('../config/proxy_table')
const url = require('url')

const domainList = Object.keys(domains).reduce((acc, k) => {
  if (!acc.includes(k)) {
    acc.push(k)
  }
  return acc
}, [])

const zone = str => {
  if (!str.includes('http')) {
    str = 'https://' + str
  }
  const { hostname } = url.parse(str)

  const hnList = hostname.split('.')
  if (hnList.length === 3) {
    return `${hnList[1]}.${hnList[2]}`
  }
  return hostname
}
const subZone = str => {
  if (!str.includes('http')) {
    str = 'https://' + str
  }
  const { hostname } = url.parse(str)

  const hnList = hostname.split('.')
  if (hnList.length === 3) {
    return hnList[0]
  }
  return ''
}
const wait = t => new Promise(r => setTimeout(r, t))

const updateRecord = async () => {
  
  const cf = new CloudFlare({
    token: process.env.CF_TOKEN
  })
  const result = []
  for (const domain of domainList) {
    const cname = 'cname.vercel-dns.com'
    const record = {
      type: 'CNAME',
      name: zone(domain),
      content: cname
    }
    await cf.dns.update(subZone(domain), record)
    await wait(400)
  }
  return result
}

updateRecord().then(result => {
  console.log(result)
})
