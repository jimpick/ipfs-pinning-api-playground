require('isomorphic-fetch')
require('dotenv').config()

const base = process.env.PINNER_ENDPOINT
const url = new URL(base)
const apiId = new URL('/id', base)

;(async function () {
  const user = process.env.PINNER_USER
  const pw = process.env.PINNER_PASSWORD
  const auth = Buffer.from(`${user}:${pw}`).toString('base64')
  const res = await fetch(
    apiId.href,
    {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    }
  )
  console.log(res.status)
  const json = await res.json()
  console.log(JSON.stringify(json, null, 2))
})()
