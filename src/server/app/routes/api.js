/**
 * bot control apis
 * /api
 */

import { RcUser } from '../models/rc'
import { jwtAuth, errHandler } from '../common/jwt'
import _ from 'lodash'
import {
  del,
  list,
  update,
  create
} from '../handlers/db'
import auth from '../handlers/rc-auth'
import view from '../handlers/view-index'

const props = [
  'id',
  'name',
  'email',
  'firstName',
  'lastName',
  'recIds'
]

async function getUser (req, res) {
  const {
    id
  } = req.user
  const user = await RcUser.findByPk(id)
  if (!user) {
    return res.status(404).send('')
  }
  res.send(
    _.pick(user, props)
  )
}

export default (app) => {
  app.get('/api/user', jwtAuth, errHandler, getUser)
  app.get('/rc/oauth', auth)
  app.get('/app', view)
  app.get('/api/list', jwtAuth, errHandler, list)
  app.put('/api/create', jwtAuth, errHandler, create)
  app.post('/api/del/:id', jwtAuth, errHandler, del)
  app.post('/api/update', jwtAuth, errHandler, update)
}
