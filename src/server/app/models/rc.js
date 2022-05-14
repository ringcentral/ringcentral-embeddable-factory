import Sequelize from 'sequelize'
import sequelize from './sequelize'

/**
 * rc user
 */
const User = sequelize.define('RcUser', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  recIds: {
    type: Sequelize.JSON
  }
})

export const RcUser = User
