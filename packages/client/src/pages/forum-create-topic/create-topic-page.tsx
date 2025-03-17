import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../shared/config'
import { Button, Card, Form, Input, message } from 'antd'
import { COLORS } from '../../app/ui/colors'
import styles from './createTopic.module.css'

const { TextArea } = Input

export function ForumCreateTopicPage() {
  const navigate = useNavigate()

  const onFinish = () => {
    const topicId = Math.floor(Math.random() * 1000000)
    message.success('Topic created successfully!')
    navigate(`${ROUTES.FORUM}/${topicId}`)
  }

  return (
    <Card title="Create New Topic" className={styles.card}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={<span color={COLORS.WHITE}>Title</span>}
          name="title"
          rules={[{ required: true, message: 'Please enter a title!' }]}
        >
          <Input placeholder="Enter topic title" />
        </Form.Item>

        <Form.Item
          label={<span color={COLORS.WHITE}>Description</span>}
          name="description"
          rules={[{ required: true, message: 'Please enter a description!' }]}
        >
          <TextArea rows={4} placeholder="Enter topic description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
