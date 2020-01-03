const express = require('express')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const { domain, audience } = require('./auth_config')
const port = process.env.API_PORT || 3001

const app = express()

const authConfig = {
  domain: domain,
  audience: audience
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}`,
  algorithm: ['RS256']
})

app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your Access Token was successfully validated!'
  })
})

app.listen(3001, () => console.log(`API listening on ${port}`))
