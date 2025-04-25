import { createSlice } from '@reduxjs/toolkit'
import { addReaction } from './api/add-reaction'
import { TComment } from './types'
import { ReactionForm } from './api/types'
import { addReactionCount } from './api/add-reaction-count'

type ForumState = {
  comments: TComment[]
}

const initialState: ForumState = {
  comments: [],
}

const forumSlice = createSlice({
  name: 'forum',
  initialState: initialState,
  selectors: {
    selectComments: (state) => state.comments,
    selectCommentById: (state, commentId) =>
      state.comments.find((comment) => comment.id === commentId),
  },
  reducers: {
    addCommentAction: (state, action) => {
      state.comments = [...state.comments, action.payload]
    },
    addCommentReactionAction: (state, action) => {
      const payload = action.payload as ReactionForm
      const commentIndex = state.comments.findIndex(
        (comment) => Number(comment.id) === Number(payload.commentId)
      )
      if (commentIndex === -1) {
        return
      }

      const newComment: TComment = { ...state.comments[commentIndex] }
      const reactionIndex = newComment.reactions.findIndex(
        (r) => r.emoji === payload.emoji
      )
      if (reactionIndex !== -1) {
        newComment.reactions[reactionIndex].count += 1
      } else {
        newComment.reactions.push(payload)
      }

      state.comments.splice(commentIndex, 1, newComment)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReaction.fulfilled, (_, action) => {
        addCommentReactionAction(action)
      })
      .addCase(addReactionCount.fulfilled, (_, action) => {
        addCommentReactionAction(action)
      })
  },
})

export const { selectComments, selectCommentById } = forumSlice.selectors
export const { addCommentReactionAction, addCommentAction } = forumSlice.actions

export const { reducer: forumReducer } = forumSlice
