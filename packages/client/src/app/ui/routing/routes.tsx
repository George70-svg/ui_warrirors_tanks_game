import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'
import { HomePage } from '../../../pages/home'
import { ROUTES } from '../../../shared/config'
import { ForumPage } from '../../../pages/forum'
import { ForumTopicPage } from '../../../pages/forum-topic'
import { GamePage } from '../../../pages/game'
import { LeaderboardPage } from '../../../pages/leaderboard'
import { ProfilePage } from '../../../pages/profile'
import { SignInPage } from '../../../pages/sign-in'
import { SignUpPage } from '../../../pages/sign-up'
import { ProtectedRoutes } from './protected-routes'
import { NoAuthRoutes } from './no-auth-routes'
import { ErrorElement } from '../error-element'
import { ErrorPage } from '../../../pages/error-page'
import { LoadUserRoute } from './load-user-route'
import { ForumCreateTopicPage } from '../../../pages/forum-create-topic'
import { AppDispatch } from '../../store'
import { getUserData } from '../../../entities/user/api/get-user-data'
import * as React from 'react'

export interface SSRIndexRouteObject extends IndexRouteObject {
  children?: undefined
  ssrLoader?: (dispatch: AppDispatch) => Promise<unknown>
}
export interface SSRNonIndexRouteObject extends NonIndexRouteObject {
  children?: SSRRouteObject[]
  ssrLoader?: (dispatch: AppDispatch) => Promise<unknown>
}

type SSRRouteObject = SSRIndexRouteObject | SSRNonIndexRouteObject

export const routes: SSRRouteObject[] = [
  {
    path: '/',
    element: <LoadUserRoute />,
    errorElement: <ErrorElement />,
    ssrLoader: async (dispatch: AppDispatch) => {
      return dispatch(getUserData())
    },
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: ROUTES.HOME,
            element: <HomePage />,
          },
          {
            path: ROUTES.FORUM,
            element: <ForumPage />,
          },
          {
            path: `${ROUTES.CREATE_TOPIC}`,
            element: <ForumCreateTopicPage />,
          },
          {
            path: `${ROUTES.FORUM}/:topicId`,
            element: <ForumTopicPage />,
          },
          {
            path: ROUTES.GAME,
            element: <GamePage />,
          },
          {
            path: ROUTES.LEADERBOARD,
            element: <LeaderboardPage />,
          },
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
            ssrLoader: async (dispatch: AppDispatch) => {
              return dispatch(getUserData())
            },
          },
        ],
      },
      {
        element: <NoAuthRoutes />,
        children: [
          {
            path: ROUTES.SIGN_IN,
            element: <SignInPage />,
          },
          {
            path: ROUTES.SIGN_UP,
            element: <SignUpPage />,
          },
        ],
      },
      {
        path: ROUTES.SERVER_ERROR,
        element: <ErrorPage />,
      },
      {
        path: '*',
        element: <ErrorPage title="404" message="Page not found" />,
      },
    ],
  },
]
