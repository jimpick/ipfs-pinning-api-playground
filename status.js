require('isomorphic-fetch')
require('dotenv').config()

const base = process.env.PINNER_ENDPOINT
const url = new URL(base)

const cid = process.argv[2]
if (!cid || cid.length === 0) {
  console.error('Need cid')
  process.exit(1)
}

;(async function () {
  const user = process.env.PINNER_USER
  const pw = process.env.PINNER_PASSWORD
  const auth = Buffer.from(`${user}:${pw}`).toString('base64')
  const apiPinStatus = new URL(`/pins/${cid}`, base)
  console.log(apiPinStatus.href)
  try {
    const res = await fetch(
      apiPinStatus.href,
      {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      }
    )
    console.log(res.status)
    if (!res.ok) {
      throw new Error('Failed')
    }
    const json = await res.json()
    console.log(JSON.stringify(json, null, 2))
  } catch (e) {
    console.error('Exception:', e)
  }
})()
