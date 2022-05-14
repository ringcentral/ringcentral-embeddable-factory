/**
 * bot control apis
 * /api
 */

import { Record } from '../models/record'
// import parser from '../handlers/string-parser'
import getId from '../common/get-id'
import { RcUser } from '../models/rc'
import _ from 'lodash'
import uid from '../common/uid'
import copy from 'json-deep-copy'

const MAX_RECS = 5
const propsCanUpdate = [
  'script'
]
const propsUsed = [
  ...propsCanUpdate
]

function validate (req) {
  const {
    body
  } = req
  const bd = copy(body)
  if (!bd.script) {
    return {
      error: 'script not OK'
    }
  }
  return _.pick(bd, propsUsed)
}

export async function list (req, res) {
  const { rcId } = getId(req)
  const user = await RcUser.findByPk(rcId)
  if (!user) {
    return res.status(404).send('no user')
  }
  if (!user.recIds || !user.recIds.length) {
    return res.send([])
  }
  const q = (user.recIds || []).map(id => {
    return {
      id
    }
  })
  const insts = await Record.batchGet(q)
  res.send(
    insts
  )
}

export async function update (req, res) {
  const { id, update } = req.body
  if (!id) {
    return res.status(404).send('id required')
  }
  const { rcId } = getId(req)
  const user = await RcUser.findByPk(rcId)
  if (!user) {
    return res.status(404).send('no user')
  }
  user.recIds = user.recIds || []
  if (!user.recIds.includes(id)) {
    return res.status(404).send('no permission or not exist')
  }
  const inst = await Record.findByPk(id)
  if (!inst) {
    return res.status(404).send('404')
  }
  const up = _.pick(update, propsCanUpdate)
  await Record.update(up, {
    where: {
      id
    }
  })
  res.send(inst)
}

function getRcUser (rcId) {
  return RcUser.findByPk(rcId)
}

export async function create (req, res) {
  const data = validate(req)
  if (data.error) {
    return res.status(data.status || 400).send(data.error)
  }
  data.id = uid()
  const { rcId } = getId(req)
  const rc = await getRcUser(rcId)
  if (!rc.recIds) {
    rc.recIds = []
  }
  if (rc.recIds.length >= MAX_RECS) {
    return res.status(400).send(`Can only have ${MAX_RECS} replies`)
  }
  data.userId = rcId
  const inst = await Record.create(data)
  const {
    recIds = []
  } = rc
  const q = {
    where: {
      id: rcId
    }
  }
  recIds.push(data.id)
  await RcUser.update({
    recIds
  }, q)
  res.send(inst)
}

async function delAct (id, userId) {
  const user = await RcUser.findByPk(userId)
  if (!user) {
    return {
      error: 'no user'
    }
  }
  user.recIds = user.recIds || []
  if (!user.recIds.includes(id)) {
    return {
      error: 'no permission or not exist'
    }
  }
  const {
    recIds = []
  } = user
  const q = {
    where: {
      id
    }
  }
  _.remove(recIds, s => s === id)
  await RcUser.update({
    recIds
  }, {
    where: {
      id: user.id
    }
  })
  const result = await Record.destroy(q)
  return {
    result
  }
}

export async function del (req, res) {
  const { rcId } = getId(req)
  const { id } = req.params
  const r = await delAct(id, rcId)
  if (r && r.error) {
    return res.status(404).send(r.error)
  }
  res.send(r)
}
