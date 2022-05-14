
import basicAuth from 'express-basic-auth'
import { Record } from '../models/record'
import { RcUser } from '../models/rc'

const {
  RINGCENTRAL_ADMIN_USERNAME,
  RINGCENTRAL_ADMIN_PASSWORD
} = process.env

const auth = basicAuth({
  users: {
    [RINGCENTRAL_ADMIN_USERNAME]: RINGCENTRAL_ADMIN_PASSWORD
  }
})

// create database tables if not exists
const initDb = async (req, res) => {
  await Record.sync()
  await RcUser.sync()
  res.send('ok')
}

const listUsers = async (req, res) => {
  await Record.sync()
  const all = await RcUser.findAll()
  res.send(all)
}

export default (app) => {
  app.put('/admin/setup-database', auth, initDb)
  app.put('/admin/users', auth, listUsers)
}
