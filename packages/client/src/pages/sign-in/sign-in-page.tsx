import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useUserSignIn } from '../../entities/user'
import { Alert, Button, Card, Divider, Flex, Form, Input } from 'antd'
import { UserSignInDto } from '../../entities/user/types'
import styles from './sign-in-page.module.pcss'
import Title from 'antd/lib/typography/Title'
import { ROUTES } from '../../shared/config'
import { Link } from 'react-router-dom'
import { signInPageStyles } from './sign-in-page-styles'

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
    <Flex className={styles['sign-in-page']} justify="space-around">
      <Card className={styles['sign-in-container']}>
        <Title level={2} style={signInPageStyles.title}>
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
            name="login"
            rules={[
              { required: true, message: 'Введите логин' },
              {
                pattern: /^(?!\d+$)[A-Za-z0-9_-]{3,20}$/,
                message:
                  'Логин: 3–20 символов (латиница), может содержать цифры, дефис, подчёркивание, но не быть из одних цифр',
              },
            ]}
          >
            <Input
              size="large"
              style={signInPageStyles.signInInput}
              placeholder="Login"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item<UserSignInDto>
            name="password"
            rules={[
              { required: true, message: 'Введите пароль' },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
                message:
                  'Пароль: 8–40 символов, минимум одна заглавная буква и одна цифра',
              },
            ]}
          >
            <Input.Password
              size="large"
              style={signInPageStyles.signInInput}
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
              style={signInPageStyles.fullWidthButton}
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
            style={{ marginBottom: 16, fontSize: '14px' }}
          />
        )}

        <Divider style={{ borderColor: '#B8B8B8' }} />

        <div className={styles['to-sign-up-container']}>
          <span style={signInPageStyles.toSignUpContainerSpan}>
            Ещё нет аккаунта?
          </span>
          <Link
            to={ROUTES.SIGN_UP}
            style={signInPageStyles.toSignUpContainerLink}
          >
            Зарегистрироваться
          </Link>
        </div>
      </Card>
    </Flex>
  )
}
