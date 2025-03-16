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

const { Title, Text } = Typography

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
      <Card title="TOPICS" style={{ background: '#1f1f1f', color: 'white' }}>
        <List
          itemLayout="horizontal"
          dataSource={topics}
          renderItem={(item) => (
            <List.Item
              style={{
                background: '#2b2b2b',
                padding: '12px',
                marginBottom: '8px',
              }}
              onClick={() => handleNavigate(item.id)}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Text style={{ color: 'white' }}>{item.title}</Text>}
                description={
                  <Text style={{ color: 'gray' }}>
                    Author: {item.author}, {item.time}
                  </Text>
                }
              />
              <Text style={{ color: 'gray' }}>{item.messages} messages</Text>
            </List.Item>
          )}
        />
      </Card>
    </Flex>
  )
}
