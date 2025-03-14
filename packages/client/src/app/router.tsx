import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { ROUTES } from '../shared/config'
import { ForumPage } from '../pages/forum'
import { ForumTopicPage } from '../pages/forum-topic'
import { GamePage } from '../pages/game'
import { LeaderboardPage } from '../pages/leaderboard'
import { ProfilePage } from '../pages/profile'
import { SignInPage } from '../pages/sign-in'
import { SignUpPage } from '../pages/sign-up'
import { ProtectedRoutes } from './ui/protected-routes'
import { NoAuthRoutes } from './ui/no-auth-routes'
import { ErrorElement } from './ui/error-element'
import { ErrorPage } from '../pages/error-page'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorElement />,
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
])
