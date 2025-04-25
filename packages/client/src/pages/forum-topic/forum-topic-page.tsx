import { useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  Flex,
  Form,
  Input,
  List,
  message,
  Typography,
} from 'antd'
import Comment from '../../app/ui/forum/comment/Comment'
import styles from './forum-topic-page.module.pcss'
import { Reaction } from '../../app/ui/forum/types'

const { Text } = Typography
const { TextArea } = Input

type TComment = {
  id: number
  author: string
  content: string
  avatar: string
  reactions: Reaction[]
}

export function ForumTopicPage() {
  const [comments, setComments] = useState<TComment[]>([])
  const [form] = Form.useForm()

  const handleAddComment = (values: { comment: string }) => {
    const newComment = {
      id: comments.length + 1,
      author: 'User',
      content: values.comment,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      reactions: [
        {
          emoji: 'like',
          count: 2,
        },
      ],
    }
    setComments([...comments, newComment])
    form.resetFields()
    message.success('Comment added!')
  }
  return (
    <Flex vertical={true} gap={20} className={styles.container}>
      <Card title="Topic Title" type="inner">
        <Text>This is the content of the topic.</Text>
      </Card>

      <Card title="Comments" type="inner">
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <List.Item>
              <Comment
                avatar={<Avatar src={item.avatar} />}
                title={<Text>{item.author}</Text>}
                description={<Text>{item.content}</Text>}
                reactions={item.reactions}
              />
            </List.Item>
          )}
        />

        <Form form={form} layout="vertical" onFinish={handleAddComment}>
          <Form.Item
            label={<span>Add a Comment</span>}
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
    </Flex>
  )
}
