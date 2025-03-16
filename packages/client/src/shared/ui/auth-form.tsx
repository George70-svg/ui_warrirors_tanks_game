import { Button, Card, Flex, Form, Typography } from 'antd'
import styles from './auth-form.module.pcss'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

export function AuthForm<T>({
  title,
  submitButtonText,
  onSubmit,
  footerText,
  footerLink,
  linText,
  children,
  disabled,
}: {
  title: string
  submitButtonText: string
  onSubmit: (values: T) => void
  footerText: string
  footerLink: string
  linText: string
  children: ReactNode
  disabled: boolean
}) {
  const [form] = Form.useForm<T>()

  return (
    <Card variant="borderless" className={styles.container}>
      <Title level={3} className={styles.title}>
        {title}
      </Title>

      <Form<T>
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{ remember: true }}
        autoComplete="off"
        size="large"
        disabled={disabled}
      >
        {children}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {submitButtonText}
          </Button>
        </Form.Item>
      </Form>

      <Flex justify={'center'} align={'center'} gap={5}>
        <Text>{footerText}</Text>
        <Text>
          <Link to={footerLink}>{linText}</Link>
        </Text>
      </Flex>
    </Card>
  )
}
