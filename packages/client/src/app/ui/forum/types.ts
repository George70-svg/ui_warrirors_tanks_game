export interface IEmoji {
  type: string
  native: string
  icon: string
}

export type Reaction = {
  emoji: string
  count: number
}
