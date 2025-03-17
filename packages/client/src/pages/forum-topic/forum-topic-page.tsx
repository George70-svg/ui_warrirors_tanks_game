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
import styles from './forum-topic.module.css'

const { Text } = Typography
const { TextArea } = Input

type Comment = { id: number; author: string; content: string; avatar: string }

export function ForumTopicPage() {
  const [comments, setComments] = useState<Comment[]>([])
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
      <Card title="Topic Title" className={styles.title}>
        <Text color="gray">This is the content of the topic.</Text>
      </Card>

      <Card title="Comments" className={styles.comments}>
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <List.Item className={styles.listItem}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Text color="white">{item.author}</Text>}
                description={<Text color="gray">{item.content}</Text>}
              />
            </List.Item>
          )}
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddComment}
          className={styles.form}
        >
          <Form.Item
            label={<span color="white">Add a Comment</span>}
            name="comment"
            rules={[{ required: true, message: 'Please enter your comment!' }]}
          >
            <TextArea rows={3} placeholder="Write a comment..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Post Comment
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
