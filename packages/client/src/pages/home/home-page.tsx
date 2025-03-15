import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../shared/config'

const { Paragraph, Link: TypographyLink } = Typography

export function HomePage() {
  return (
    <>
      <Paragraph>
        Battle City is a dynamic top-down tank battle game where players engage
        in strategic combat to defend their base while eliminating enemy forces.
        Featuring classic pixel-art visuals and intuitive controls, the game
        offers an immersive arcade experience with fast-paced action and
        tactical gameplay.
      </Paragraph>
      <Paragraph>
        Players navigate through diverse battlefield environments, including
        destructible brick walls, impenetrable steel barriers, and natural
        obstacles like water and bushes, which add depth to strategic
        maneuvering. Power-ups scattered across the battlefield enhance
        gameplay, offering upgrades such as increased firepower, shields, and
        explosive attacks.
      </Paragraph>
      <Paragraph>
        With progressively challenging levels filled with relentless enemy
        tanks, Battle City tests players’ reflexes and strategic thinking. A
        built-in level editor allows for creative map customization, adding
        endless replayability to the game.
      </Paragraph>
      <Paragraph>
        Join the discussion on{' '}
        <Link to={ROUTES.FORUM}>
          <TypographyLink>our forum</TypographyLink>
        </Link>{' '}
        to share strategies, exchange custom maps, and connect with other tank
        commanders.
      </Paragraph>
      <Paragraph>
        Prepare for intense tank battles, defend your base at all costs, and
        dominate the battlefield in Battle City!
      </Paragraph>
      <Link to={ROUTES.GAME}>
        <Button size="large">Play</Button>
      </Link>
    </>
  )
}
