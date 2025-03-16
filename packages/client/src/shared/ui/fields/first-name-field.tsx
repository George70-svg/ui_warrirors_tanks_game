import { Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function FirstNameField() {
  return (
    <Item
      name="first_name"
      key="first_name"
      rules={VALIDATIONS.name}
      {...VALIDATIONS_RULES}
    >
      <Input placeholder="First name" prefix={<UserOutlined />} />
    </Item>
  )
}
