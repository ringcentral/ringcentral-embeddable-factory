/**
 * ringcentral id and github id mapping
 */

import Sequelize from 'sequelize'
import sequelize from './sequelize'
import uid from '../common/uid'

export const Record = sequelize.define('Record', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: uid
  },
  userId: {
    type: Sequelize.STRING
  },
  script: {
    type: Sequelize.STRING
  }
})
