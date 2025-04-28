import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'

export interface IComment {
  id: number
  text: string
  nickname: string
  date: string
  topicId: number
}

export const commentModel: ModelAttributes<Model, IComment> = {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: DataType.TEXT,
    allowNull: false,
  },
  nickname: {
    type: DataType.TEXT,
    allowNull: false,
  },
  date: {
    type: DataType.DATE,
    allowNull: false,
  },
  topicId: {
    type: DataType.UUID,
    allowNull: false,
  },
}
