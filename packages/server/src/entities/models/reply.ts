import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'

export interface IReply {
  id: number
  text: string
  nickname: string
  date: string
  commentId: number
}

export const replyModel: ModelAttributes<Model, IReply> = {
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
  commentId: {
    type: DataType.UUID,
    allowNull: false,
  },
}
