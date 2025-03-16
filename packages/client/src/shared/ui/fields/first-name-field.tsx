import { Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function FirstNameField({ showLabel = false }: { showLabel: boolean }) {
  return (
    <Item
      name="first_name"
      key="first_name"
      rules={VALIDATIONS.name}
      {...VALIDATIONS_RULES}
      label={showLabel ? 'First name' : ''}
    >
      <Input
        placeholder={showLabel ? '' : 'First name'}
        prefix={<UserOutlined />}
      />
    </Item>
  )
}
