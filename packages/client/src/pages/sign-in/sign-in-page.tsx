import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useUserSignIn } from '../../entities/user'
import {
  Alert,
  Button,
  Card,
  Divider,
  Layout,
  Flex,
  Form,
  Input,
  Typography,
} from 'antd'
import { UserSignInDto } from '../../entities/user/types'
import styles from './sign-in-page.module.pcss'
import { ROUTES } from '../../shared/config'
import { Link } from 'react-router-dom'

export interface FormValues {
  [key: string]: string
}

const { Title, Text } = Typography

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
    <Layout className={styles.signInPage}>
      <Card className={styles.signInContainer}>
        <Title level={1} className={styles.title}>
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
            <Input size="large" placeholder="Login" prefix={<UserOutlined />} />
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
              placeholder="Password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className={styles.button}
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
          />
        )}

        <Divider style={{ borderColor: '#B8B8B8' }} />

        <Flex justify={'center'} align={'center'} gap={5}>
          <Text>Ещё нет аккаунта?</Text>
          <Link to={ROUTES.SIGN_UP} className={styles.link}>
            Зарегистрироваться
          </Link>
        </Flex>
      </Card>
    </Layout>
  )
}
