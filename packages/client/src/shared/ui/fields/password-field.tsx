import { Form, Input } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form
const { Password } = Input

export function PasswordField({
  name = 'password',
  placeholder = 'Password',
}: {
  name?: string
  placeholder?: string
}) {
  return (
    <Item
      name={name}
      key={name}
      rules={VALIDATIONS.password}
      {...VALIDATIONS_RULES}
    >
      <Password placeholder={placeholder} prefix={<LockOutlined />} />
    </Item>
  )
}
