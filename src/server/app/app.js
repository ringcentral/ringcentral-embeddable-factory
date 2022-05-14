
import api from './routes/api'
import { resolve } from 'path'
import staticRoute from './routes/static'
import admin from './routes/admin'
import express from 'express'
import logger from 'morgan'

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(logger('tiny'))
staticRoute(app)
app.set('views', resolve(__dirname, '../views'))
app.set('view engine', 'pug')
api(app)
admin(app)

export default app
