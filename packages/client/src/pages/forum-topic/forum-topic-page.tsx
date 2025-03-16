import { useParams } from 'react-router-dom'
import { useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  List,
  message,
  Typography,
} from 'antd'

const { Text } = Typography
const { TextArea } = Input

export function ForumTopicPage() {
  const [comments, setComments] = useState<
    { id: number; author: string; content: string; avatar: string }[]
  >([])
  const [form] = Form.useForm()

  const handleAddComment = (values: { comment: string }) => {
    const newComment = {
      id: comments.length + 1,
      author: 'User',
      content: values.comment,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
    }
    setComments([...comments, newComment])
    form.resetFields()
    message.success('Comment added!')
  }
  return (
    <>
      <Card
        title="Topic Title"
        style={{ background: '#1f1f1f', color: 'white', marginBottom: 16 }}
      >
        <Text style={{ color: 'gray' }}>This is the content of the topic.</Text>
      </Card>

      <Card title="Comments" style={{ background: '#1f1f1f', color: 'white' }}>
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <List.Item
              style={{
                background: '#2b2b2b',
                padding: '12px',
                marginBottom: '8px',
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Text style={{ color: 'white' }}>{item.author}</Text>}
                description={
                  <Text style={{ color: 'gray' }}>{item.content}</Text>
                }
              />
            </List.Item>
          )}
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddComment}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            label={<span style={{ color: 'white' }}>Add a Comment</span>}
            name="comment"
            rules={[{ required: true, message: 'Please enter your comment!' }]}
          >
            <TextArea rows={3} placeholder="Write a comment..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Post Comment
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
