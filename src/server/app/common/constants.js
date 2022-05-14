import { resolve } from 'path'
import RingCentral from '@rc-ex/core'
import RetryExtension from '@rc-ex/retry'
// import RateLimitExtension from '@rc-ex/rate-limit'
import AuthorizeUriExtension from '@rc-ex/authorize-uri'
import crypto from 'crypto'

const {
  RINGCENTRAL_SERVER,
  RINGCENTRAL_APP_SERVER,
  RINGCENTRAL_CLIENT_ID,
  RINGCENTRAL_CLIENT_SECRET
} = process.env

const arr = RINGCENTRAL_APP_SERVER.split('/')
const root = arr[0] + arr[1] + arr[2]
const cwd = process.cwd()

export const defaultState = '__default_state_'
export const extraPath = RINGCENTRAL_APP_SERVER.replace(root, '')
export const pack = require(resolve(cwd, 'package.json'))
export const jwtPrefix = crypto.createHash('md5').update(RINGCENTRAL_APP_SERVER).digest('hex')

const url = encodeURIComponent('https://github.com/ringcentral/ringcentral-embeddable-factory/issues/new')
export const FEEDBACK_URL = `https://ringcentral.github.io/common-redirect?redirect=${url}&appName=ringcentral-embeddable-factory`

export const createRc = async () => {
  const rc = new RingCentral({
    server: RINGCENTRAL_SERVER,
    clientId: RINGCENTRAL_CLIENT_ID,
    clientSecret: RINGCENTRAL_CLIENT_SECRET
  })
  const retryOptions = {
    shouldRetry: (restException, retriesAttempted) => {
      const {
        status
      } = restException.response
      return (
        retriesAttempted < 5 &&
        (
          [429, 503].includes(status) ||
          status > 503
        )
      )
    },
    retryInterval: (restException, retriesAttempted) => {
      const f = restException.response.status === 429
        ? 60
        : 1
      return f * 1000 * Math.pow(2, retriesAttempted)
    }
  }
  const retryExtension = new RetryExtension(retryOptions)
  const authorizeUriExtension = new AuthorizeUriExtension()
  await rc.installExtension(authorizeUriExtension)
  await rc.installExtension(retryExtension)
  rc.redirectUrl = RINGCENTRAL_APP_SERVER + '/rc/oauth'
  rc.loginUrl = ({ state }) => {
    return authorizeUriExtension.buildUri({
      state,
      redirect_uri: rc.redirectUrl
    })
  }
  return rc
}

export const loginUrl = async () => {
  const rc = await createRc()
  return rc.loginUrl({
    state: defaultState
  })
}

export const buildLoginUrlRedirect = async (botID) => {
  const url = await loginUrl()
  return url.replace(
    defaultState,
    encodeURIComponent(RINGCENTRAL_APP_SERVER + '/app/' + botID)
  )
}
