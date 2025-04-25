import { createSlice } from '@reduxjs/toolkit'
import { addReaction } from './api/comment'

type ForumState = {
  comment: {
    id: string
    author: string
    content: string
    avatar: string
    reactions: Reaction[]
  } | null
  reactions: Reaction[]
}

const initialState: ForumState = {
  comment: null,
  reactions: [],
}

const forumSlice = createSlice({
  name: 'forum',
  initialState: initialState,
  selectors: {
    selectReactions: (state) => state.reactions,
  },
  reducers: {
    addReactionAction: (state, action) => {
      state.reactions.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addReaction.fulfilled, (state, action) => {
      state.comment = action.payload
    })
  },
})

export const { selectReactions } = forumSlice.selectors

export const { addReactionAction } = forumSlice.actions

export const { reducer: forumReducer } = forumSlice
