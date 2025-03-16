import { Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function LoginField() {
  return (
    <Item
      name="login"
      key="login"
      rules={VALIDATIONS.login}
      {...VALIDATIONS_RULES}
    >
      <Input placeholder="Login" prefix={<UserOutlined />} />
    </Item>
  )
}
