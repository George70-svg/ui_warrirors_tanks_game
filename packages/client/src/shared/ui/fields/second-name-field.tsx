import { Form, Input } from 'antd'
import { IdcardOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function SecondNameField() {
  return (
    <Item
      name="second_name"
      key="second_name"
      rules={VALIDATIONS.name}
      {...VALIDATIONS_RULES}
    >
      <Input placeholder="Second name" prefix={<IdcardOutlined />} />
    </Item>
  )
}
