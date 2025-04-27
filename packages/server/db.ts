import dotenv from 'dotenv'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { topicModel } from './src/entities/models/topic'
import { commentModel } from './src/entities/models/comment'
import { replyModel } from './src/entities/models/reply'

dotenv.config()

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  username: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

export const Topic = sequelize.define('topic', topicModel, {
  timestamps: false,
})
export const Comment = sequelize.define('comment', commentModel, {
  timestamps: false,
})
export const Reply = sequelize.define('reply', replyModel, {
  timestamps: false,
})

Topic.hasMany(Comment)
Comment.hasMany(Reply)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
