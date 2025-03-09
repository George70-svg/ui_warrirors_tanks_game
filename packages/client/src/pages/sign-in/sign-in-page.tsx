import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useUserSignIn } from '../../entities/user'
import { Alert, Button, Card, Divider, Flex, Form, Input } from 'antd'
import { UserSignInDto } from '../../entities/user/types'
import './sign-in-page.pcss'
import '../../shared/ui/style.pcss'
import Title from 'antd/lib/typography/Title'
import { ROUTES } from '../../shared/config'
import { Link } from 'react-router-dom'

export interface FormValues {
  [key: string]: string
}

export function SignInPage() {
  const { fn, error, isLoading } = useUserSignIn()
  const [form] = Form.useForm()

  const handleSubmit = (values: FormValues) => {
    fn({
      login: values.login,
      password: values.password,
    })
  }

  return (
    <Flex className="sign-in-page" justify="space-around">
      <Card className="sign-in-container">
        <Title level={2} className="auth-form-title">
          Вход
        </Title>

        <Form
          form={form}
          layout="horizontal"
          name="basic"
          labelCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item<UserSignInDto>
            key="login"
            name="login"
            rules={[
              {
                required: true,
                message: 'Please input your login',
              },
            ]}
          >
            <Input size="large" placeholder="Login" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item<UserSignInDto>
            key="password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
                type: 'string',
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>

        {error && (
          <Alert
            type="error"
            message="Ошибка входа"
            description={error.message}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Divider style={{ borderColor: '#B8B8B8' }} />

        <div className="to-sign-up-container">
          <span>Ещё нет аккаунта?</span>
          <Link to={ROUTES.SIGN_UP}>Зарегистрироваться</Link>
        </div>
      </Card>
    </Flex>
  )
}
