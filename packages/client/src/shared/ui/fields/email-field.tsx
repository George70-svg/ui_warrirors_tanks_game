import { Form, Input } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function EmailField() {
  return (
    <Item
      name="email"
      key="email"
      rules={VALIDATIONS.email}
      {...VALIDATIONS_RULES}
    >
      <Input placeholder="Email" prefix={<MailOutlined />} />
    </Item>
  )
}
