import { Avatar, Button, Card, Flex, List, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../shared/config'

const topics = new Array(6).fill({
  title: 'Checklist updates 09.03.2025',
  author: 'nickname',
  time: 'yesterday 15:24',
  messages: 250,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nickname',
  id: Math.floor(Math.random() * 1000),
})

const { Text } = Typography

export function ForumPage() {
  const navigate = useNavigate()
  const handleNavigate = (id: number) => navigate(`/forum/${id}`)
  return (
    <Flex vertical gap={20}>
      <Flex>
        <Button
          icon={<PlusOutlined />}
          onClick={() => navigate(ROUTES.CREATE_TOPIC)}
        >
          Create new topic
        </Button>
      </Flex>
      <Card title="TOPICS">
        <List
          itemLayout="horizontal"
          dataSource={topics}
          renderItem={(item) => (
            <List.Item onClick={() => handleNavigate(item.id)}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Text>{item.title}</Text>}
                description={
                  <Text>
                    Author: {item.author}, {item.time}
                  </Text>
                }
              />
              <Text>{item.messages} messages</Text>
            </List.Item>
          )}
        />
      </Card>
    </Flex>
  )
}
