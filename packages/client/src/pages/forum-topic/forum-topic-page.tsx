import {
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
import { TComment } from '../../entities/forum/types'
import { useAppDispatch } from '../../shared/lib'
import {
  addCommentReactionAction,
  addCommentAction,
  selectComments,
} from '../../entities/forum/forum-slice'
import { useSelector } from 'react-redux'
import { ReactionForm } from '../../entities/forum/api/types'

const { Text } = Typography
const { TextArea } = Input

export function ForumTopicPage() {
  const [form] = Form.useForm()

  const dispatch = useAppDispatch()
  const comments = useSelector(selectComments)

  const newMockComment: TComment = {
    id: 1,
    author: 'User',
    content: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
    reactions: [],
  }

  const onClickReaction = (data: ReactionForm) => {
    // TODO Здесь будет асинхронный запрос на добавление реакции
    //  или прибавление счетчика уже существующей реакции
    dispatch(addCommentReactionAction(data))
  }

  const handleAddComment = (values: { comment: string }) => {
    newMockComment.content = values.comment
    newMockComment.id = comments.length + 1

    dispatch(addCommentAction(newMockComment))
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
                comment={item}
                onClickReaction={onClickReaction}
                onSelectReaction={onClickReaction}
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
