import { Form, Input } from 'antd'
import { IdcardOutlined } from '@ant-design/icons'
import { VALIDATIONS, VALIDATIONS_RULES } from './validations'

const { Item } = Form

export function DisplayNameField({
  showLabel = false,
}: {
  showLabel: boolean
}) {
  return (
    <Item
      name="display_name"
      key="display_name"
      label={showLabel ? 'Nickname' : ''}
    >
      <Input
        placeholder={showLabel ? '' : 'Nickname'}
        prefix={<IdcardOutlined />}
      />
    </Item>
  )
}
