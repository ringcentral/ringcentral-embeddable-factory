/**
 * view index
 */

import copy from 'json-deep-copy'
import {
  pack,
  defaultState,
  jwtPrefix,
  loginUrl,
  FEEDBACK_URL
} from '../common/constants'

const {
  RINGCENTRAL_APP_SERVER,
  CDN,
  APP_HOME
} = process.env

export default async (req, res) => {
  // const list = 'https://*.hubspot.com;'
  // if (view === 'index') {
  //   res.set(
  //     'Content-Security-Policy',
  //     `frame-ancestors ${list}`
  //   )
  // }
  res.set({
    'Cache-Control': 'no-cache'
  })
  const url = await loginUrl()
  const data = {
    version: pack.version,
    title: 'Ringcentral embeddable factory',
    desc: pack.description,
    server: RINGCENTRAL_APP_SERVER,
    cdn: CDN || RINGCENTRAL_APP_SERVER,
    home: APP_HOME,
    repo: pack.homepage,
    query: req.query,
    defaultState,
    jwtPrefix,
    loginUrl: url,
    path: req.path,
    feedbackUrl: FEEDBACK_URL
  }
  data._global = copy(data)
  res.render('app', data)
}
