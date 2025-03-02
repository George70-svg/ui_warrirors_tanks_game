import { Link } from 'react-router-dom'
import { ROUTES } from '../../shared/config'

export function HomePage() {
  return (
    <div>
      <span>HomePage</span>
      <ul>
        <li>
          <Link to={ROUTES.FORUM}>Forum</Link>
        </li>
        <li>
          <Link to={`${ROUTES.FORUM}/1`}>Forum Topic 1</Link>
        </li>
        <li>
          <Link to={ROUTES.GAME}>Game</Link>
        </li>
        <li>
          <Link to={ROUTES.LEADERBOARD}>Leaderboard</Link>
        </li>
        <li>
          <Link to={ROUTES.PROFILE}>Profile</Link>
        </li>
        <li>
          <Link to={ROUTES.SERVER_ERROR}>Server error</Link>
        </li>
        <li>
          <Link to={'/unknown'}>Unknown link</Link>
        </li>
      </ul>
    </div>
  )
}
