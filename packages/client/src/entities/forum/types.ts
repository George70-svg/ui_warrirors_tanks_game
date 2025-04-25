export interface IEmoji {
  type: string
  native: string
  icon: string
}

export type TReaction = {
  emoji: string
  count: number
}

export type TComment = {
  id: number
  author: string
  content: string
  avatar: string
  reactions: TReaction[]
}
