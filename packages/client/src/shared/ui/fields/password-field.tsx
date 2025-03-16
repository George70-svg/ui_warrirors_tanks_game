import { Form, Input } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form
const { Password } = Input

export function PasswordField({
  name = 'password',
  text = 'Password',
  showLabel,
}: {
  name?: string
  text?: string
  showLabel?: boolean
}) {
  return (
    <Item
      name={name}
      key={name}
      rules={VALIDATIONS.password}
      {...VALIDATIONS_RULES}
      label={showLabel ? text : ''}
    >
      <Password placeholder={showLabel ? '' : text} prefix={<LockOutlined />} />
    </Item>
  )
}
