import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { ServerErrorPage } from '../pages/server-error'
import { ROUTES } from '../shared/config'
import { ForumPage } from '../pages/forum'
import { ForumTopicPage } from '../pages/forum-topic'
import { GamePage } from '../pages/game'
import { LeaderboardPage } from '../pages/leaderboard'
import { ProfilePage } from '../pages/profile'
import { SignInPage } from '../pages/sign-in'
import { SignUpPage } from '../pages/sign-up'
import { ClientErrorPage } from '../pages/client-error'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    errorElement: <ClientErrorPage />,
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
  {
    path: ROUTES.SERVER_ERROR,
    element: <ServerErrorPage />,
  },
  {
    path: ROUTES.SIGN_IN,
    element: <SignInPage />,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUpPage />,
  },
])
