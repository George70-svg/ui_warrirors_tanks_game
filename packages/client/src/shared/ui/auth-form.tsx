import { Button, Card, Flex, Form, Typography } from 'antd'
import styles from './auth-form.module.pcss'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import LogoYandexSvg from '../../assets/ya_logo.svg?react'
import { ThemeSwitcher } from './themeToggler/ThemeToggler'

const { Title, Text } = Typography

export function AuthForm<T>({
  title,
  submitButtonText,
  onSubmit,
  onYaAuth,
  footerText,
  footerLink,
  linkText,
  children,
  disabled,
}: {
  title: string
  submitButtonText: string
  onSubmit: (values: T) => void
  onYaAuth: () => void
  footerText: string
  footerLink: string
  linkText: string
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

      <Flex vertical align={'center'} gap={10} className={styles.anotherAuth}>
        <Title level={5}>Another login with:</Title>
        <Button
          type="default"
          htmlType="button"
          className={styles.yaButton}
          onClick={onYaAuth}
        >
          <LogoYandexSvg />
        </Button>
      </Flex>

      <Flex justify={'center'} align={'center'} gap={5}>
        <Text>{footerText}</Text>
        <Text>
          <Link to={footerLink}>{linkText}</Link>
        </Text>
        <ThemeSwitcher />
      </Flex>
    </Card>
  )
}
