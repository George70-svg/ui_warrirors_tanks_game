import { Form, Input } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function PhoneField() {
  return (
    <Item
      name="phone"
      key="phone"
      rules={VALIDATIONS.phone}
      {...VALIDATIONS_RULES}
    >
      <Input placeholder="Phone" prefix={<PhoneOutlined />} />
    </Item>
  )
}
