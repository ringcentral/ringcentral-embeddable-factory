import app from './app/app'
import initDb from './app/common/init-db'

const {
  SERVER_PORT: port,
  SERVER_HOST: host,
  RINGCENTRAL_APP_SERVER: server,
  APP_HOME = '/'
} = process.env

app.listen(port, host, () => {
  console.log(`-> local server running at: http://${host}:${port}${APP_HOME}`)
  console.log(`-> public server: ${server}`)
  initDb()
})
