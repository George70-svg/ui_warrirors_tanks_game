import { useLeaderboard } from '../../entities/forum'
import { Avatar, List, Typography } from 'antd'
import styles from './leaderboard-page.module.pcss'

const { Item } = List
const { Meta } = Item
const { Text } = Typography

export function LeaderboardPage() {
  const data = useLeaderboard()
  return (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <Item key={item.id}>
          <Meta
            className={styles.meta}
            avatar={<Avatar src={item.avatar} size={50} />}
            title={item.login}
            description={item.name}
          />
          <Text>{item.score}</Text>
        </Item>
      )}
    />
  )
}
